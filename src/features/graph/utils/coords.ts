import { Coords } from "@src/common/types";
import { MouseEvent } from "react";

export function calcCoords(e: MouseEvent) {
	const { x, y } = e.currentTarget.getBoundingClientRect();
	return {
		x: x * -1 + e.clientX,
		y: y * -1 + e.clientY,
	};
}

const MIN_LENGTH = 5;

export function isTooShort(from: Coords, to: Coords) {
	return [from.x - to.x, from.y - to.y].every(
		(diff) => Math.abs(diff) < MIN_LENGTH
	);
}
