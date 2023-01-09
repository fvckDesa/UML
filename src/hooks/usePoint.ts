// types
import type { Coords } from "@src/types/general";
import type { ElementLayout } from "@src/types/uml";
// hooks
import { useAppSelector } from "./useRedux";

export function usePoint(point: Coords | string | null) {
  const elements = useAppSelector((state) => state.uml.elements);

  if (typeof point === "string") {
    const { x, y, width, height } = elements[point].layout as ElementLayout;
    return point in elements ? { x: x + width / 2, y: y + height / 2 } : null;
  }

  return point;
}
