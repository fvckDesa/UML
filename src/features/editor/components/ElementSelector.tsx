import { faBan, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ElementsKeys } from "@src/data/umlElements";
import { DragEvent, useState } from "react";
import { ClickEvents } from "../types";
import { UML_ELEMENTS } from "@src/data/umlElements";
import { isElementActive } from "../utils";

interface IElementSelector {
  clickEvent: ClickEvents;
  onElementSelect: (element: ElementsKeys) => void;
  onClose: () => void;
}

function ElementSelector({
  clickEvent,
  onElementSelect,
  onClose,
}: IElementSelector) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleSelector() {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      onClose();
    }
  }

  function handlerDragStart(element: ElementsKeys) {
    const { dimensions, dragImg } = UML_ELEMENTS[element];
    const { width, height } = dimensions;

    return function (e: DragEvent<HTMLButtonElement>) {
      e.dataTransfer.setData("application/uml", element);
      e.dataTransfer.dropEffect = "copy";
      const elementSvg = new Image();
      elementSvg.src = dragImg;
      e.dataTransfer.setDragImage(elementSvg, width / 2, height / 2);
    };
  }

  return (
    <div className="absolute bottom-8 left-8">
      <button
        className="absolute top-1/2 left-0 -translate-y-1/2 flex justify-center items-center w-16 h-16 rounded-full bg-slate-500 transition-colors z-10 hover:bg-slate-400 shadow-lg"
        onClick={toggleSelector}
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
        {(Object.keys(UML_ELEMENTS) as ElementsKeys[]).map((element) => (
          <button
            key={element}
            className="w-8 h-8 cursor-pointer"
            draggable="true"
            onDragStart={handlerDragStart(element)}
            onClick={() => onElementSelect(element)}
          >
            {isElementActive(clickEvent, element) ? (
              <FontAwesomeIcon icon={faBan} size="2xl" color="#ef4444" />
            ) : (
              <img src={UML_ELEMENTS[element].icon} alt={`${element} icon`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ElementSelector;
