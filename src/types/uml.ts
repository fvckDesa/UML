// redux
import { PayloadAction } from "@reduxjs/toolkit";
// elements
import { Arrow } from "./arrow";
import { JavaClass } from "./class";
// general
import { Coords } from "./general";
// data
import { ElementsKeys } from "@src/data/umlElements";

interface Element<T extends string, D, L> {
  type: T;
  data: D;
  layout: L;
}

export type ClassElement = Element<"class", JavaClass, Coords>;
export type ArrowElement = Element<
  "arrow",
  Arrow,
  { from?: string | Coords; to?: string | Coords }
>;

export type UMLElements = ClassElement | ArrowElement;

type ClickEvent<Type extends string, Info = undefined> = Info extends undefined
  ? {
      type: Type;
    }
  : { type: Type; info: Info };

export type ClickEvents =
  | ClickEvent<"arrow">
  | ClickEvent<"element", ElementsKeys>
  | ClickEvent<"delete">
  | ClickEvent<"move">
  | null;

export type PayloadWithId<T extends {} = never> = PayloadAction<
  { id: string } & (T extends never ? {} : Omit<T, "id">)
>;
