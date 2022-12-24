// types
import type {
  HTMLAttributes,
  MouseEvent,
  WheelEvent,
  CSSProperties,
  UIEvent,
} from "react";
// hooks
import { useState, useEffect } from "react";
import { useGrabScroll } from "@src/hooks/useGrabScroll";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  height?: CSSProperties["height"];
  maxHeight?: CSSProperties["maxHeight"];
  scrollAbsolute?: boolean;
}

function ScrollContainer({
  height = "100%",
  maxHeight = "100%",
  scrollAbsolute = false,
  className = "",
  children,
  onScroll,
  ...divProps
}: IProps) {
  const [trackTop, setTrackTop] = useState(0);
  const [ratio, setRatio] = useState(0);
  const { target, ...scrollBar } = useGrabScroll<HTMLDivElement>({
    transformDistance: (dy, target) =>
      dy / (target.clientHeight / target.scrollHeight),
  });

  useEffect(() => {
    if (!target.current) return;

    function resizeRatio() {
      if (!target.current) return;
      const { clientHeight, scrollHeight } = target.current;

      setRatio((clientHeight - 4) / (scrollHeight - 4));
    }

    const mutation = new MutationObserver(resizeRatio);
    const resize = new ResizeObserver(resizeRatio);

    mutation.observe(target.current, {
      childList: true,
      subtree: true,
    });
    resize.observe(target.current);

    return () => {
      mutation.disconnect();
      resize.disconnect();
    };
  }, [target]);

  function handlerScroll(e: UIEvent<HTMLDivElement>) {
    onScroll?.(e);
    if (!target.current) return;
    setTrackTop(ratio * target.current.scrollTop);
  }

  function handlerWheel(e: WheelEvent) {
    if (!target.current) return;

    target.current.scrollBy({
      top: e.deltaY,
    });
  }

  function handlerClick(e: MouseEvent) {
    if (!target.current) return;
    const { top, height } = target.current.getBoundingClientRect();

    target.current.scrollTo({
      top:
        ((e.clientY - top) / height) * (target.current.scrollHeight - height),
      behavior: "smooth",
    });
  }

  return (
    <div
      className={`relative ${className} flex overflow-hidden group`}
      onMouseMove={scrollBar.onMouseMove}
      {...divProps}
    >
      <div
        ref={target}
        className="flex-1 w-full overflow-hidden"
        style={{
          height,
          maxHeight,
        }}
        onScroll={handlerScroll}
        onWheel={handlerWheel}
      >
        {children}
      </div>
      <div
        className={`${
          scrollAbsolute ? "absolute opacity-0" : "relative opacity-100"
        } top-0 right-0 w-fit transition-opacity duration-300 group/scrollBar group-hover:opacity-100`}
        style={{
          height: target.current?.clientHeight,
        }}
        onWheel={handlerWheel}
      >
        <div className="absolute w-full h-full" onClick={handlerClick} />
        <div
          className="w-4 h-full px-0.5 py-1 border-l border-transparent overflow-hidden group-hover/scrollBar:w-5 group-hover/scrollBar:border-gray-500 group-hover/scrollBar:bg-white transition-all"
          hidden={ratio >= 1}
        >
          <div
            className="w-full rounded bg-slate-600"
            style={{
              height: `${ratio * 100}%`,
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
