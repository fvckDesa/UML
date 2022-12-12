// types
import type { ElementsKeys } from "@src/data/umlElements";
import type { DragEvent } from "react";
import type { ClickEvents } from "@src/types/infoReducer";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// hooks
import { useUMLContext } from "@src/contexts/UML";
// icons
import { faBan } from "@fortawesome/free-solid-svg-icons";
// data
import { UML_ELEMENTS } from "@src/data/umlElements";

interface IProps {
  element: ElementsKeys;
  icon: string;
}

function UMLElementButton({ element, icon }: IProps) {
  const { umlInfo, dispatchInfo } = useUMLContext();
  const isActive =
    umlInfo.clickEvent?.type === "element" &&
    umlInfo.clickEvent?.info === element;

  function handlerDragStart(element: ElementsKeys) {
    const { dimensions, img } = UML_ELEMENTS[element];
    const { width, height } = dimensions;

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
          clickEvent: isActive ? null : clickEvent,
        },
      });
    };
  }

  return (
    <button
      className={`w-8 h-8 cursor-pointer`}
      draggable="true"
      onDragStart={handlerDragStart(element)}
      onClick={handlerClick({ type: "element", info: element })}
    >
      {isActive ? (
        <FontAwesomeIcon icon={faBan} size="2xl" color="#ef4444" />
      ) : (
        <img src={icon} alt={`${element} icon`} />
      )}
    </button>
  );
}

export default UMLElementButton;