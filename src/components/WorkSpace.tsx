// types
import { DragEvent, MouseEvent, useEffect, useState } from "react";
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
import Arrow from "./Arrow";
import { ClassElement } from "@src/types/uml";
import { useNewArrow } from "@src/hooks/useNewArrow";
import Line from "./Line";
import Element from "./Element";

interface IProps {
  width: number;
  height: number;
}

function WorkSpace({ width, height }: IProps) {
  const { data, dispatch } = useRedux((state) => ({
    elements: state.uml.elements,
    clickEvent: state.editor.clickEvent,
  }));
  const ref = useRef<HTMLDivElement>(null);
  const { from, to, ...handlers } = useNewArrow();

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
      onMouseDown={handlers.handlerMouseDown(null)}
      onMouseMove={handlers.handlerMouseMove()}
      onMouseUp={handlers.handlerMouseUp(null)}
      onMouseLeave={handlers.handlerMouseUp(null)}
    >
      {Object.keys(data.elements)
        .filter((id) => data.elements[id].type !== "arrow")
        .map((id) => (
          <Element
            key={id}
            id={id}
            component={Class}
            container={ref}
            onMouseDown={handlers.handlerMouseDown(id)}
            onMouseUp={handlers.handlerMouseUp(id)}
          />
        ))}
      <svg
        width={width}
        height={height}
        viewBox={`-1 -1 ${width + 1} ${height + 1}`}
      >
        {Object.keys(data.elements)
          .filter((id) => data.elements[id].type === "arrow")
          .map((id) => (
            <Arrow key={id} id={id} />
          ))}
        {from && to && <Line from={from} to={to} />}
      </svg>
    </div>
  );
}

export default WorkSpace;
