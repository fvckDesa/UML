interface JavaDataTypes {
  PRIMITIVES: string[];
  WRAPPER: string[];
  NOT_PRIMITIVES: string[];
}

export const JAVA_TYPES: Readonly<JavaDataTypes> = Object.freeze({
  PRIMITIVES: [
    "byte",
    "short",
    "int",
    "long",
    "float",
    "double",
    "boolean",
    "char",
  ],
  WRAPPER: [
    "Byte",
    "Short",
    "Integer",
    "Long",
    "Float",
    "Double",
    "Boolean",
    "Character",
  ],
  NOT_PRIMITIVES: ["String"],
});
