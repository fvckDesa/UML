// types
import type { HTMLAttributes, MouseEvent, WheelEvent } from "react";
// hooks
import { useState, useEffect, useRef } from "react";
import { useGrabScroll } from "@src/hooks/useGrabScroll";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const TRACK_PADDING = 3;

function ScrollContainer({ className = "", children, ...divProps }: IProps) {
  const [trackLength, setTrackLength] = useState(0);
  const [trackTop, setTrackTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { target, ...scrollBar } = useGrabScroll<HTMLDivElement>();

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      if (!containerRef.current || !target.current) return;

      setTrackLength(
        (target.current.clientHeight / containerRef.current.scrollHeight) *
          target.current.clientHeight -
          TRACK_PADDING * 2
      );
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [containerRef]);

  function handlerScroll() {
    if (!containerRef.current || !target.current) return;
    setTrackTop(
      (target.current.clientHeight / containerRef.current.scrollHeight) *
        target.current.scrollTop
    );
  }

  function handlerWheel(e: WheelEvent) {
    if (!target.current) return;
    target.current.scrollBy({
      top: e.deltaY,
    });
  }

  function handlerClick(e: MouseEvent) {
    if (!containerRef.current || !target.current) return;
    const { top, height } = target.current.getBoundingClientRect();

    target.current.scrollTop =
      ((e.clientY - top) / height) *
      (containerRef.current.scrollHeight - height);
  }

  return (
    <div
      className={`${className} relative overflow-hidden group`}
      {...divProps}
    >
      <div
        ref={target}
        className="w-full h-full overflow-hidden"
        onScroll={handlerScroll}
        onWheel={handlerWheel}
      >
        <div
          ref={containerRef}
          className="w-full min-h-full overflow-y-visible"
        >
          {children}
        </div>
      </div>
      <div className="absolute top-0 right-0 h-full opacity-0 transition-opacity duration-300 group/scrollBar group-hover:opacity-100">
        <div className="absolute w-full h-full" onClick={handlerClick} />
        <div
          className="w-4 h-full border-l border-transparent group-hover/scrollBar:w-5 group-hover/scrollBar:border-gray-500 group-hover/scrollBar:bg-white transition-all"
          style={{ padding: TRACK_PADDING }}
          hidden={
            target.current?.clientHeight === containerRef.current?.scrollHeight
          }
          onWheel={handlerWheel}
          onMouseMove={scrollBar.onMouseMove}
        >
          <div
            className="w-full rounded bg-slate-600"
            style={{
              height: trackLength,
              transform: `translateY(${trackTop}px)`,
            }}
            onMouseDown={scrollBar.onMouseDown}
          />
        </div>
      </div>
    </div>
  );
}

export default ScrollContainer;
