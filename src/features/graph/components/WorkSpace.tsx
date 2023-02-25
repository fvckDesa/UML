import { Coords, Dimensions } from "@src/common/types";
import { UML_ELEMENTS, isUMLElement } from "@src/data/umlElements";
import { Graph } from "@src/features/graph/types";
import {
  DragEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useRef,
} from "react";
import { Element } from "@src/features/graph/containers";
import { ClickEvents } from "@src/features/editor/types";
import Arrow from "../containers/Arrow";
import { NewArrowHandlerFn } from "../hooks/useNewArrow";

interface IWorkSpace extends Omit<Graph, "elements" | "arrows"> {
  elements: (string | number)[];
  arrows: (string | number)[];
  clickEvent: ClickEvents;
  children: ReactNode;
  onElementAdd: (type: string, coords: Coords) => void;
  onMouseUp: NewArrowHandlerFn;
  onMouseDown: NewArrowHandlerFn;
  onMouseMove: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
}

function WorkSpace({
  width,
  height,
  elements,
  arrows,
  clickEvent,
  onElementAdd,
  children,
  ...handlers
}: IWorkSpace) {
  const ref = useRef<HTMLDivElement>(null);

  function handlerDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  function handlerDrop(e: DragEvent<HTMLDivElement>) {
    const element = e.dataTransfer.getData("application/uml");
    if (isUMLElement(element)) {
      addNewElement(UML_ELEMENTS[element].dimensions, {
        x: e.clientX,
        y: e.clientY,
      });
    }
  }

  function handlerClick(e: MouseEvent<HTMLDivElement>) {
    switch (clickEvent?.type) {
      case "element": {
        addNewElement(UML_ELEMENTS["javaClass"].dimensions, {
          x: e.clientX,
          y: e.clientY,
        });
        break;
      }
    }
  }

  function addNewElement(dimensions: Dimensions, dropCoords: Coords) {
    if (!ref.current) return;

    const { x, y } = ref.current.getBoundingClientRect();

    onElementAdd("javaClass", {
      x: Math.min(
        Math.max(x * -1 + dropCoords.x - dimensions.width / 2, 0),
        width - dimensions.width
      ),
      y: Math.min(
        Math.max(y * -1 + dropCoords.y - dimensions.height / 2, 0),
        height - dimensions.height
      ),
    });
  }

  return (
    <div
      id="workspace"
      ref={ref}
      className="relative bg-[length:25px_25px] bg-dot bg-white shadow-3xl"
      style={{ width, height }}
      onDrop={handlerDrop}
      onDragOver={handlerDragOver}
      onClick={handlerClick}
      {...handlers}
      onMouseDown={handlers.onMouseDown()}
      onMouseUp={handlers.onMouseUp()}
    >
      {elements.map((id) => (
        <Element
          key={id}
          id={id}
          container={{ width, height }}
          clickEvent={clickEvent}
          onMouseDown={handlers.onMouseDown}
          onMouseUp={handlers.onMouseUp}
        />
      ))}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {arrows.map((id) => (
          <Arrow key={id} id={id} />
        ))}
        {children}
      </svg>
    </div>
  );
}

export default WorkSpace;
