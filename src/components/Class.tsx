// types
import type { MouseEvent as ReactMouseEvent, RefObject } from "react";
// hooks
import { useCallback, useEffect, useRef } from "react";
// utils
import {
  stringifyAttribute,
  stringifyFinal,
  stringifyMethod,
} from "@src/utils/class";
import { useUMLContext } from "@src/contexts/UML";

interface IProps {
  id: string;
  container?: RefObject<HTMLDivElement>;
  onClassSelect: (id: string) => void;
}

function Class({ id, container, onClassSelect }: IProps) {
  const grabPoint = useRef({ x: 0, y: 0 });
  const classRef = useRef<HTMLDivElement>(null);
  const { umlClasses, dispatchClasses, umlInfo, dispatchInfo } =
    useUMLContext();
  const {
    javaClass: { name, isFinal, attributes, methods },
    coords,
  } = umlClasses[id];

  const handlerMouseMove = useCallback((e: MouseEvent) => {
    if (!container?.current || !classRef.current) return;

    const containerWidth = container.current.scrollWidth;
    const containerHeight = container.current.scrollHeight;

    const { width, height } = getComputedStyle(classRef.current);

    dispatchClasses({
      type: "coords/update",
      payload: {
        id,
        coords: {
          x: Math.min(
            Math.max(e.clientX - grabPoint.current.x, 0),
            containerWidth - parseFloat(width)
          ),
          y: Math.min(
            Math.max(e.clientY - grabPoint.current.y, 0),
            containerHeight - parseFloat(height)
          ),
        },
      },
    });
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
    if (!classRef.current || e.button == 1) return;

    const { top, left } = getComputedStyle(classRef.current);
    grabPoint.current = {
      x: e.clientX - parseFloat(left),
      y: e.clientY - parseFloat(top),
    };

    window.addEventListener("mousemove", handlerMouseMove);
  }

  function handlerClassSelect() {
    onClassSelect(id);
    dispatchInfo({ type: "activeClass/change", payload: { id } });
  }

  return (
    <div
      data-class-id={id}
      ref={classRef}
      className={`absolute min-w-[200px] w-fit ${
        umlInfo.errors[id]
          ? "border-4 border-red-500"
          : umlInfo.activeClass === id
          ? "border-4 border-blue-500"
          : "border-2 border-gray-400"
      } rounded-lg overflow-hidden font-medium cursor-pointer bg-white transition-border duration-300`}
      style={{
        top: `${coords.y}px`,
        left: `${coords.x}px`,
      }}
      onMouseDown={handlerMouseDown}
      onDoubleClick={handlerClassSelect}
    >
      <h1
        className="text-lg text-center font-semibold p-2 border-b-2 border-gray-400 bg-gray-200"
        data-testid="name"
      >
        {stringifyFinal(name || "Class", isFinal)}
      </h1>
      <ul className="min-h-[50px] p-2 border-b-2 border-gray-400 transition-all">
        {attributes.map((attribute, i) => (
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
        {methods.map((method, i) => (
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
