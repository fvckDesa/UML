import { useEffect, useState } from "react";
import ActionBar from "./components/ActionBar";
import ClassPanel from "./components/ClassPanel";
import TopBar from "./components/TopBar";
import ViewArea from "./components/ViewArea";
import { useUMLContext } from "./contexts/UML";

function App() {
  const { dispatchInfo, dispatchArrow } = useUMLContext();

  useEffect(() => {
    function escPress(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      e.preventDefault();

      dispatchInfo({
        type: "clickEvent/change",
        payload: { clickEvent: null },
      });
      dispatchArrow({
        type: "arrow/cancel",
        payload: {},
      });
    }

    window.addEventListener("keydown", escPress);

    return () => {
      window.removeEventListener("keydown", escPress);
    };
  }, []);

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
