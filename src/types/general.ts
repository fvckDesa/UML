export interface Coords {
  x: number;
  y: number;
}

export interface ActionGenerator<Type extends string, Payload extends {}> {
  type: Type;
  payload: Payload;
}
