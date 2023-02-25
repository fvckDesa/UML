import ToggleBtn from "@src/common/components/ToggleBtn";
import BarWrapper from "../containers/BarWrapper";
import { ClickEvents } from "../types";
import {
  faArrowTrendUp,
  faBars,
  faDownload,
  faHand,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DownloadModal from "./DownloadModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ITopBar {
  isOpen: boolean;
  isRightBarOpen: boolean;
  clickEventType: Pick<NonNullable<ClickEvents>, "type">["type"] | null;
  onClickEventChange: (clickEvent: ClickEvents) => void;
  onToggleRightBar: () => void;
}

function TopBar({
  isOpen,
  isRightBarOpen,
  clickEventType,
  onClickEventChange,
  onToggleRightBar,
}: ITopBar) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handlerActive(clickEvent: ClickEvents) {
    return function () {
      onClickEventChange(
        clickEventType === clickEvent?.type ? null : clickEvent
      );
    };
  }

  return (
    <BarWrapper
      bar="top"
      className={`flex justify-between items-center w-full h-top-bar px-6 py-2 border-b-2 border-gray-600 ${
        isOpen ? "mt-0" : "-mt-top-bar"
      } transition-all bg-white`}
    >
      <div className="flex justify-center items-center gap-2">
        <ToggleBtn
          active={clickEventType === "arrow"}
          icon={faArrowTrendUp}
          onClick={handlerActive({ type: "arrow" })}
        />
        <ToggleBtn
          active={clickEventType === "delete"}
          icon={faTrashCan}
          onClick={handlerActive({ type: "delete" })}
        />
        <ToggleBtn
          active={clickEventType === "move"}
          icon={faHand}
          onClick={handlerActive({ type: "move" })}
        />
      </div>
      <div className="flex justify-center items-center gap-2">
        <button
          className="btnAction w-8 h-8 disabled:cursor-not-allowed"
          onClick={() => setIsModalOpen(true)}
        >
          <FontAwesomeIcon icon={faDownload} />
          {isModalOpen && (
            <DownloadModal onClose={() => setIsModalOpen(false)} />
          )}
        </button>
        <button
          className="btnAction w-8 h-8"
          onClick={() => onToggleRightBar()}
        >
          <FontAwesomeIcon icon={isRightBarOpen ? faXmark : faBars} />
        </button>
      </div>
    </BarWrapper>
  );
}

export default TopBar;
