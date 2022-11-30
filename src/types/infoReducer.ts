import type { ActionGenerator } from "./general";

type ActiveClassChange = ActionGenerator<
  "activeClass/change",
  {
    id: string;
  }
>;

interface Error {
  type: string;
  message: string;
}

type ErrorChange = ActionGenerator<
  "error/change",
  {
    id: string;
    error: Error;
  }
>;

type ErrorRemove = ActionGenerator<"error/remove", { id: string }>;

type ErrorActions = ErrorChange | ErrorRemove;

export type InfoAction = ActiveClassChange | ErrorActions;

export interface InfoState {
  activeClass: string;
  errors: Record<string, Error>;
}
