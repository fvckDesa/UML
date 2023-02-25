// types
import { Bars } from "@src/types/editor";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PullBar from "./PullBar";
// hooks
import { useRedux } from "@src/hooks/useRedux";
import { useKeydown } from "@src/hooks/useKeydown";
import { useFullscreen } from "@src/contexts/Fullscreen";
// redux
import { toggleBar } from "@src/features/editorSlice";
// icons
import {
  faCompress,
  faExpand,
  faMaximize,
  faMinimize,
} from "@fortawesome/free-solid-svg-icons";
// utils
import { isViewMaximize } from "@src/utils/editor";

function BottomBar() {
  const { data, dispatch } = useRedux((state) => ({
    bars: state.editor.barsStatus,
    activeElement: state.uml.activeElement,
  }));
  const isMaximize = isViewMaximize(data.bars);
  const { isEnabled, isFullscreen, toggleFullscreen } = useFullscreen();

  useKeydown({ target: window, events: { f: toggleView } });

  function toggleView() {
    const openAll = isMaximize ? true : false;
    for (const bar of Object.keys(data.bars) as Bars[]) {
      if (openAll === true && bar === "right" && data.activeElement === null)
        continue;
      dispatch(toggleBar({ bar, force: openAll }));
    }
  }

  return (
    <div
      className={`relative w-full h-bottom-bar border-t border-gray-700 ${
        data.bars.bottom ? "mb-0" : "-mb-bottom-bar"
      } transition-all bg-white`}
    >
      <div className="flex justify-end w-[calc(100%-var(--bottom-bar)*2)] h-full px-2"></div>
      <div
        className={`fixed bottom-0 ${
          !data.bars.bottom && isMaximize && data.bars.right
            ? "right-right-bar"
            : "right-0"
        } flex items-center h-bottom-bar ${
          data.bars.bottom
            ? "border-l border-gray-600"
            : "rounded-tl-lg bg-slate-300"
        } transition-all`}
      >
        <button
          type="button"
          className="w-bottom-bar h-bottom-bar"
          onClick={toggleView}
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
      {isMaximize && <PullBar bar="bottom" />}
    </div>
  );
}

export default BottomBar;
