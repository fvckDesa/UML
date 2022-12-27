import type { Dispatch } from "react";
import type { Relationships } from "@src/types/arrow";
import type { ClassesAction } from "@src/types/classesReducer";
import type { ArrowActions } from "@src/types/arrowReducer";
// uuid
import { v4 as uuid } from "uuid";

interface INewClass {
  dispatch: Dispatch<ClassesAction>;
  name: string;
  x: number;
  y: number;
}

export function dispatchNewClass({ dispatch, name, x, y }: INewClass) {
  dispatch({
    type: "class/add",
    payload: {
      javaClass: {
        name,
        attributes: [],
        constructors: [],
        methods: [],
        isFinal: false,
        haveMain: false,
      },
      coords: {
        x,
        y,
      },
      id: uuid(),
    },
  });
}

interface INewArrow {
  dispatch: Dispatch<ArrowActions>;
  id: string;
  node: string | null;
  relationship: Relationships;
}

export function dispatchNewArrow({
  dispatch,
  id,
  node,
  relationship,
}: INewArrow) {
  if (node) {
    dispatch({
      type: "arrow/add",
      payload: {
        id: uuid(),
        arrow: {
          relationship,
          nodes: [node, id],
        },
      },
    });
    dispatch({
      type: "arrow/cancel",
      payload: {},
    });
    return;
  }
  dispatch({
    type: "arrow/new",
    payload: {
      node: id,
    },
  });
}
