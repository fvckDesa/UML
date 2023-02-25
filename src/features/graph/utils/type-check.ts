import { EntityId } from "@reduxjs/toolkit";

export function isEntityId(x: unknown): x is EntityId {
  return typeof x === "string" || typeof x === "number";
}
