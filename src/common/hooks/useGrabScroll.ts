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

interface Options<TargetElement extends Element> {
  reverse?: boolean;
  transformDistance?: (d: number, target: TargetElement) => number;
}

export function useGrabScroll<TargetElement extends Element>({
  reverse = false,
  transformDistance = (d) => d,
}: Options<TargetElement> = {}) {
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

    const dx = transformDistance(e.clientX - grabInfo.x, target.current);
    const dy = transformDistance(e.clientY - grabInfo.y, target.current);

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
