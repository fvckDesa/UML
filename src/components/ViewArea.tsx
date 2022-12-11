// types
import type { MouseEvent } from "react";
// components
import WorkSpace from "./WorkSpace";
// hooks
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useUMLContext } from "@src/contexts/UML";
import { Coords } from "@src/types/general";

interface AreaPos {
  top: number;
  left: number;
  x: number;
  y: number;
}

function ViewArea() {
  const { umlInfo } = useUMLContext();
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<AreaPos | null>(null);

  // scroll to center of workspace
  useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    el.scrollTo({
      top: el.scrollHeight / 2 - el.clientHeight / 2,
      left: el.scrollWidth / 2 - el.clientWidth / 2,
    });
  }, []);
  // disable scroll grabbing
  useEffect(() => {
    function removePos() {
      setPos(null);
    }
    window.addEventListener("mouseup", removePos);

    return () => window.removeEventListener("mouseup", removePos);
  }, []);
  // active class in panel and center class
  function handlerActiveClass({ x, y }: Coords) {
    const el = ref.current;
    if (!el) return;

    function scrollTo() {
      if (!el) return;
      const { width, height } = el?.getBoundingClientRect();
      el?.scrollTo({
        top: y - height / 2,
        left: x - width / 2,
        behavior: "smooth",
      });
    }

    function scrollToTarget() {
      scrollTo();
      el?.removeEventListener("transitionend", scrollToTarget);
    }

    if (el.classList.contains("mr-80")) {
      scrollTo();
    } else {
      el.addEventListener("transitionend", scrollToTarget);
    }
  }

  function handlerRoleDown(e: MouseEvent) {
    if ((umlInfo.clickEvent?.type !== "move" && e.button != 1) || !ref.current)
      return;
    e.preventDefault();

    setPos({
      left: ref.current.scrollLeft,
      top: ref.current.scrollTop,
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlerMouseMove(e: MouseEvent) {
    if (!ref.current || !pos) return;

    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    ref.current.scrollTop = pos.top - dy;
    ref.current.scrollLeft = pos.left - dx;
  }

  return (
    <div
      ref={ref}
      data-grabbing={!!pos}
      data-click-event={umlInfo.clickEvent?.type}
      className={`relative h-full ${
        umlInfo.activeClass ? "mr-80" : "mr-0"
      } transition-all overflow-hidden`}
      onMouseDown={handlerRoleDown}
      onMouseMove={handlerMouseMove}
      onContextMenu={(e) => e.preventDefault()}
    >
      <WorkSpace
        width={3000}
        height={2000}
        onActiveClass={handlerActiveClass}
      />
    </div>
  );
}

export default ViewArea;
