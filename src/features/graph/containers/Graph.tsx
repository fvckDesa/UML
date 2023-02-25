import { useRedux, useGrabScroll } from "@src/common/hooks";
import { addElement, selectGraph } from "@src/features/graph/graphSlice";
import { WorkSpace } from "@src/features/graph/components";
import { MouseEvent, useLayoutEffect } from "react";
import { Coords } from "@src/common/types";
import { ClickEvents } from "@src/features/editor/types";
import { useNewArrow } from "../hooks/useNewArrow";
import Line from "../components/Line";
import NewArrow from "./NewArrow";

interface IGraph {
  clickEvent: ClickEvents;
}

function Graph({ clickEvent }: IGraph) {
  const { data, dispatch } = useRedux(selectGraph);
  const { isGrabbing, target, onMouseDown, onMouseMove } =
    useGrabScroll<HTMLDivElement>({ reverse: true });
  const { from, to, ...handlers } = useNewArrow(clickEvent?.type);
  // scroll to center of workspace
  useLayoutEffect(() => {
    if (!target.current) return;
    const el = target.current;

    el.scrollTo({
      top: el.scrollHeight / 2 - el.clientHeight / 2,
      left: el.scrollWidth / 2 - el.clientWidth / 2,
    });
  }, []);

  function handlerRoleDown(e: MouseEvent<HTMLDivElement>) {
    if ((clickEvent?.type !== "move" && e.button != 1) || !target.current)
      return;
    e.preventDefault();

    onMouseDown(e);
  }

  function handlerElementAdd(type: string, { x, y }: Coords) {
    dispatch(
      addElement({
        type,
        data: {
          name: "Test",
          isFinal: false,
          attributes: [],
          constructors: [],
          methods: [],
          haveMain: false,
        },
        layout: {
          x,
          y,
          width: 200,
          height: 150,
        },
      })
    );
  }

  return (
    <div
      data-grabbing={isGrabbing}
      data-click-event={clickEvent?.type ?? ""}
      className="relative flex-1 transition-all overflow-hidden"
      onMouseDown={handlerRoleDown}
      onMouseMove={onMouseMove}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        ref={target}
        className="fixed top-0 left-0 w-screen h-screen overflow-hidden"
      >
        <div className="w-fit h-fit px-96 py-80 bg-slate-100">
          <WorkSpace
            width={data.width}
            height={data.height}
            elements={data.elements}
            arrows={data.arrows}
            clickEvent={clickEvent}
            onElementAdd={handlerElementAdd}
            onMouseUp={handlers.onMouseUp}
            onMouseDown={handlers.onMouseDown}
            onMouseMove={handlers.onMouseMove()}
            onMouseLeave={handlers.onMouseUp()}
          >
            <NewArrow from={from} to={to} />
          </WorkSpace>
        </div>
      </div>
    </div>
  );
}

export default Graph;
