// types
import type { DragEvent, MouseEvent } from "react";
// components
import Class from "./Class";
// hooks
import { useRef } from "react";
import { useRedux } from "@src/hooks/useRedux";
// redux
import { addElement } from "@src/features/umlSlice";
// data
import { UML_ELEMENTS, isUMLElement } from "@src/data/umlElements";

interface IProps {
  width: number;
  height: number;
}

function WorkSpace({ width, height }: IProps) {
  const { data, dispatch } = useRedux((state) => ({
    elements: state.uml.elements,
    clickEvent: state.uml.clickEvent,
  }));
  const ref = useRef<HTMLDivElement>(null);

  function handlerDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  function handlerDrop(e: DragEvent<HTMLDivElement>) {
    const element = e.dataTransfer.getData("application/uml");
    if (isUMLElement(element) && ref.current) {
      const { width, height } = UML_ELEMENTS[element].dimensions;
      const { x, y } = ref.current.getBoundingClientRect();

      dispatch(
        addElement({
          type: "class",
          layout: {
            x: Math.abs(x) + e.clientX - width / 2,
            y: Math.abs(y) + e.clientY - height / 2,
          },
        })
      );
    }
  }

  function handlerClick(e: MouseEvent<HTMLDivElement>) {
    if (data.clickEvent?.type === "element" && ref.current) {
      const { width, height } = UML_ELEMENTS[data.clickEvent.info].dimensions;
      const { x, y } = ref.current.getBoundingClientRect();

      dispatch(
        addElement({
          type: "class",
          layout: {
            x: Math.abs(x) + e.clientX - width / 2,
            y: Math.abs(y) + e.clientY - height / 2,
          },
        })
      );
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
      onClick={handlerClick}
    >
      {Object.keys(data.elements)
        .filter((id) => data.elements[id].type !== "arrow")
        .map((id) => (
          <Class key={id} id={id} container={ref} />
        ))}
      <svg width={width} height={height}>
        {Object.keys(data.elements)
          .filter((id) => data.elements[id].type === "arrow")
          .map((id) => (
            <>{/* <Arrow key={id} id={id} /> */}</>
          ))}
      </svg>
    </div>
  );
}

export default WorkSpace;
