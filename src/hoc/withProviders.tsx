import { ComponentType, ReactNode } from "react";

export function withProviders(
  Component: ComponentType,
  providers: ComponentType<{ children: ReactNode }>[]
) {
  return () =>
    providers.reduce(
      (children, Provider) => <Provider>{children}</Provider>,
      <Component />
    );
}
