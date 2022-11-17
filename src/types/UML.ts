import type { JavaClass, Attribute, Method } from "./class";

export type AddClassFn = (
  name: string,
  attributes?: Attribute[],
  methods?: Method[]
) => void;

export interface JavaClassUpdate {
  name?: string;
  attributes?: Attribute[];
  methods?: Method[];
}

export interface UMLContext {
  classes: JavaClass[];
  addClass: AddClassFn;
  removeClass: (id: string) => void;
  updateClass: (id: string, update: JavaClassUpdate) => void;
}
