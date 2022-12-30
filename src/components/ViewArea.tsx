// types
import type { MouseEvent } from "react";
// components
import WorkSpace from "./WorkSpace";
// hooks
import { useLayoutEffect } from "react";
import { useGrabScroll } from "@src/hooks/useGrabScroll";
import { useAppSelector } from "@src/hooks/useRedux";

function ViewArea() {
  const clickEvent = useAppSelector((state) => state.uml.clickEvent);
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

  function handlerRoleDown(e: MouseEvent<HTMLDivElement>) {
    if ((clickEvent?.type !== "move" && e.button != 1) || !target.current)
      return;
    e.preventDefault();

    onMouseDown(e);
  }

  return (
    <div
      ref={target}
      data-grabbing={isGrabbing}
      data-click-event={clickEvent?.type}
      className={`relative h-full ${
        false ? "mr-80" : "mr-0"
      } transition-all overflow-hidden`}
      onMouseDown={handlerRoleDown}
      onMouseMove={onMouseMove}
      onContextMenu={(e) => e.preventDefault()}
    >
      <WorkSpace width={3000} height={2000} />
    </div>
  );
}

export default ViewArea;
