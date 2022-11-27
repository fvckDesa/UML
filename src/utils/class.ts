import type {
  Visibility,
  Variable,
  Attribute,
  Method,
  JavaClass,
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

function stringifyType(type: string, isArray: boolean): string {
  return `${type}${isArray ? "[]" : ""}`;
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
}: Attribute) {
  // visibility|name: type
  // -attribute: int[]
  return `${convertVisibility(visibility)}${name}: ${stringifyType(
    type,
    isArray
  )}`;
}

export function stringifyMethod({
  visibility,
  name,
  parameters,
  type,
  isArray,
}: Method) {
  // visibility|name(parameters): type
  // +myMethod(par1: String, par2: int[]): String[]
  return `${convertVisibility(visibility)}${name}(${parameters
    .map(stringifyParameter)
    .join(", ")}): ${stringifyType(type, isArray)}`;
}

export function generateClassCode({
  name,
  attributes,
  methods,
}: JavaClass): string {
  let code = `public class ${name} {\n\t`;

  code += attributes
    .map(
      ({ visibility, isStatic, type, isArray, name }) =>
        `${visibility} ${isStatic ? "static " : ""}${stringifyType(
          type,
          isArray
        )} ${name};`
    )
    .join("\t\n");

  code += "\t\n\t";

  code += methods
    .map(
      ({ visibility, isStatic, type, isArray, name, parameters }) =>
        `${visibility} ${isStatic ? "static " : ""}${stringifyType(
          type,
          isArray
        )} ${name}(${parameters.map(stringifyParameter).join(", ")}) {}`
    )
    .join("\t\n");

  return code + "\n}";
}
