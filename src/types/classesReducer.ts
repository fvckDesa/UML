import { RefObject } from "react";
import type { JavaClass, Attribute, Method, Constructor } from "./class";
import type { Coords, ActionGenerator } from "./general";

export interface UMLClass {
  javaClass: JavaClass;
  coords: Coords;
  ref: HTMLDivElement | null;
}
// action type class/*
type ClassAddAction = ActionGenerator<
  "class/add",
  { id: string; javaClass: JavaClass; coords: Coords }
>;

type ClassNameAction = ActionGenerator<
  "class/name",
  { id: string; name: string }
>;

type ClassFinalAction = ActionGenerator<
  "class/final",
  { id: string; isFinal: boolean }
>;

type ClassMainAction = ActionGenerator<
  "class/main",
  { id: string; haveMain: boolean }
>;

type ClassRemoveAction = ActionGenerator<"class/remove", { id: string }>;

type ClassActions =
  | ClassAddAction
  | ClassNameAction
  | ClassFinalAction
  | ClassRemoveAction
  | ClassMainAction;
// action type attribute/*
type AttributeAddAction = ActionGenerator<
  "attribute/add",
  { id: string; attribute: Attribute }
>;

type AttributeUpdateAction = ActionGenerator<
  "attribute/update",
  { id: string; attribute: Partial<Attribute>; index: number }
>;

type AttributeRemoveAction = ActionGenerator<
  "attribute/remove",
  { id: string; index: number }
>;

type AttributeActions =
  | AttributeAddAction
  | AttributeUpdateAction
  | AttributeRemoveAction;
// action type constructor constructor/*
type ConstructorAddAction = ActionGenerator<
  "constructor/add",
  { id: string; constructor: Constructor }
>;

type ConstructorUpdateAction = ActionGenerator<
  "constructor/update",
  { id: string; constructor: Partial<Constructor>; index: number }
>;

type ConstructorRemoveAction = ActionGenerator<
  "constructor/remove",
  { id: string; index: number }
>;

type ConstructorActions =
  | ConstructorAddAction
  | ConstructorUpdateAction
  | ConstructorRemoveAction;
// action type method method/*
type MethodAddAction = ActionGenerator<
  "method/add",
  { id: string; method: Method }
>;

type MethodUpdateAction = ActionGenerator<
  "method/update",
  { id: string; method: Partial<Method>; index: number }
>;

type MethodRemoveAction = ActionGenerator<
  "method/remove",
  { id: string; index: number }
>;

type MethodActions = MethodAddAction | MethodUpdateAction | MethodRemoveAction;
// action type coords/*
type CoordsUpdateAction = ActionGenerator<
  "coords/update",
  { id: string; coords: Coords }
>;

type CoordsActions = CoordsUpdateAction;

type RefAction = ActionGenerator<
  "ref/update",
  { id: string; ref: HTMLDivElement | null }
>;

export type ClassesAction =
  | ClassActions
  | AttributeActions
  | MethodActions
  | CoordsActions
  | ConstructorActions
  | RefAction;

export type ClassesState = Record<string, UMLClass>;
