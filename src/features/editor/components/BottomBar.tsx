// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// hooks
import { useFullscreen } from "@src/contexts/Fullscreen";
// icons
import {
  faCompress,
  faExpand,
  faMaximize,
  faMinimize,
} from "@fortawesome/free-solid-svg-icons";
// utils
import BarWrapper from "../containers/BarWrapper";
import { useKeydown } from "@src/common/hooks";

interface IBottomBar {
  isOpen: boolean;
  isRightBarOpen: boolean;
  isMaximize: boolean;
  onViewToggle: () => void;
}

function BottomBar({
  isOpen,
  isRightBarOpen,
  isMaximize,
  onViewToggle,
}: IBottomBar) {
  const { isEnabled, isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <BarWrapper
      bar="bottom"
      className={`relative w-full h-bottom-bar border-t border-gray-700 ${
        isOpen ? "mb-0" : "-mb-bottom-bar"
      } transition-all bg-white`}
    >
      <div className="flex justify-end w-[calc(100%-var(--bottom-bar)*2)] h-full px-2"></div>
      <div
        className={`fixed bottom-0 ${
          !isOpen && isMaximize && isRightBarOpen
            ? "right-right-bar"
            : "right-0"
        } flex items-center h-bottom-bar ${
          isOpen ? "border-l border-gray-600" : "rounded-tl-lg bg-slate-300"
        } transition-all`}
      >
        <button
          type="button"
          className="w-bottom-bar h-bottom-bar"
          onClick={() => onViewToggle()}
        >
          <FontAwesomeIcon icon={isMaximize ? faMinimize : faMaximize} />
        </button>
        <div className="w-[2.5px] h-2/3 rounded-full bg-black" />
        <button
          type="button"
          className="w-bottom-bar h-bottom-bar disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => toggleFullscreen()}
          disabled={!isEnabled}
        >
          <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
        </button>
      </div>
    </BarWrapper>
  );
}

export default BottomBar;
