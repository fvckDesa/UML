import type { JavaClass, Attribute, Method } from "./class";
import type { Coords, ActionGenerator } from "./general";

export interface UMLClass {
  javaClass: JavaClass;
  coords: Coords;
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

type ClassRemoveAction = ActionGenerator<"class/remove", { id: string }>;

type ClassActions = ClassAddAction | ClassNameAction | ClassRemoveAction;
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

export type ClassesAction =
  | ClassActions
  | AttributeActions
  | MethodActions
  | CoordsActions;

export type ClassesState = Record<string, UMLClass>;
