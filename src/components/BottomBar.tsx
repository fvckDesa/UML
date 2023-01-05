// types
import { Bars } from "@src/types/editor";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PullBar from "./PullBar";
// hooks
import { useRedux } from "@src/hooks/useRedux";
import { useKeydown } from "@src/hooks/useKeydown";
// redux
import { toggleBar } from "@src/features/editorSlice";
// icons
import { faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";
// utils
import { isViewMaximize } from "@src/utils/editor";

function BottomBar() {
  const { data, dispatch } = useRedux((state) => ({
    bars: state.editor.barsStatus,
    activeElement: state.uml.activeElement,
  }));
  const isMaximize = isViewMaximize(data.bars);

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
      <div className="flex justify-end w-[calc(100%-var(--bottom-bar))] h-full px-2"></div>
      <button
        type="button"
        className={`fixed bottom-0 h-bottom-bar aspect-square ${
          data.bars.bottom
            ? "border-l border-gray-600"
            : "rounded-tl-lg bg-slate-300"
        } ${
          !data.bars.bottom && isMaximize && data.bars.right
            ? "right-right-bar"
            : "right-0"
        } transition-all`}
        onClick={toggleView}
      >
        <FontAwesomeIcon icon={isMaximize ? faMinimize : faMaximize} />
      </button>
      {isMaximize && <PullBar bar="bottom" />}
    </div>
  );
}

export default BottomBar;
