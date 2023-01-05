import { ElementsKeys } from "@src/data/umlElements";

export interface BarsStatus {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

export type Bars = keyof BarsStatus;

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

export interface Editor {
  barsStatus: BarsStatus;
  clickEvent: ClickEvents;
}
