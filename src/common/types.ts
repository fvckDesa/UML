import { PayloadAction } from "@reduxjs/toolkit";

export interface Coords {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type ActionWithId<
  T extends {} = never,
  ID = string | number
> = PayloadAction<{ id: ID } & (T extends never ? {} : Omit<T, "id">)>;
