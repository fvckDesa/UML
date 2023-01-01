// types
import type { TabsName } from "@src/data/tabs";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PullBar from "./PullBar";
// hooks
import { useState } from "react";
import { useAppSelector } from "@src/hooks/useRedux";
// data
import { TABS } from "@src/data/tabs";
// utils
import { isViewMaximize } from "@src/utils/editor";

function LeftBar() {
  const [tab, setTab] = useState<TabsName | null>(null);
  const barsStatus = useAppSelector((state) => state.editor.barsStatus);
  return (
    <div className="relative flex border-r border-gray-700">
      <div
        className={`relative flex flex-col gap-3 w-left-bar-tabs p-1 ${
          barsStatus.left ? "ml-0" : "-ml-left-bar-tabs"
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
          barsStatus.left && tab ? "ml-0" : "-ml-left-bar-panel"
        } transition-all bg-white`}
      >
        {tab && TABS[tab].component}
      </div>
      {isViewMaximize(barsStatus) && <PullBar bar="left" />}
    </div>
  );
}

export default LeftBar;
