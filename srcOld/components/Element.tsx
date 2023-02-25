// types
import type { ElementLayout } from "@src/types/uml";
import type {
  MouseEvent as ReactMouseEvent,
  RefObject,
  ComponentType,
} from "react";
// hooks
import { useRedux } from "@src/hooks/useRedux";
import { useCallback, useEffect, useRef } from "react";
// redux
import {
  deleteElement,
  setActiveElement,
  updateElementLayout,
} from "@src/features/umlSlice";

interface IProps<D = any> {
  id: string;
  component: ComponentType<{ data: D }>;
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
    data: { layout, data, clickEvent, isActive },
    dispatch,
  } = useRedux((state) => ({
    layout: state.uml.elements[id].layout as ElementLayout,
    data: state.uml.elements[id].data as D,
    clickEvent: state.editor.clickEvent,
    isActive: state.uml.activeElement === id,
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

  /* useEffect(() => {
    if (!elementRef.current) return;
    const observer = new ResizeObserver(() => {
      if (!elementRef.current) return;
      console.log(elementRef.current.clientWidth);
      dispatch(
        updateElementLayout({
          id,
          layout: {
            width: elementRef.current.clientWidth,
            height: elementRef.current.clientHeight,
          },
        })
      );
    });

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef]); */

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

  function handlerClick() {
    switch (clickEvent?.type) {
      case "delete": {
        if (isActive) dispatch(setActiveElement(null));
        dispatch(deleteElement(id));
        break;
      }
      default: {
        dispatch(setActiveElement(isActive ? null : id));
      }
    }
  }

  return (
    <div
      ref={elementRef}
      className={`absolute border ${
        isActive ? "border-gray-500" : "border-transparent"
      }`}
      style={{
        top: layout.y,
        left: layout.x,
      }}
      onMouseDown={handlerMouseDown}
      onMouseUp={onMouseUp}
      onClick={handlerClick}
    >
      {<Component data={data} />}
    </div>
  );
}

export default Element;
