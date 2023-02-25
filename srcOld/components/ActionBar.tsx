// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UMLElementButton from "./UMLElementButton";
// hooks
import { useState, useEffect } from "react";
// redux
import { setClickEvent } from "@src/features/editorSlice";
// icons
import { ClassIcon } from "@src/assets";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// data
import { useRedux } from "@src/hooks/useRedux";

function ActionBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, dispatch } = useRedux((state) => state.editor.clickEvent);

  useEffect(() => {
    if (isOpen === false && data?.type === "element") {
      dispatch(setClickEvent(null));
    }
  }, [isOpen]);

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
        <UMLElementButton element="javaClass" icon={ClassIcon} />
      </div>
    </div>
  );
}

export default ActionBar;
