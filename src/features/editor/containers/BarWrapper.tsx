import { Bars } from "@src/features/editor/types";
import { PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useKeydown, useRedux } from "@src/common/hooks";
import { toggleBar } from "../editorSlice";
import { isViewMaximize } from "../utils";

type IBarWrapper = PropsWithChildren<{
  bar: Bars;
  className: string;
}>;

const style = {
  top: "bottom-0 left-1/2 translate-y-full -translate-x-1/2 rounded-b-lg",
  bottom: "top-0 left-1/2 -translate-y-full -translate-x-1/2 rounded-t-lg",
  left: "top-1/2 right-0 -translate-y-1/2 translate-x-full rounded-r-lg",
  right: "top-1/2 left-0 -translate-y-1/2 -translate-x-full rounded-l-lg",
};

const rotation = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

const key = {
  top: "ArrowUp",
  bottom: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
};

function BarWrapper({ bar, className, children }: IBarWrapper) {
  const { data, dispatch } = useRedux((state) => state.editor.barsStatus);
  const isMaximize = isViewMaximize(data);

  useKeydown({
    target: window,
    events: {
      [key[bar]]: isMaximize ? handlerToggleBar : () => {},
    },
  });

  function handlerToggleBar() {
    dispatch(toggleBar({ bar }));
  }

  return (
    <div className="relative z-10">
      <div className={className}>{children}</div>
      {isMaximize && (
        <button
          type="button"
          className={`absolute ${style[bar]} w-10 h-10 bg-slate-300 z-10`}
          onClick={handlerToggleBar}
        >
          <FontAwesomeIcon
            className="transition-all"
            style={{
              transform: `rotate(${rotation[bar] + (data[bar] ? 180 : 0)}deg)`,
            }}
            icon={faChevronUp}
          />
        </button>
      )}
    </div>
  );
}

export default BarWrapper;
