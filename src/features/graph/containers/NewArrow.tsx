import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "@src/common/hooks";
import { Coords } from "@src/common/types";
import { selectElementCoords } from "../graphSlice";
import { isEntityId } from "../utils/type-check";
import Line from "../components/Line";

interface INewArrow {
  from: Coords | EntityId | null;
  to: Coords | EntityId | null;
}

function NewArrow({ from, to }: INewArrow) {
  const fromCoords = useAppSelector((state) =>
    isEntityId(from) ? selectElementCoords(state, from) : from
  );
  const toCoords = useAppSelector((state) =>
    isEntityId(to) ? selectElementCoords(state, to) : to
  );

  if (!fromCoords || !toCoords) return null;

  return (
    <g>
      <Line from={fromCoords} to={toCoords} />
    </g>
  );
}

export default NewArrow;
