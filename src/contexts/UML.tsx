import { createContext, useContext, useState } from "react";
// types
import type { UMLContext, AddClassFn } from "@src/types/UML";
import type { JavaClass } from "@src/types/class";
import type { ReactNode } from "react";
// uuid
import { v4 as uuid } from "uuid";

interface IProps {
  children: ReactNode;
}

const Context = createContext<UMLContext | null>(null);

export default function UMLProvider({ children }: IProps) {
  const [classes, setClasses] = useState<Record<string, JavaClass>>({});
  const addClass: AddClassFn = (name, attributes = [], methods = []) => {
    setClasses((prev) => ({
      ...prev,
      [uuid()]: { name, attributes, methods },
    }));
  };

  function removeClass(id: string): void {
    setClasses((prev) => {
      const { [id]: removedClass, ...otherClasses } = prev;
      if (removedClass == undefined)
        console.error(`Java Class with id ${id} not exists`);

      return otherClasses;
    });
  }

  function updateClass(id: string, update: Partial<JavaClass>): void {
    setClasses((prev) =>
      prev[id] ? { ...prev, [id]: { ...prev[id], ...update } } : prev
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
