// types
import type { ClickEvents } from "./types/infoReducer";
// components
import ActionBar from "./components/ActionBar";
import TopBar from "./components/TopBar";
import ViewArea from "./components/ViewArea";
import Sidebar from "./components/Sidebar";
// hooks
import { useKeydown } from "./hooks/useKeydown";
import { useRedux } from "./hooks/useRedux";
// redux
import {
  deleteElement,
  setActiveElement,
  setClickEvent,
} from "./features/umlSlice";

function App() {
  const { data, dispatch } = useRedux((state) => ({
    clickEvent: state.uml.clickEvent,
    activeElement: state.uml.activeElement,
  }));

  function KeydownEventGenerator(event: ClickEvents) {
    return function () {
      dispatch(
        setClickEvent(data.clickEvent?.type === event?.type ? null : event)
      );
    };
  }

  useKeydown({
    target: window,
    events: {
      Escape: () => {
        if (data.clickEvent === null) {
          return dispatch(setActiveElement(null));
        }
        dispatch(setClickEvent(null));
      },
      a: KeydownEventGenerator({ type: "arrow" }),
      d: KeydownEventGenerator({ type: "delete" }),
      m: KeydownEventGenerator({ type: "move" }),
      Backspace: () => {
        if (data.activeElement) dispatch(deleteElement(data.activeElement));
      },
    },
  });

  return (
    <div className="w-screen h-screen font-sans overflow-hidden select-none">
      <TopBar />
      <div className="relative w-full h-[calc(100%-48px)]">
        <Sidebar />
        <ViewArea />
        <ActionBar />
      </div>
    </div>
  );
}

export default App;
