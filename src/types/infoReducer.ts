import type { ActionGenerator } from "./general";

type ActiveClassChange = ActionGenerator<
  "activeClass/change",
  {
    id: string;
  }
>;

export type InfoAction = ActiveClassChange;

export interface InfoState {
  activeClass: string;
}
