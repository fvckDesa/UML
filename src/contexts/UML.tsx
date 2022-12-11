// types
import type { ReactNode, Dispatch } from "react";
import type { ClassesState, ClassesAction } from "@src/types/classesReducer";
import type { InfoState, InfoAction } from "@src/types/infoReducer";
import type { ArrowState, ArrowActions } from "@src/types/arrowReducer";
// hooks
import { createContext, useContext, useReducer } from "react";
// reducers
import { classesReducer } from "@src/utils/classesReducer";
import { infoReducer } from "@src/utils/infoReducer";
import { arrowReducer } from "@src/utils/arrowReducer";

export interface UMLContext {
  umlClasses: ClassesState;
  dispatchClasses: Dispatch<ClassesAction>;
  umlInfo: InfoState;
  dispatchInfo: Dispatch<InfoAction>;
  umlArrows: ArrowState;
  dispatchArrow: Dispatch<ArrowActions>;
}

const Context = createContext<UMLContext | null>(null);

interface IProps {
  classes?: ClassesState;
  info?: InfoState;
  arrows?: ArrowState;
  children: ReactNode;
}

const initInfoState: InfoState = {
  activeClass: "",
  errors: {},
  clickEvent: null,
};

const initArrowsState: ArrowState = {
  arrows: {},
  newArrow: null,
};

export default function UMLProvider({
  classes = {},
  info = initInfoState,
  arrows = initArrowsState,
  children,
}: IProps) {
  const [umlClasses, dispatchClasses] = useReducer(classesReducer, classes);
  const [umlInfo, dispatchInfo] = useReducer(infoReducer, info);
  const [umlArrows, dispatchArrow] = useReducer(arrowReducer, arrows);

  return (
    <Context.Provider
      value={{
        umlClasses,
        dispatchClasses,
        umlInfo,
        dispatchInfo,
        umlArrows,
        dispatchArrow,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useUMLContext = () => useContext(Context) as UMLContext;
