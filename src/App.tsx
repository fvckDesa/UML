// types
import type { ClickEvents } from "./types/editor";
// components
import ActionBar from "./components/ActionBar";
import TopBar from "./components/TopBar";
import ViewArea from "./components/ViewArea";
import RightBar from "./components/RightBar";
import BottomBar from "./components/BottomBar";
import LeftBar from "./components/LeftBar";
// hooks
import { useKeydown } from "./hooks/useKeydown";
import { useRedux } from "./hooks/useRedux";
// redux
import { deleteElement, setActiveElement } from "./features/umlSlice";
import { setClickEvent } from "./features/editorSlice";

function App() {
  const { data, dispatch } = useRedux((state) => ({
    clickEvent: state.editor.clickEvent,
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
    <div
      id="editor"
      className="flex flex-col w-screen h-screen overflow-hidden font-sans select-none"
    >
      <TopBar />
      <div className="flex-1 flex h-0 overflow-hidden">
        <LeftBar />
        <div className="relative flex-1 flex transition-all overflow-hidden">
          <ViewArea />
          <ActionBar />
        </div>
        <RightBar />
      </div>
      <BottomBar />
    </div>
  );
}

export default App;
