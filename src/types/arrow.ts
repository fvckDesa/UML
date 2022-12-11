export type Relationships =
  | "inheritance"
  | "association"
  | "aggregation"
  | "composition";

export interface Arrow {
  relationship: Relationships;
  nodes: [string, string];
}
