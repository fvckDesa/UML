// types
import type { DragEvent } from "react";
import type { ElementsKeys } from "@src/data/umlElements";
import type { ClickEvents } from "@src/types/infoReducer";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// hooks
import { useState, useEffect } from "react";
// icons
import { ClassSvg, ClassIcon } from "@src/assets";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// data
import { UML_ELEMENTS } from "@src/data/umlElements";
import { useUMLContext } from "@src/contexts/UML";

function ActionBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { umlInfo, dispatchInfo } = useUMLContext();

  useEffect(() => {
    if (isOpen === false && umlInfo.clickEvent?.type === "element") {
      dispatchInfo({
        type: "clickEvent/change",
        payload: {
          clickEvent: null,
        },
      });
    }
  }, [isOpen]);

  function handlerDragStart(element: ElementsKeys, img: string) {
    const { width, height } = UML_ELEMENTS[element];

    return function (e: DragEvent<HTMLButtonElement>) {
      e.dataTransfer.setData("application/uml", element);
      e.dataTransfer.dropEffect = "copy";
      const elementSvg = new Image();
      elementSvg.src = img;
      e.dataTransfer.setDragImage(elementSvg, width / 2, height / 2);
    };
  }

  function handlerClick(clickEvent: ClickEvents) {
    return function () {
      dispatchInfo({
        type: "clickEvent/change",
        payload: {
          clickEvent:
            umlInfo.clickEvent?.type === clickEvent?.type ? null : clickEvent,
        },
      });
    };
  }

  return (
    <div className="absolute bottom-8 left-8">
      <button
        className="absolute top-1/2 left-0 -translate-y-1/2 flex justify-center items-center w-16 h-16 rounded-full bg-slate-500 transition-colors z-10 hover:bg-slate-400 shadow-lg"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FontAwesomeIcon
          className={`w-8 h-8 transition-all duration-500 ${
            isOpen ? "rotate-[135deg]" : "rotate-0"
          }`}
          icon={faPlus}
          color="#fff"
        />
      </button>
      <div
        className={`flex justify-end items-center gap-4 ${
          isOpen ? "w-auto pl-16 pr-6" : "w-0 p-0"
        } h-11 ml-8 rounded-full bg-slate-300 transition-all duration-300 overflow-hidden shadow-lg`}
      >
        <button
          className={`${
            isOpen ? "right-0" : ""
          } w-8 h-8 rounded-full opacity-60 cursor-pointer transition-all ${
            umlInfo.clickEvent?.type === "element" &&
            umlInfo.clickEvent?.info === "javaClass"
              ? "bg-blue-500"
              : ""
          } hover:opacity-100`}
          draggable="true"
          onDragStart={handlerDragStart("javaClass", ClassSvg)}
          onClick={handlerClick({ type: "element", info: "javaClass" })}
        >
          <img src={ClassIcon} alt="Java class icon" />
        </button>
      </div>
    </div>
  );
}

export default ActionBar;
