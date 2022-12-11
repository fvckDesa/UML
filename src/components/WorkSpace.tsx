// types
import type { DragEvent, MouseEvent } from "react";
import type { Coords, Dimensions } from "@src/types/general";
// components
import Class from "./Class";
import Arrow from "./Arrow";
import NewArrow from "./NewArrow";
// hooks
import { useUMLContext } from "@src/contexts/UML";
import { useRef, useState, useEffect } from "react";
// utils
import { v4 as uuid } from "uuid";

interface IProps {
  width: number;
  height: number;
  onActiveClass: (coords: Coords) => void;
}

function WorkSpace({ width, height, onActiveClass }: IProps) {
  const { umlClasses, dispatchClasses, umlArrows } = useUMLContext();
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
    const data = e.dataTransfer.getData("application/uml");
    if (data && ref.current) {
      const { width, height } = JSON.parse(data) as Dimensions;
      const { x, y } = ref.current.getBoundingClientRect();
      const id = uuid();

      dispatchClasses({
        type: "class/add",
        payload: {
          javaClass: {
            name: `Class${Object.keys(umlClasses).length + 1}`,
            attributes: [],
            constructors: [],
            methods: [],
            isFinal: false,
            haveMain: false,
          },
          coords: {
            x: Math.abs(x) + e.clientX - width / 2,
            y: Math.abs(y) + e.clientY - height / 2,
          },
          id,
        },
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

  return (
    <div
      ref={ref}
      id="workspace"
      className="relative bg-[length:25px_25px] bg-dot z-0"
      style={{ width, height }}
      onDrop={handlerDrop}
      onDragOver={handlerDragOver}
      onMouseMove={umlArrows.newArrow ? changePointerCoords : undefined}
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
