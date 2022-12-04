import { useState } from "react";
import ActionBar from "./components/ActionBar";
import ClassPanel from "./components/ClassPanel";
import TopBar from "./components/TopBar";
import ViewArea from "./components/ViewArea";

function App() {
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
