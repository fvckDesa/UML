import { Coords } from "@src/types/general";
import { SVGAttributes } from "react";

interface IProps
  extends Omit<SVGAttributes<SVGPathElement>, "d" | "from" | "to"> {
  from: Coords;
  to: Coords;
}

function Line({ from, to }: IProps) {
  // center of distance
  const center = {
    x: Math.abs(from.x + to.x) / 2,
    y: Math.abs(from.y + to.y) / 2,
  };
  // if the line start horizontally or vertically
  const orientation =
    Math.abs(from.x - to.x) > Math.abs(from.y - to.y) ? "x" : "y";
  // the lowest point
  const point1 =
    orientation === "x"
      ? from.x < to.x
        ? from
        : to
      : from.y > to.y
      ? from
      : to;
  // the hightest point
  const point2 =
    orientation === "x"
      ? to.x > from.x
        ? to
        : from
      : to.y < from.y
      ? to
      : from;
  // indicate if the other coords of orientation is lower
  const isInverse =
    orientation === "x" ? point1.y < point2.y : point1.x > point2.x;
  // length of bezier curve
  const curve = Math.floor(
    Math.min(
      Math.abs(
        orientation === "x" ? point1.y - point2.y : point1.x - point2.x
      ) / 2,
      25
    )
  );

  return (
    <path
      d={
        orientation === "x"
          ? `
              M ${Math.floor(point1.x)},${Math.floor(point1.y)}
              H ${center.x - curve}
              q ${curve},0 ${curve},${isInverse ? curve : -curve}
              V ${point2.y + (isInverse ? -curve : curve)}
              q 0,${isInverse ? curve : -curve} ${curve},${
              isInverse ? curve : -curve
            }
              H ${point2.x}
              `
          : `
              M ${Math.floor(point1.x)},${Math.floor(point1.y)}
              V ${center.y + curve}
              q 0,${-curve} ${isInverse ? -curve : curve},${-curve}
              H ${point2.x + (isInverse ? curve : -curve)}
              q ${isInverse ? -curve : curve},0 ${
              isInverse ? -curve : curve
            },${-curve}
              V ${point2.y}
              `
      }
      fill="none"
      stroke="#000"
      strokeWidth={3}
      strokeLinecap="round"
    />
  );
}

export default Line;
