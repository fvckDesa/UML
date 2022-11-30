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
export interface Constructor {
  visibility: Visibility;
  name: string;
  parameters: Variable[];
}

export type Method = Attribute & Constructor;

export interface JavaClass {
  name: string;
  isFinal: boolean;
  attributes: Attribute[];
  constructors: Constructor[];
  methods: Method[];
}
