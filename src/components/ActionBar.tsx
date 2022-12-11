// types
import type { DragEvent } from "react";
import type { Dimensions } from "@src/types/general";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// hooks
import { useState } from "react";
// icons
import { ClassSvg, ClassIcon } from "@src/assets";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function ActionBar() {
  const [isOpen, setIsOpen] = useState(false);

  function handlerDragStart(dimensions: Dimensions, img: string) {
    return function (e: DragEvent<HTMLButtonElement>) {
      e.dataTransfer.setData("application/uml", JSON.stringify(dimensions));
      e.dataTransfer.dropEffect = "copy";
      const classSvg = new Image();
      classSvg.src = img;
      e.dataTransfer.setDragImage(
        classSvg,
        dimensions.width / 2,
        dimensions.height / 2
      );
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
          } w-8 h-8 rounded-full opacity-60 cursor-grab transition-all hover:opacity-100 active:cursor-grabbing`}
          draggable="true"
          onDragStart={handlerDragStart({ width: 220, height: 154 }, ClassSvg)}
        >
          <img src={ClassIcon} alt="Java class icon" />
        </button>
      </div>
    </div>
  );
}

export default ActionBar;
