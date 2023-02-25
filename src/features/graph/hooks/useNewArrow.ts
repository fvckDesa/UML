import { useRedux } from "@src/common/hooks";
import { EntityId } from "@reduxjs/toolkit";
import { Coords } from "@src/common/types";
import { MouseEvent, MouseEventHandler, useState } from "react";
import { addArrow, selectElementCoords } from "../graphSlice";
import { calcCoords, isTooShort } from "../utils/coords";
import { isEntityId } from "../utils/type-check";
import { ClickEvents } from "@src/features/editor/types";

export type NewArrowHandlerFn = (id?: EntityId) => MouseEventHandler;

export function useNewArrow<E extends Element = Element>(
  clickEvent?: Pick<NonNullable<ClickEvents>, "type">["type"]
) {
  const [mouse, setMouse] = useState<Coords | null>(null);
  const [from, setFrom] = useState<Coords | EntityId | null>(null);
  const { data, dispatch } = useRedux((state) =>
    isEntityId(from) ? selectElementCoords(state, from) : null
  );

  function onMouseDown(id?: EntityId) {
    return parser((e: MouseEvent<E>) => {
      setFrom(id ?? calcCoords(e));
    }, true);
  }

  function onMouseMove() {
    return parser((e: MouseEvent<E>) => setMouse(calcCoords(e)));
  }

  function onMouseUp(id?: EntityId) {
    return parser((e: MouseEvent<E>) => {
      if (!from) return;
      if (isEntityId(from) || id || !isTooShort(from, calcCoords(e))) {
        dispatch(addArrow(from, id ?? calcCoords(e)));
      }

      setMouse(null);
      setFrom(null);
    }, true);
  }

  function parser(fn: (e: MouseEvent<E>) => void, stop = false) {
    return function (e: MouseEvent<E>) {
      if (clickEvent === "arrow" && e.button === 0) {
        stop && e.stopPropagation();
        fn(e);
      }
    };
  }

  return {
    from: data ?? from,
    to: mouse,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
}
