// types
import type { MouseEvent as ReactMouseEvent, RefObject } from "react";
import type { Coords } from "@src/types/general";
// hooks
import { useCallback, useEffect, useRef } from "react";
import { useUMLContext } from "@src/contexts/UML";
// utils
import {
  stringifyAttribute,
  stringifyFinal,
  stringifyConstructor,
  stringifyMethod,
} from "@src/utils/class";
// data
import { MAIN_METHOD } from "@src/data/class";
// uuid
import { v4 as uuid } from "uuid";

interface IProps {
  id: string;
  container?: RefObject<HTMLDivElement>;
  onClassSelect: (centerCoords: Coords) => void;
}

function Class({ id, container, onClassSelect }: IProps) {
  const grabPoint = useRef({ x: 0, y: 0 });
  const classRef = useRef<HTMLDivElement>(null);
  const {
    umlClasses,
    dispatchClasses,
    umlInfo,
    dispatchInfo,
    umlArrows,
    dispatchArrow,
  } = useUMLContext();
  const {
    javaClass: { name, isFinal, haveMain, attributes, constructors, methods },
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

  useEffect(() => {
    dispatchClasses({
      type: "ref/update",
      payload: {
        id,
        ref: classRef.current,
      },
    });
  }, [classRef]);

  function handlerMouseDown(e: ReactMouseEvent) {
    e.preventDefault();
    if (!classRef.current || e.button == 1 || umlInfo.clickEvent) return;

    grabPoint.current = {
      x: e.clientX - coords.x,
      y: e.clientY - coords.y,
    };

    window.addEventListener("mousemove", handlerMouseMove);
  }

  function handlerClassSelect() {
    if (!classRef.current) return;
    const { width, height } = classRef.current.getBoundingClientRect();
    onClassSelect({
      x: coords.x + width / 2,
      y: coords.y + height / 2,
    });

    dispatchInfo({ type: "activeClass/change", payload: { id } });
  }

  function handlerClick() {
    if (umlInfo.clickEvent === "arrow") {
      if (umlArrows.newArrow && umlArrows.newArrow !== id) {
        dispatchArrow({
          type: "arrow/add",
          payload: {
            id: uuid(),
            arrow: {
              relationship: "association",
              nodes: [umlArrows.newArrow, id],
            },
          },
        });
        dispatchArrow({
          type: "arrow/cancel",
          payload: {},
        });
        return;
      }
      dispatchArrow({
        type: "arrow/new",
        payload: {
          node: id,
        },
      });
    }
  }

  return (
    <div
      ref={classRef}
      data-class-id={id}
      style={{ top: coords.y, left: coords.x }}
      className={`javaClass absolute min-w-[220px] w-max ${
        umlInfo.activeClass === id
          ? "border-4 border-blue-500 shadow-lg"
          : umlInfo.errors[id]
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
        {constructors.map((constructor, i) => (
          <li
            key={constructor.name + i}
            className="underline-offset-2"
            data-testid="constructor"
          >
            {stringifyConstructor(constructor)}
          </li>
        ))}
        {haveMain && (
          <li className="underline underline-offset-2">
            {stringifyMethod(MAIN_METHOD)}
          </li>
        )}
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
