// types
import type { ReactNode, Dispatch } from "react";
import type { ClassesState, ClassesAction } from "@src/types/classesReducer";
import type { InfoState, InfoAction } from "@src/types/infoReducer";
// hooks
import { createContext, useContext, useReducer } from "react";
// reducers
import { classesReducer } from "@src/utils/classesReducer";
import { infoReducer } from "@src/utils/infoReducer";

export interface UMLContext {
  umlClasses: ClassesState;
  dispatchClasses: Dispatch<ClassesAction>;
  umlInfo: InfoState;
  dispatchInfo: Dispatch<InfoAction>;
}

const Context = createContext<UMLContext | null>(null);

interface IProps {
  classes?: ClassesState;
  info?: InfoState;
  children: ReactNode;
}

const initInfoState = { activeClass: "" };

export default function UMLProvider({
  children,
  classes = {},
  info = initInfoState,
}: IProps) {
  const [umlClasses, dispatchClasses] = useReducer(classesReducer, classes);
  const [umlInfo, dispatchInfo] = useReducer(infoReducer, info);

  return (
    <Context.Provider
      value={{
        umlClasses,
        dispatchClasses,
        umlInfo,
        dispatchInfo,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useUMLContext = () => useContext(Context) as UMLContext;
