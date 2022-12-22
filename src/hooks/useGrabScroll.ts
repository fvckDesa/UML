// types
import type { MouseEvent } from "react";
// hooks
import { useEffect, useState, useRef } from "react";

interface GrabInfo {
  top: number;
  left: number;
  x: number;
  y: number;
}

interface Options {
  reverse?: boolean;
}

export function useGrabScroll<TargetElement extends Element>({
  reverse = false,
}: Options = {}) {
  const [grabInfo, setGrabInfo] = useState<GrabInfo | null>(null);
  const target = useRef<TargetElement>(null);

  useEffect(() => {
    function removePos() {
      setGrabInfo(null);
    }
    window.addEventListener("mouseup", removePos);

    return () => window.removeEventListener("mouseup", removePos);
  }, []);

  function onMouseDown(e: MouseEvent<TargetElement>) {
    if (!target.current) return;

    setGrabInfo({
      left: target.current.scrollLeft,
      top: target.current.scrollTop,
      x: e.clientX,
      y: e.clientY,
    });
  }

  function onMouseMove(e: MouseEvent<TargetElement>) {
    if (!target.current || !grabInfo) return;

    const dx = e.clientX - grabInfo.x;
    const dy = e.clientY - grabInfo.y;

    // Scroll the element
    target.current.scrollTop = reverse ? grabInfo.top - dy : grabInfo.top + dy;
    target.current.scrollLeft = reverse
      ? grabInfo.left - dx
      : grabInfo.left + dx;
  }

  return {
    isGrabbing: grabInfo !== null,
    target,
    onMouseDown,
    onMouseMove,
  };
}
