// types
import type { MouseEvent } from "react";
// components
import WorkSpace from "./WorkSpace";
// hooks
import { useLayoutEffect } from "react";
import { useUMLContext } from "@src/contexts/UML";
import { Coords } from "@src/types/general";
import { useGrabScroll } from "@src/hooks/useGrabScroll";

function ViewArea() {
  const { umlInfo } = useUMLContext();
  const { isGrabbing, target, onMouseDown, onMouseMove } =
    useGrabScroll<HTMLDivElement>({ reverse: true });

  // scroll to center of workspace
  useLayoutEffect(() => {
    if (!target.current) return;
    const el = target.current;

    el.scrollTo({
      top: el.scrollHeight / 2 - el.clientHeight / 2,
      left: el.scrollWidth / 2 - el.clientWidth / 2,
    });
  }, []);
  // active class in panel and center class
  function handlerActiveClass({ x, y }: Coords) {
    const el = target.current;
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

  function handlerRoleDown(e: MouseEvent<HTMLDivElement>) {
    if (
      (umlInfo.clickEvent?.type !== "move" && e.button != 1) ||
      !target.current
    )
      return;
    e.preventDefault();

    onMouseDown(e);
  }

  return (
    <div
      ref={target}
      data-grabbing={isGrabbing}
      data-click-event={umlInfo.clickEvent?.type}
      className={`relative h-full ${
        umlInfo.isMenuOpen ? "mr-80" : "mr-0"
      } transition-all overflow-hidden`}
      onMouseDown={handlerRoleDown}
      onMouseMove={onMouseMove}
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
