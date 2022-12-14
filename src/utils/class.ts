import type {
  Visibility,
  Variable,
  Attribute,
  Method,
  Constructor,
} from "@src/types/class";

function convertVisibility(visibility: Visibility): string | never {
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

export function stringifyType(type: string, isArray: boolean): string {
  return `${type}${isArray ? "[]" : ""}`;
}

export function stringifyFinal(name: string, isFinal: boolean) {
  return isFinal
    ? (name[0] + name.slice(1).replace(/([A-Z])/g, "_$1")).toUpperCase()
    : name;
}

export function stringifyParameter({ name, type, isArray }: Variable): string {
  // name: type
  // par1: String
  return `${name}: ${stringifyType(type, isArray)}`;
}

export function stringifyAttribute({
  visibility,
  name,
  type,
  isArray,
  isFinal,
}: Attribute) {
  // visibility|name: type
  // -attribute: int[]
  return `${convertVisibility(visibility)}${stringifyFinal(
    name,
    isFinal
  )}: ${stringifyType(type, isArray)}`;
}

export function stringifyConstructor({
  visibility,
  name,
  parameters,
}: Constructor) {
  return `${convertVisibility(visibility)}${name || "Class"}(${parameters
    .map(stringifyParameter)
    .join(", ")})`;
}

export function stringifyMethod({
  visibility,
  name,
  parameters,
  type,
  isArray,
  isFinal,
}: Method) {
  // visibility|name(parameters): type
  // +myMethod(par1: String, par2: int[]): String[]
  return `${convertVisibility(visibility)}${stringifyFinal(
    name,
    isFinal
  )}(${parameters.map(stringifyParameter).join(", ")}): ${stringifyType(
    type,
    isArray
  )}`;
}
