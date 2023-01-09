import { updateElementLayout } from "@src/features/umlSlice";
import { useRedux } from "@src/hooks/useRedux";
import { Coords } from "@src/types/general";
import { ComponentType, useCallback, useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent, RefObject } from "react";

interface IProps<D = any> {
  id: string;
  component: ComponentType<{ id: string; data: D }>;
  container: RefObject<HTMLDivElement>;
  onMouseDown: (e: ReactMouseEvent) => void;
  onMouseUp: (e: ReactMouseEvent) => void;
}

function Element<D = any>({
  id,
  component: Component,
  container,
  onMouseDown,
  onMouseUp,
}: IProps<D>) {
  const {
    data: { layout, data, clickEvent },
    dispatch,
  } = useRedux((state) => ({
    layout: state.uml.elements[id].layout as Coords,
    data: state.uml.elements[id].data as D,
    clickEvent: state.editor.clickEvent,
  }));
  const grabPoint = useRef({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handlerMouseMove = useCallback((e: MouseEvent) => {
    if (!container.current || !elementRef.current) return;

    const containerWidth = container.current.scrollWidth;
    const containerHeight = container.current.scrollHeight;

    const { width, height } = getComputedStyle(elementRef.current);

    dispatch(
      updateElementLayout({
        id,
        layout: {
          x: Math.min(
            Math.max(e.clientX - grabPoint.current.x, 0),
            containerWidth - parseFloat(width)
          ),
          y: Math.min(
            Math.max(e.clientY - grabPoint.current.y, 0),
            containerHeight - parseFloat(height)
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
    onMouseDown(e);
    if (!elementRef.current || e.button == 1 || clickEvent) return;

    grabPoint.current = {
      x: e.clientX - layout.x,
      y: e.clientY - layout.y,
    };

    window.addEventListener("mousemove", handlerMouseMove);
  }

  return (
    <div
      ref={elementRef}
      className="absolute"
      style={{ top: layout.y, left: layout.x }}
      onMouseDown={handlerMouseDown}
      onMouseUp={onMouseUp}
    >
      {<Component id={id} data={data} />}
    </div>
  );
}

export default Element;
