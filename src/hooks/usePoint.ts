import { Coords } from "@src/types/general";
import { useAppSelector } from "./useRedux";

export function usePoint(point: Coords | string | null) {
  const elements = useAppSelector((state) => state.uml.elements);

  if (typeof point === "string") {
    return point in elements ? (elements[point].layout as Coords) : null;
  }

  return point;
}
