import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function download(name: string, blob: Blob) {
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("download", name);
  link.setAttribute("href", url);
  link.click();

  URL.revokeObjectURL(url);
}

async function toBlob(element: HTMLElement, type: "image/png" | "image/jpeg") {
  element.classList.add("isDownloading");

  const canvas = await html2canvas(element);

  const blob = await new Promise<Blob>((res, rej) =>
    canvas.toBlob(
      (blob) => (blob ? res(blob) : rej("The image can't be created")),
      type
    )
  );

  element.classList.remove("isDownloading");

  return blob;
}

export async function saveAsPNG(element: HTMLElement, name: string) {
  download(`${name}.png`, await toBlob(element, "image/png"));
}

export async function saveAsJPG(element: HTMLElement, name: string) {
  download(`${name}.jpg`, await toBlob(element, "image/jpeg"));
}

export async function saveAsPDF(element: HTMLElement, name: string) {
  const buffer = await (await toBlob(element, "image/png")).arrayBuffer();
  const width = element.scrollWidth;
  const height = element.scrollHeight;

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [width, height],
  });

  pdf.addImage(new Uint8Array(buffer), "PNG", 0, 0, width, height);

  pdf.save(`${name}.pdf`);
}