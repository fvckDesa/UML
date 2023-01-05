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
// utils
import {
  stringifyAttribute,
  stringifyFinal,
  stringifyConstructor,
  stringifyMethod,
} from "@src/utils/class";
// data
import { MAIN_METHOD } from "@src/data/class";

interface IProps {
  id: string;
  container?: RefObject<HTMLDivElement>;
}

function Class({ id, container }: IProps) {
  const grabPoint = useRef({ x: 0, y: 0 });
  const classRef = useRef<HTMLDivElement>(null);
  const { data, dispatch } = useRedux((state) => ({
    element: state.uml.elements[id] as ClassElement,
    error: state.uml.errors[id],
    activeElement: state.uml.activeElement,
    clickEvent: state.editor.clickEvent,
  }));
  const { element, error, activeElement } = data;

  const handlerMouseMove = useCallback((e: MouseEvent) => {
    if (!container?.current || !classRef.current) return;

    const containerWidth = container.current.scrollWidth;
    const containerHeight = container.current.scrollHeight;

    const { width, height } = getComputedStyle(classRef.current);

    dispatch(
      updateElementLayout({
        id,
        layout: {
          x: Math.min(
            Math.max(e.clientX - grabPoint.current.x, 0),
            containerWidth - parseFloat(width)
          ),
          y: Math.min(
            Math.max(e.clientY - grabPoint.current.y, 0),
            containerHeight - parseFloat(height)
          ),
        },
      })
    );
  }, []);

  useEffect(() => {
    function removeMouseMove() {
      window.removeEventListener("mousemove", handlerMouseMove);
    }
    window.addEventListener("mouseup", removeMouseMove);
    return () => {
      removeMouseMove();
      window.removeEventListener("mouseup", removeMouseMove);
    };
  }, [handlerMouseMove]);

  function handlerMouseDown(e: ReactMouseEvent) {
    e.preventDefault();
    if (!classRef.current || e.button == 1 || data.clickEvent) return;

    grabPoint.current = {
      x: e.clientX - element.layout.x,
      y: e.clientY - element.layout.y,
    };

    window.addEventListener("mousemove", handlerMouseMove);
  }

  function handlerClassSelect() {
    dispatch(setActiveElement(id));
  }

  function handlerClick() {
    switch (data.clickEvent?.type) {
      case "delete": {
        if (data.activeElement === id) {
          dispatch(setActiveElement(null));
        }
        return dispatch(deleteElement(id));
      }
    }
  }

  return (
    <div
      ref={classRef}
      data-class-id={id}
      style={{ top: element.layout.y, left: element.layout.x }}
      className={`javaClass absolute min-w-[220px] w-max ${
        activeElement === id
          ? "border-4 border-blue-500 shadow-lg"
          : error
          ? "border-4 border-red-500"
          : "border-2 border-gray-400"
      } rounded-lg overflow-hidden font-medium cursor-pointer bg-white transition-border duration-300`}
      onMouseDown={handlerMouseDown}
      onDoubleClick={handlerClassSelect}
      onClick={handlerClick}
    >
      <h1
        className="text-lg text-center font-semibold p-2 border-b-2 border-gray-400 bg-gray-200"
        data-testid="name"
      >
        {stringifyFinal(element.data.name || "Class", element.data.isFinal)}
      </h1>
      <ul className="min-h-[50px] p-2 border-b-2 border-gray-400 transition-all">
        {element.data.attributes.map((attribute, i) => (
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
        {element.data.constructors.map((constructor, i) => (
          <li
            key={constructor.name + i}
            className="underline-offset-2"
            data-testid="constructor"
          >
            {stringifyConstructor(constructor)}
          </li>
        ))}
        {element.data.haveMain && (
          <li className="underline underline-offset-2">
            {stringifyMethod(MAIN_METHOD)}
          </li>
        )}
        {element.data.methods.map((method, i) => (
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
