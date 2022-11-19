import type { Visibility, Variable } from "@src/types/class";

export function convertVisibility(visibility: Visibility): string | never {
  switch (visibility) {
    case "public":
      return "+";
    case "private":
      return "-";
    case "protected":
      return "#";
    case "package":
      return "~";
    default:
      throw new Error(`${visibility} is not valid`);
  }
}

export function createParameterString({
  name,
  type,
  isArray,
}: Variable): string {
  return `${name}: ${type}${isArray ? "[]" : ""}`;
}
