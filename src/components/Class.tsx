// types
import type { MouseEvent as ReactMouseEvent, RefObject } from "react";
import type { ClassElement } from "@src/types/uml";
// hooks
import { useCallback, useEffect, useRef } from "react";
import { useRedux } from "@src/hooks/useRedux";
// redux
import {
  deleteElement,
  setActiveElement,
  updateElementLayout,
} from "@src/features/umlSlice";
import { toggleBar } from "@src/features/editorSlice";
// utils
import {
  stringifyAttribute,
  stringifyFinal,
  stringifyConstructor,
  stringifyMethod,
} from "@src/utils/class";
// data
import { MAIN_METHOD } from "@src/data/class";
import { JavaClass } from "@src/types/class";

interface IProps {
  id: string;
  data: JavaClass;
}

function Class({ id, data }: IProps) {
  const { data: reduxData, dispatch } = useRedux((state) => ({
    error: state.uml.errors[id],
    activeElement: state.uml.activeElement,
    clickEvent: state.editor.clickEvent,
  }));
  const { error, activeElement, clickEvent } = reduxData;

  function handlerClassSelect() {
    dispatch(setActiveElement(activeElement === id ? null : id));
    dispatch(toggleBar({ bar: "right", force: !(activeElement === id) }));
  }

  function handlerClick() {
    switch (clickEvent?.type) {
      case "delete": {
        if (activeElement === id) {
          dispatch(setActiveElement(null));
          dispatch(toggleBar({ bar: "right", force: false }));
        }
        return dispatch(deleteElement(id));
      }
    }
  }

  return (
    <div
      className={`javaClass min-w-[220px] w-max ${
        activeElement === id
          ? "border-4 border-blue-500 shadow-lg"
          : error
          ? "border-4 border-red-500"
          : "border-2 border-gray-400"
      } rounded-lg overflow-hidden font-medium cursor-pointer bg-white transition-border duration-300`}
      onDoubleClick={handlerClassSelect}
      onClick={handlerClick}
    >
      <h1
        className="text-lg text-center font-semibold p-2 border-b-2 border-gray-400 bg-gray-200"
        data-testid="name"
      >
        {stringifyFinal(data.name || "Class", data.isFinal)}
      </h1>
      <ul className="min-h-[50px] p-2 border-b-2 border-gray-400 transition-all">
        {data.attributes.map((attribute, i) => (
          <li
            key={attribute.name + i}
            className={`${
              attribute.isStatic ? "underline" : ""
            } underline-offset-2`}
            data-testid="attribute"
          >
            {stringifyAttribute(attribute)}
          </li>
        ))}
      </ul>
      <ul className="min-h-[50px] p-2">
        {data.constructors.map((constructor, i) => (
          <li
            key={constructor.name + i}
            className="underline-offset-2"
            data-testid="constructor"
          >
            {stringifyConstructor(constructor)}
          </li>
        ))}
        {data.haveMain && (
          <li className="underline underline-offset-2">
            {stringifyMethod(MAIN_METHOD)}
          </li>
        )}
        {data.methods.map((method, i) => (
          <li
            key={method.name + i}
            className={`${
              method.isStatic ? "underline" : ""
            } underline-offset-2`}
            data-testid="method"
          >
            {stringifyMethod(method)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Class;
