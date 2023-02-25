export interface Coords {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
