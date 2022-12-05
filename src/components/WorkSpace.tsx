// types
import type { DragEvent } from "react";
import type { Dimensions } from "@src/types/general";
// components
import Class from "./Class";
// hooks
import { useUMLContext } from "@src/contexts/UML";
import { useRef } from "react";
// utils
import { v4 as uuid } from "uuid";

interface IProps {
  width: number;
  height: number;
  onActiveClass: (id: string) => void;
}

function WorkSpace({ width, height, onActiveClass }: IProps) {
  const { umlClasses, dispatchClasses } = useUMLContext();
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={ref}
      id="workspace"
      className="relative bg-[length:25px_25px] bg-dot z-0"
      style={{
        width,
        height,
      }}
      onDrop={handlerDrop}
      onDragOver={handlerDragOver}
    >
      {Object.keys(umlClasses).map((id) => (
        <Class key={id} id={id} onClassSelect={onActiveClass} container={ref} />
      ))}
    </div>
  );
}

export default WorkSpace;
