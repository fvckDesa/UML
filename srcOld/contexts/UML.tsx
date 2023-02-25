// types
import type { ReactNode } from "react";
// redux
import { Provider } from "react-redux";
import store from "@src/app/store";

interface IProps {
  children: ReactNode;
}

function UMLProvider({ children }: IProps) {
  return <Provider store={store}>{children}</Provider>;
}

export default UMLProvider;
