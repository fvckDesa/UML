// types
import type { Dimensions } from "@src/common/types";
// assets
import { ClassSvg } from "@src/assets";
import { ClassIcon } from "@src/assets";

export type ElementsKeys = "javaClass";

export interface Element {
  dimensions: Dimensions;
  dragImg: string;
  icon: string;
}

export const UML_ELEMENTS = Object.freeze({
	javaClass: {
		dimensions: {
			width: 220,
			height: 150,
		},
		dragImg: ClassSvg,
		icon: ClassIcon,
	},
}) satisfies Record<ElementsKeys, Element>;

export function isUMLElement(element: string): element is ElementsKeys {
	return element in UML_ELEMENTS;
}
