export type Relationships =
  | "inheritance"
  | "association"
  | "aggregation"
  | "composition";

export interface Arrow {
  name: string;
  relationship: Relationships;
}
