import { useFullscreen } from "@src/contexts/Fullscreen";
import { Graph } from "@src/features/graph/containers";
import TopBar from "../components/TopBar";
import { useRedux } from "@src/common/hooks";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import BottomBar from "../components/BottomBar";
import { Bars, ClickEvents } from "../types";
import { setClickEvent, toggleBar } from "../editorSlice";
import ElementSelector from "../components/ElementSelector";
import { ElementsKeys } from "@src/data/umlElements";
import { isElementActive, isViewMaximize } from "../utils";

function Editor() {
  const { data, dispatch } = useRedux((state) => state.editor);
  const { fullscreenRef } = useFullscreen();

  function handlerClickEventChange(ev: ClickEvents) {
    dispatch(setClickEvent(ev));
  }

  function toggleRightBar() {
    dispatch(toggleBar({ bar: "right" }));
  }

  function removeElementClickEvent() {
    if (data.clickEvent?.type !== "element") return;
    dispatch(setClickEvent(null));
  }

  function handlerElementSelect(element: ElementsKeys) {
    dispatch(
      setClickEvent(
        isElementActive(data.clickEvent, element)
          ? null
          : { type: "element", info: element }
      )
    );
  }

  function handlerView() {
    const openAll = isViewMaximize(data.barsStatus);
    for (const bar of Object.keys(data.barsStatus) as Bars[]) {
      if (openAll === true && bar === "right") continue;
      dispatch(toggleBar({ bar, force: openAll }));
    }
  }

  return (
    <div
      ref={fullscreenRef}
      className="flex flex-col w-screen h-screen overflow-hidden font-sans select-none"
    >
      <TopBar
        isOpen={data.barsStatus.top}
        isRightBarOpen={data.barsStatus.right}
        clickEventType={data.clickEvent?.type ?? null}
        onClickEventChange={handlerClickEventChange}
        onToggleRightBar={toggleRightBar}
      />
      <div className="flex-1 flex h-0 overflow-hidden">
        <LeftBar isOpen={data.barsStatus.left} />
        <div className="relative flex-1 flex transition-all overflow-hidden">
          <Graph clickEvent={data.clickEvent} />
          <ElementSelector
            clickEvent={data.clickEvent}
            onClose={removeElementClickEvent}
            onElementSelect={handlerElementSelect}
          />
        </div>
        <RightBar isOpen={data.barsStatus.right} />
      </div>
      <BottomBar
        isOpen={data.barsStatus.bottom}
        isRightBarOpen={data.barsStatus.right}
        isMaximize={isViewMaximize(data.barsStatus)}
        onViewToggle={handlerView}
      />
    </div>
  );
}

export default Editor;
