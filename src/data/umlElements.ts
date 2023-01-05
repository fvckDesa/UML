// types
import type { Dimensions } from "@src/types/general";
// assets
import { ClassSvg } from "@src/assets";

export type ElementsKeys = "javaClass";

interface Element {
  dimensions: Dimensions;
  img: string;
}

export const UML_ELEMENTS: Readonly<Record<ElementsKeys, Element>> = {
  javaClass: {
    dimensions: {
      width: 220,
      height: 150,
    },
    img: ClassSvg,
  },
};

export function isUMLElement(element: string): element is ElementsKeys {
  return element in UML_ELEMENTS;
}
