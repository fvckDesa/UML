// types
import { DownloadInfo } from "@src/types/general";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DownloadModal from "./DownloadModal";
// hooks
import { useUMLContext } from "@src/contexts/UML";
import { useState } from "react";
// icons
import { faDownload } from "@fortawesome/free-solid-svg-icons";
// utils
import { saveAsPNG, saveAsJPG, saveAsPDF } from "@src/utils/download";

function TopBar() {
  const {} = useUMLContext();
  const [isOpen, setIsOpen] = useState(false);

  async function handlerSave({ fileType, name }: DownloadInfo) {
    const workspace = document.querySelector("#workspace") as HTMLElement;
    let fn;

    switch (fileType) {
      case "png":
        fn = saveAsPNG;
        break;
      case "jpg":
        fn = saveAsJPG;
        break;
      case "pdf":
        fn = saveAsPDF;
        break;
    }

    await fn(workspace, name);
    setIsOpen(false);
  }

  return (
    <header className="flex items-center w-full h-12 p-2 border-b-2 border-gray-600">
      <button className="btnAction w-8 h-8" onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={faDownload} />
      </button>
      {isOpen && (
        <DownloadModal onSave={handlerSave} onClose={() => setIsOpen(false)} />
      )}
    </header>
  );
}

export default TopBar;
