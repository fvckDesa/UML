// types
import type { TabsName } from "@src/data/tabs";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// hooks
import { useState } from "react";
// data
import { TABS } from "@src/data/tabs";
import BarWrapper from "../containers/BarWrapper";

interface ILeftBar {
  isOpen: boolean;
}

function LeftBar({ isOpen }: ILeftBar) {
  const [tab, setTab] = useState<TabsName | null>(null);

  return (
    <BarWrapper bar="left" className="flex h-full border-r border-gray-700">
      <div
        className={`relative flex flex-col gap-3 w-left-bar-tabs p-1 ${
          isOpen ? "ml-0" : "-ml-left-bar-tabs"
        } bg-white z-10 transition-all`}
      >
        {Object.entries(TABS).map(([name, { icon }]) => (
          <button
            key={name}
            type="button"
            className={`w-full ${
              tab === name ? "bg-blue-200" : "hover:bg-gray-300"
            } aspect-square rounded transition-colors duration-300`}
            onClick={() =>
              setTab((prev) => (prev === name ? null : (name as TabsName)))
            }
          >
            <FontAwesomeIcon icon={icon} />
          </button>
        ))}
      </div>
      <div
        className={`w-left-bar-panel h-full border-l border-gray-700 ${
          isOpen && tab ? "ml-0" : "-ml-left-bar-panel"
        } transition-all bg-white`}
      >
        {tab && TABS[tab].component}
      </div>
    </BarWrapper>
  );
}

export default LeftBar;
