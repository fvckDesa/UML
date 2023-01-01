export interface BarsStatus {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

export type Bars = keyof BarsStatus;

export interface Editor {
  barsStatus: BarsStatus;
}
