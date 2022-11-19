import type { JavaClass, Attribute, Method } from "./class";

export type AddClassFn = (
  name: string,
  attributes?: Attribute[],
  methods?: Method[]
) => void;

export interface UMLContext {
  classes: Record<string, JavaClass>;
  addClass: AddClassFn;
  removeClass: (id: string) => void;
  updateClass: (id: string, update: Partial<JavaClass>) => void;
}
