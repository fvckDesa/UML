import { Coords } from "@src/types/general";
import { MouseEvent, useState } from "react";
import { useRedux } from "./useRedux";
import { addElement } from "@src/features/umlSlice";
import { usePoint } from "./usePoint";

export function useNewArrow<T extends Element = Element>() {
  const [mouse, setMouse] = useState<Coords | null>(null);
  const [from, setFrom] = useState<Coords | string | null>(null);
  const { data, dispatch } = useRedux((state) => ({
    clickEvent: state.editor.clickEvent,
    elements: state.uml.elements,
  }));

  function handlerMouseDown(id: string | null) {
    return parser((e: MouseEvent<T>) => {
      setFrom(id ?? calcCoords(e));
    }, true);
  }

  function handlerMouseMove() {
    return parser((e: MouseEvent<T>) => setMouse(calcCoords(e)));
  }

  function handlerMouseUp(id: string | null) {
    return parser((e: MouseEvent<T>) => {
      if (!from) return;
      const to = id ?? calcCoords(e);
      const fromCoords =
        typeof from === "string"
          ? (data.elements[from].layout as Coords)
          : from;
      if (
        typeof to === "string" ||
        Math.abs(fromCoords.x - to.x) > 5 ||
        Math.abs(fromCoords.y - to.y) > 5
      ) {
        dispatch(
          addElement({
            type: "arrow",
            layout: { from, to },
          })
        );
      }
      setFrom(null);
      setMouse(null);
    }, true);
  }

  function calcCoords(e: MouseEvent<T>) {
    const { x, y } = e.currentTarget.getBoundingClientRect();
    return {
      x: x * -1 + e.clientX,
      y: y * -1 + e.clientY,
    };
  }

  function parser(fn: (e: MouseEvent<T>) => void, stop = false) {
    return function (e: MouseEvent<T>) {
      if (data.clickEvent?.type === "arrow" && e.button === 0) {
        stop && e.stopPropagation();
        fn(e);
      }
    };
  }

  return {
    from: usePoint(from),
    to: mouse,
    handlerMouseDown,
    handlerMouseMove,
    handlerMouseUp,
  };
}
