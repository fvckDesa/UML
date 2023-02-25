// types
import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
// components
import Layers from "@src/components/Layers";
// icons
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

interface Tab {
  icon: FontAwesomeIconProps["icon"];
  component: ReactNode;
}

export const TABS = Object.freeze({
  layers: {
    icon: faLayerGroup,
    component: <Layers />,
  },
}) satisfies Record<string, Tab>;

export type TabsName = keyof typeof TABS;
