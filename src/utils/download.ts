import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function download(name: string, buffer: ArrayBuffer) {
  const file = new File([buffer], name);
  const url = URL.createObjectURL(file);

  const link = document.createElement("a");
  link.setAttribute("download", name);
  link.setAttribute("href", url);
  link.click();

  URL.revokeObjectURL(url);
}

async function toArrayBuffer(
  element: HTMLElement,
  type: "image/png" | "image/jpeg"
) {
  element.classList.add("isDownloading");

  const canvas = await html2canvas(element);
  const blob = await new Promise<Blob>((res, rej) =>
    canvas.toBlob(
      (blob) => (blob ? res(blob) : rej("The image can't be created")),
      type
    )
  );

  element.classList.remove("isDownloading");

  return blob.arrayBuffer();
}

export async function saveAsPNG(element: HTMLElement, name: string) {
  download(`${name}.png`, await toArrayBuffer(element, "image/png"));
}

export async function saveAsJPG(element: HTMLElement, name: string) {
  download(`${name}.jpg`, await toArrayBuffer(element, "image/jpeg"));
}

export async function saveAsPDF(element: HTMLElement, name: string) {
  const buffer = await toArrayBuffer(element, "image/png");
  const canvas = await html2canvas(element);

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height],
  });
  pdf.addImage(
    new Uint8Array(buffer),
    "PNG",
    15,
    15,
    canvas.width,
    canvas.height
  );
  pdf.save(`${name}.pdf`);
}
