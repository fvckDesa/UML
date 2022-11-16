export interface Variable {
  name: string;
  type: string;
  isArray: boolean;
}

export type Visibility = "public" | "private" | "protected" | "package";

interface JavaClassElement extends Variable {
  visibility: Visibility;
  isStatic: boolean;
}

interface Method extends JavaClassElement {
  parameters: Variable[];
}

export interface JavaClass {
  name: string;
  attributes: JavaClassElement[];
  methods: Method[];
}
