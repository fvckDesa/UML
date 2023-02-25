import { useRedux } from "@src/common/hooks";
import {
  deleteElement,
  selectElementById,
  updateLayout,
} from "@src/features/graph/graphSlice";
import {
  useCallback,
  useEffect,
  useRef,
  MouseEvent as ReactMouseEvent,
} from "react";
import { Dimensions } from "@src/common/types";
import { Class } from "@src/common/components";
import { ClickEvents } from "@src/features/editor/types";
import { NewArrowHandlerFn } from "../hooks/useNewArrow";

interface IElement {
  id: string | number;
  container: Dimensions;
  clickEvent: ClickEvents;
  onMouseDown: NewArrowHandlerFn;
  onMouseUp: NewArrowHandlerFn;
}

function Element({
  id,
  container,
  clickEvent,
  onMouseDown,
  onMouseUp,
}: IElement) {
  const { data: element, dispatch } = useRedux((state) =>
    selectElementById(state, id)
  );
  const grabPoint = useRef({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handlerMouseMove = useCallback((e: MouseEvent) => {
    if (!elementRef.current) return;

    const { width, height } = getComputedStyle(elementRef.current);

    dispatch(
      updateLayout({
        id,
        layout: {
          x: Math.min(
            Math.max(e.clientX - grabPoint.current.x, 0),
            container.width - parseFloat(width)
          ),
          y: Math.min(
            Math.max(e.clientY - grabPoint.current.y, 0),
            container.height - parseFloat(height)
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
    if (!element || e.button == 1 || clickEvent) return;

    grabPoint.current = {
      x: e.clientX - element.layout.x,
      y: e.clientY - element.layout.y,
    };

    window.addEventListener("mousemove", handlerMouseMove);
  }

  function handlerClick() {
    switch (clickEvent?.type) {
      case "delete": {
        dispatch(deleteElement(id));
        break;
      }
    }
  }

  if (!element) return null;

  return (
    <div
      ref={elementRef}
      className={`absolute cursor-pointer`}
      style={{
        top: element.layout.y,
        left: element.layout.x,
      }}
      onMouseDown={
        clickEvent?.type === "arrow" ? onMouseDown(id) : handlerMouseDown
      }
      onMouseUp={onMouseUp(id)}
      onClick={handlerClick}
    >
      {<Class data={element.data as any} />}
    </div>
  );
}

export default Element;
