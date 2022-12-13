// types
import { DownloadInfo } from "@src/types/general";
import { ClickEvents } from "@src/types/infoReducer";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DownloadModal from "./DownloadModal";
import ToggleBtn from "@src/ui/ToggleBtn";
// hooks
import { useUMLContext } from "@src/contexts/UML";
import { useState } from "react";
// icons
import {
  faDownload,
  faTrashCan,
  faArrowTrendUp,
  faArrowsUpDownLeftRight,
} from "@fortawesome/free-solid-svg-icons";
// utils
import { saveAs } from "@src/utils/download";

function TopBar() {
  const { umlInfo, dispatchInfo } = useUMLContext();
  const [isOpen, setIsOpen] = useState(false);

  async function handlerSave({ fileType, name }: DownloadInfo) {
    const workspace = document.querySelector("#workspace") as HTMLElement;

    await saveAs({
      type: fileType,
      element: workspace,
      name,
    });

    setIsOpen(false);
  }

  function handlerActive(clickEvent: ClickEvents) {
    return function () {
      dispatchInfo({
        type: "clickEvent/change",
        payload: {
          clickEvent:
            umlInfo.clickEvent?.type === clickEvent?.type ? null : clickEvent,
        },
      });
    };
  }

  return (
    <header className="flex justify-between items-center w-full h-12 px-6 py-2 border-b-2 border-gray-600">
      <div className="flex justify-center items-center gap-2">
        <ToggleBtn
          active={umlInfo.clickEvent?.type === "arrow"}
          icon={faArrowTrendUp}
          onClick={handlerActive({ type: "arrow" })}
        />
        <ToggleBtn
          active={umlInfo.clickEvent?.type === "delete"}
          icon={faTrashCan}
          onClick={handlerActive({ type: "delete" })}
        />
        <ToggleBtn
          active={umlInfo.clickEvent?.type === "move"}
          icon={faArrowsUpDownLeftRight}
          onClick={handlerActive({ type: "move" })}
        />
      </div>
      <div className="flex justify-center items-center gap-2">
        <button
          className="btnAction w-8 h-8 disabled:cursor-not-allowed"
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
