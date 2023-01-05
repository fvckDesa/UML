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
import { Dimensions } from "@src/types/general";

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
    if (isUMLElement(element)) {
      addNewElement(UML_ELEMENTS[element].dimensions, e.clientX, e.clientY);
    }
  }

  function handlerClick(e: MouseEvent<HTMLDivElement>) {
    if (data.clickEvent?.type === "element") {
      addNewElement(
        UML_ELEMENTS[data.clickEvent.info].dimensions,
        e.clientX,
        e.clientY
      );
    }
  }

  function addNewElement(
    dimensions: Dimensions,
    clientX: number,
    clientY: number
  ) {
    if (!ref.current) return;
    const { x, y, width, height } = ref.current.getBoundingClientRect();
    dispatch(
      addElement({
        type: "class",
        layout: {
          x: Math.min(
            Math.max(x * -1 + clientX - dimensions.width / 2, 0),
            width - dimensions.width
          ),
          y: Math.min(
            Math.max(y * -1 + clientY - dimensions.height / 2, 0),
            height - dimensions.height
          ),
        },
      })
    );
  }

  return (
    <div
      ref={ref}
      id="workspace"
      className="relative bg-[length:25px_25px] bg-dot bg-white shadow-3xl"
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
