import {
  Attribute,
  JavaClass,
  Method,
  Variable,
  Constructor,
} from "@src/types/class";

import { stringifyType } from "./class";
import { MAIN_METHOD } from "@src/data/class";

function createAttribute({
  visibility,
  isStatic,
  isFinal,
  type,
  isArray,
  name,
}: Attribute): string {
  const attribute: string[] = [visibility];

  if (isStatic) attribute.push("static");
  if (isFinal) attribute.push("final");

  attribute.push(stringifyType(type, isArray));
  attribute.push(name);
  attribute.push(";");

  return attribute.join(" ");
}

function createConstructor({
  visibility,
  name,
  parameters,
}: Constructor): string {
  return [
    visibility,
    name,
    `(${parameters.map(createParameter).join(", ")})`,
    "{}",
  ].join(" ");
}

function createMethod({
  visibility,
  isStatic,
  isFinal,
  type,
  isArray,
  name,
  parameters,
}: Method): string {
  const method: string[] = [visibility];

  if (isStatic) method.push("static");
  if (isFinal) method.push("final");

  method.push(stringifyType(type, isArray));
  method.push(name);
  method.push(`(${parameters.map(createParameter).join(", ")})`);
  method.push("{}");

  return method.join(" ");
}

function createParameter({ type, isArray, name }: Variable): string {
  return `${stringifyType(type, isArray)} ${name}`;
}

function createFirstLine(isFinal: boolean, name: string): string {
  const firstLine = ["public"];
  if (isFinal) firstLine.push("final");
  firstLine.push("class");
  firstLine.push(name);
  firstLine.push("{");

  return firstLine.join(" ");
}

export function createClassCode({
  isFinal,
  name,
  attributes,
  haveMain,
  constructors,
  methods,
}: JavaClass): string {
  const classCode: string[] = [];

  classCode.push(createFirstLine(isFinal, name));

  classCode.push(...attributes.map(createAttribute).map(format));

  classCode.push("\t");

  if (haveMain) classCode.push(format(createMethod(MAIN_METHOD)));

  classCode.push("\t");

  classCode.push(...constructors.map(createConstructor).map(format));

  classCode.push("\t");

  classCode.push(...methods.map(createMethod).map(format));

  classCode.push("}");

  return classCode.join("\n");
}

function format(str: string): string {
  return `\t${str}`;
}
