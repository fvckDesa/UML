import { createContext, useContext, useCallback, useState } from "react";
// types
import type { UMLContext, AddClassFn, JavaClassUpdate } from "../types/UML";
import type { JavaClass } from "../types/class";
import type { ReactNode } from "react";
// uuid
import { v4 as uuid } from "uuid";

interface IProps {
  children: ReactNode;
}

const Context = createContext<UMLContext | null>(null);

export default function UMLProvider({ children }: IProps) {
  const [classes, setClasses] = useState<JavaClass[]>([]);
  const addClass: AddClassFn = (name, attributes = [], methods = []) => {
    setClasses((prev) =>
      prev.concat({
        id: uuid(),
        name,
        attributes,
        methods,
      })
    );
  };

  function removeClass(id: string): void {
    setClasses((prev) => prev.filter((javaClass) => javaClass.id !== id));
  }

  function updateClass(id: string, update: JavaClassUpdate): void {
    setClasses((prev) =>
      prev.map((javaClass) => {
        if (javaClass.id === id) {
          return { ...javaClass, ...update };
        }
        return javaClass;
      })
    );
  }

  return (
    <Context.Provider
      value={{
        classes,
        addClass,
        removeClass,
        updateClass,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useUMLContext = () => useContext(Context);
