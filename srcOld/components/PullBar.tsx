// types
import { Bars } from "@src/types/editor";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// hooks
import { useRedux } from "@src/hooks/useRedux";
import { useKeydown } from "@src/hooks/useKeydown";
// redux
import { toggleBar } from "@src/features/editorSlice";
// icons
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  bar: Bars;
}

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

function PullBar({ bar }: IProps) {
  const { data, dispatch } = useRedux((state) => state.editor.barsStatus[bar]);

  function handlerClick() {
    dispatch(toggleBar({ bar }));
  }

  useKeydown({
    target: window,
    events: {
      [key[bar]]: () => handlerClick(),
    },
  });

  return (
    <button
      type="button"
      className={`absolute ${style[bar]} w-10 h-10 bg-slate-300 z-10`}
      onClick={handlerClick}
    >
      <FontAwesomeIcon
        className="transition-all"
        style={{
          transform: `rotate(${rotation[bar] + (data ? 180 : 0)}deg)`,
        }}
        icon={faChevronUp}
      />
    </button>
  );
}

export default PullBar;
