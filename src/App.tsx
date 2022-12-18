import { useEffect, useState } from "react";
import ActionBar from "./components/ActionBar";
import ClassPanel from "./components/ClassPanel";
import TopBar from "./components/TopBar";
import ViewArea from "./components/ViewArea";
import { useUMLContext } from "./contexts/UML";
import { useKeydown } from "./hooks/useKeydown";
import { ClickEvents } from "./types/infoReducer";

function App() {
  const { umlInfo, dispatchClasses, dispatchInfo, dispatchArrow } =
    useUMLContext();

  function KeydownEventGenerator(event: ClickEvents) {
    return function () {
      dispatchInfo({
        type: "clickEvent/change",
        payload: {
          clickEvent: umlInfo.clickEvent?.type === event?.type ? null : event,
        },
      });
    };
  }

  useKeydown({
    target: window,
    events: {
      beforeEach: () => {
        dispatchArrow({
          type: "arrow/cancel",
          payload: {},
        });
      },
      Escape: KeydownEventGenerator(null),
      a: KeydownEventGenerator({ type: "arrow" }),
      d: KeydownEventGenerator({ type: "delete" }),
      m: KeydownEventGenerator({ type: "move" }),
      Backspace: () => {
        dispatchClasses({
          type: "class/remove",
          payload: { id: umlInfo.activeClass },
        });
      },
    },
  });

  return (
    <div className="w-screen h-screen font-sans overflow-hidden select-none">
      <TopBar />
      <div className="relative w-full h-[calc(100%-48px)]">
        <ClassPanel />
        <ViewArea />
        <ActionBar />
      </div>
    </div>
  );
}

export default App;
