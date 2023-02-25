export interface DownloadImageInfo {
  type: "png" | "jpg" | "pdf";
  name: string;
}

export interface DownloadImage extends DownloadImageInfo {
  element: HTMLElement;
}
