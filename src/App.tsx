import { useState } from "react";
import ClassPanel from "./components/ClassPanel";
import TopBar from "./components/TopBar";
import ViewArea from "./components/ViewArea";

function App() {
  const [centerCoords, setCenterCoords] = useState({
    x: 0,
    y: 0,
  });

  return (
    <div className="w-screen h-screen font-sans overflow-hidden select-none">
      <TopBar centerCoords={centerCoords} />
      <div className="relative w-full h-[calc(100%-48px)]">
        <ClassPanel />
        <ViewArea onCenterChange={setCenterCoords} />
      </div>
    </div>
  );
}

export default App;
