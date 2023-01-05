// types
import type { DownloadImageInfo } from "@src/types/download";
import type { ClickEvents } from "@src/types/uml";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DownloadModal from "./DownloadModal";
import ToggleBtn from "@src/ui/ToggleBtn";
import PullBar from "./PullBar";
// hooks
import { useState } from "react";
import { useRedux } from "@src/hooks/useRedux";
// redux
import { setClickEvent } from "@src/features/umlSlice";
import { toggleBar } from "@src/features/editorSlice";
// icons
import {
  faDownload,
  faArrowTrendUp,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHand, faTrashCan } from "@fortawesome/free-regular-svg-icons";
// utils
import { saveAs } from "@src/utils/download";
import { isViewMaximize } from "@src/utils/editor";

function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, dispatch } = useRedux((state) => ({
    clickEvent: state.uml.clickEvent,
    haveError: Object.values(state.uml.errors).length > 0,
    barsStatus: state.editor.barsStatus,
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

  function toggleRightBar() {
    dispatch(toggleBar({ bar: "right" }));
  }

  return (
    <header
      className={`relative flex justify-between items-center w-full h-top-bar px-6 py-2 border-b-2 border-gray-600 ${
        data.barsStatus.top ? "mt-0" : "-mt-top-bar"
      } transition-all bg-white z-10`}
    >
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
          icon={faHand}
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
        <button className="btnAction w-8 h-8" onClick={toggleRightBar}>
          <FontAwesomeIcon icon={data.barsStatus.right ? faXmark : faBars} />
        </button>
      </div>
      {isViewMaximize(data.barsStatus) && <PullBar bar="top" />}
    </header>
  );
}

export default TopBar;
