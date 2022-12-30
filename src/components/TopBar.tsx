// types
import type { DownloadImageInfo } from "@src/types/download";
import { ClickEvents } from "@src/types/infoReducer";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DownloadModal from "./DownloadModal";
import ToggleBtn from "@src/ui/ToggleBtn";
// hooks
import { useState } from "react";
import { useRedux } from "@src/hooks/useRedux";
// redux
import { setClickEvent } from "@src/features/umlSlice";
// icons
import {
  faDownload,
  faTrashCan,
  faArrowTrendUp,
  faArrowsUpDownLeftRight,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
// utils
import { saveAs } from "@src/utils/download";

function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, dispatch } = useRedux((state) => ({
    clickEvent: state.uml.clickEvent,
    haveError: Object.values(state.uml.errors).length > 0,
  }));

  async function handlerSave({ type, name }: DownloadImageInfo) {
    const workspace = document.querySelector("#workspace") as HTMLElement;

    await saveAs({
      type,
      name,
      element: workspace,
    });

    setIsOpen(false);
  }

  function handlerActive(clickEvent: ClickEvents) {
    return function () {
      dispatch(
        setClickEvent(
          data.clickEvent?.type === clickEvent?.type ? null : clickEvent
        )
      );
    };
  }

  return (
    <header className="flex justify-between items-center w-full h-12 px-6 py-2 border-b-2 border-gray-600">
      <div className="flex justify-center items-center gap-2">
        <ToggleBtn
          active={data.clickEvent?.type === "arrow"}
          icon={faArrowTrendUp}
          onClick={handlerActive({ type: "arrow" })}
        />
        <ToggleBtn
          active={data.clickEvent?.type === "delete"}
          icon={faTrashCan}
          onClick={handlerActive({ type: "delete" })}
        />
        <ToggleBtn
          active={data.clickEvent?.type === "move"}
          icon={faArrowsUpDownLeftRight}
          onClick={handlerActive({ type: "move" })}
        />
      </div>
      <div className="flex justify-center items-center gap-2">
        <button
          className="btnAction w-8 h-8 disabled:cursor-not-allowed"
          onClick={() => setIsOpen(true)}
          disabled={data.haveError}
        >
          <FontAwesomeIcon icon={faDownload} />
          {isOpen && (
            <DownloadModal
              onSave={handlerSave}
              onClose={() => setIsOpen(false)}
            />
          )}
        </button>
        <button className="btnAction w-8 h-8">
          <FontAwesomeIcon icon={false ? faXmark : faBars} />
        </button>
      </div>
    </header>
  );
}

export default TopBar;
