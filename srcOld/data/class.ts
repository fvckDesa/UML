import type { Method } from "@src/types/class";

export const MAIN_METHOD: Readonly<Method> = {
  visibility: "public",
  isStatic: true,
  isFinal: false,
  type: "void",
  isArray: false,
  name: "main",
  parameters: [{ type: "String", isArray: true, name: "args" }],
};
