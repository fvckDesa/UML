// types
import type { DragEvent, MouseEvent } from "react";
import type { Coords } from "@src/types/general";
// components
import Class from "./Class";
import Arrow from "./Arrow";
import NewArrow from "./NewArrow";
// hooks
import { useUMLContext } from "@src/contexts/UML";
import { useRef, useState, useEffect } from "react";
// utils
import { dispatchNewClass } from "@src/utils/dispatch";
// data
import { UML_ELEMENTS, isUMLElement } from "@src/data/umlElements";

interface IProps {
  width: number;
  height: number;
  onActiveClass: (coords: Coords) => void;
}

function WorkSpace({ width, height, onActiveClass }: IProps) {
  const { umlClasses, dispatchClasses, umlArrows, umlInfo } = useUMLContext();
  const ref = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<Coords | null>(null);

  useEffect(() => {
    setPointer(null);
  }, [umlArrows.newArrow]);

  function handlerDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  function handlerDrop(e: DragEvent<HTMLDivElement>) {
    const element = e.dataTransfer.getData("application/uml");
    if (isUMLElement(element) && ref.current) {
      const { width, height } = UML_ELEMENTS[element];
      const { x, y } = ref.current.getBoundingClientRect();

      dispatchNewClass({
        dispatch: dispatchClasses,
        name: `Class${Object.values(umlClasses).length + 1}`,
        x: Math.abs(x) + e.clientX - width / 2,
        y: Math.abs(y) + e.clientY - height / 2,
      });
    }
  }

  function changePointerCoords(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const { x, y } = ref.current.getBoundingClientRect();

    setPointer({
      x: Math.abs(x) + e.clientX,
      y: Math.abs(y) + e.clientY,
    });
  }

  function handlerClick(e: MouseEvent<HTMLDivElement>) {
    if (umlInfo.clickEvent?.type === "element" && ref.current) {
      const { width, height } = UML_ELEMENTS[umlInfo.clickEvent.info];
      const { x, y } = ref.current.getBoundingClientRect();

      dispatchNewClass({
        dispatch: dispatchClasses,
        name: `Class${Object.values(umlClasses).length + 1}`,
        x: Math.abs(x) + e.clientX - width / 2,
        y: Math.abs(y) + e.clientY - height / 2,
      });
    }
  }

  return (
    <div
      ref={ref}
      id="workspace"
      className="relative bg-[length:25px_25px] bg-dot z-0"
      style={{ width, height }}
      onDrop={handlerDrop}
      onDragOver={handlerDragOver}
      onMouseMove={umlArrows.newArrow ? changePointerCoords : undefined}
      onClick={handlerClick}
    >
      {Object.keys(umlClasses).map((id) => (
        <Class key={id} id={id} onClassSelect={onActiveClass} container={ref} />
      ))}
      <svg width={width} height={height}>
        {umlArrows.newArrow && pointer && (
          <NewArrow node={umlArrows.newArrow} pointer={pointer} />
        )}
        {Object.keys(umlArrows.arrows).map((id) => (
          <Arrow key={id} id={id} />
        ))}
      </svg>
    </div>
  );
}

export default WorkSpace;
