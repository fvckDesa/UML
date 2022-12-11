import type { Dimensions } from "@src/types/general";

export type ElementsKeys = "javaClass";

export const UML_ELEMENTS: Readonly<Record<ElementsKeys, Dimensions>> = {
  javaClass: {
    width: 220,
    height: 154,
  },
};

export function isUMLElement(element: string): element is ElementsKeys {
  return element in UML_ELEMENTS;
}
