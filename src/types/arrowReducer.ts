import { Arrow } from "./arrow";
import { ActionGenerator } from "./general";

type ArrowNewAction = ActionGenerator<"arrow/new", { node: string }>;

type ArrowCancelAction = ActionGenerator<"arrow/cancel", {}>;

type ArrowAddAction = ActionGenerator<
  "arrow/add",
  { id: string; arrow: Arrow }
>;

type ArrowUpdateAction = ActionGenerator<
  "arrow/update",
  { id: string; arrow: Partial<Arrow> }
>;

type ArrowRemoveAction = ActionGenerator<"arrow/remove", { id: string }>;

export type ArrowActions =
  | ArrowNewAction
  | ArrowCancelAction
  | ArrowAddAction
  | ArrowUpdateAction
  | ArrowRemoveAction;

export interface ArrowState {
  arrows: Record<string, Arrow>;
  newArrow: string | null;
}
