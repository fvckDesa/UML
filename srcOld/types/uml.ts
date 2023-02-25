// redux
import { PayloadAction } from "@reduxjs/toolkit";
// elements
import { Arrow } from "./arrow";
import { JavaClass } from "./class";
// general
import { Coords } from "./general";

interface Element<T extends string, D, L> {
  type: T;
  data: D;
  layout: L;
}

export interface ElementLayout extends Coords {
  width: number;
  height: number;
}

export type ClassElement = Element<"class", JavaClass, ElementLayout>;
export type ArrowElement = Element<
  "arrow",
  Arrow,
  { from: string | Coords; to: string | Coords }
>;

export type UMLElements = ClassElement | ArrowElement;

export type PayloadWithId<T extends {} = never> = PayloadAction<
  { id: string } & (T extends never ? {} : Omit<T, "id">)
>;

export interface UML {
  elements: Record<string, UMLElements>;
  errors: Record<string, string>;
  activeElement: string | null;
}
