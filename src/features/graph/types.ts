import { ActionWithId, Coords, Dimensions } from "@src/common/types";
import { EntityState, EntityId } from "@reduxjs/toolkit";

export type ElementLayout = Coords & Dimensions;

export interface GraphElement<D = unknown> {
  id: EntityId;
  type: string;
  data: D;
  layout: ElementLayout;
}

export type ArrowPoint = EntityId | Coords;

export interface GraphArrow {
  id: EntityId;
  from: ArrowPoint;
  to: ArrowPoint;
}

export interface Graph extends Dimensions {
  elements: EntityState<GraphElement>;
  arrows: EntityState<GraphArrow>;
}

export type DataAction = ActionWithId<{ data: unknown }, EntityId>;

export type LayoutAction = ActionWithId<
  { layout: Partial<ElementLayout> },
  EntityId
>;

export type ChangePointAction = ActionWithId<
  { point: "from" | "to"; coords: ArrowPoint },
  EntityId
>;
