// types
import { DownloadInfo } from "@src/types/general";
import { ClickEvents } from "@src/types/infoReducer";
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
  const { umlInfo, dispatchInfo } = useUMLContext();
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

  function handlerActive(clickEvent: ClickEvents) {
    return function () {
      dispatchInfo({
        type: "clickEvent/change",
        payload: {
          clickEvent: umlInfo.clickEvent === clickEvent ? null : clickEvent,
        },
      });
    };
  }

  return (
    <header className="flex justify-between items-center w-full h-12 p-2 border-b-2 border-gray-600">
      <div>
        <button
          className={`btnAction w-8 h-8 ${
            umlInfo.clickEvent === "arrow"
              ? "bg-blue-500 text-white hover:opacity-100 hover:bg-blue-700"
              : ""
          } transition-colors`}
          onClick={handlerActive("arrow")}
        >
          Arr
        </button>
      </div>
      <div>
        <button
          className="btnAction w-8 h-8"
          onClick={() => setIsOpen(true)}
          disabled={Object.values(umlInfo.errors).length > 0}
        >
          <FontAwesomeIcon icon={faDownload} />
          {isOpen && (
            <DownloadModal
              onSave={handlerSave}
              onClose={() => setIsOpen(false)}
            />
          )}
        </button>
      </div>
    </header>
  );
}

export default TopBar;
