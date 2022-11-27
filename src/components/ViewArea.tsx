// types
import { useUMLContext } from "@src/contexts/UML";
import type { Coords } from "@src/types/general";
import type { MouseEvent } from "react";
// hooks
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import WorkSpace from "./WorkSpace";

interface IProps {
  onCenterChange: (newCenter: Coords) => void;
}

interface AreaPos {
  top: number;
  left: number;
  x: number;
  y: number;
}

function ViewArea({ onCenterChange }: IProps) {
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
  // scroll to current class passed as target parameter
  function scrollTo(el: HTMLDivElement, target: HTMLDivElement) {
    const { width: elWidth, height: elHeight } = el.getBoundingClientRect();
    const { width, height } = target.getBoundingClientRect();
    const { top, left } = getComputedStyle(target);

    el.scrollTo({
      left: parseFloat(left) - elWidth / 2 + width / 2,
      top: parseFloat(top) - elHeight / 2 + height / 2,
      behavior: "smooth",
    });
  }
  // change center coords
  function handlerScroll() {
    if (!ref.current) return;
    const el = ref.current;
    onCenterChange({
      x: el.scrollLeft + el.clientWidth / 2,
      y: el.scrollTop + el.clientHeight / 2,
    });
  }
  // active class in panel and center class
  function handlerActiveClass(id: string) {
    const el = ref.current;
    const target = document.querySelector<HTMLDivElement>(
      `[data-class-id="${id}"]`
    );

    if (!el || !target) return;

    function scrollToTarget() {
      if (!el || !target) return;
      scrollTo(el, target);
      el.removeEventListener("transitionend", scrollToTarget);
    }

    if (el.classList.contains("mr-80")) {
      scrollTo(el, target);
    } else {
      el.addEventListener("transitionend", scrollToTarget);
    }
  }

  function handlerRoleDown(e: MouseEvent) {
    e.preventDefault();
    if (e.button != 1 || !ref.current) return;

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
      className={`h-full ${
        umlInfo.activeClass ? "mr-80" : "mr-0"
      } transition-all overflow-hidden`}
      onScroll={handlerScroll}
      onMouseDown={handlerRoleDown}
      onMouseMove={handlerMouseMove}
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
