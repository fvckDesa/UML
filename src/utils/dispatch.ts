import type { Dispatch } from "react";
import type { ClassesAction } from "@src/types/classesReducer";
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
