export interface Variable {
  name: string;
  type: string;
  isArray: boolean;
}

export type Visibility = "public" | "private" | "protected" | "package";

export interface Attribute extends Variable {
  visibility: Visibility;
  isStatic: boolean;
  isFinal: boolean;
}

export interface Method extends Attribute {
  parameters: Variable[];
}

export interface JavaClass {
  name: string;
  isFinal: boolean;
  attributes: Attribute[];
  methods: Method[];
}
