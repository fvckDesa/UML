import type { ActionGenerator } from "./general";

type ActiveClassChange = ActionGenerator<
  "activeClass/change",
  {
    id: string;
  }
>;

export type ClickEvents = "arrow" | null;

type CLickEventAction = ActionGenerator<
  "clickEvent/change",
  { clickEvent: ClickEvents }
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

export type InfoAction = ActiveClassChange | ErrorActions | CLickEventAction;

export interface InfoState {
  activeClass: string;
  errors: Record<string, Error>;
  clickEvent: ClickEvents;
}
