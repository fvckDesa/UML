// types
import type { ChangeEvent } from "react";
// components
import { CheckboxField, InputField } from "@src/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AttributePanelList from "./AttributePanelList";
import ConstructorPanelList from "./ConstructorPanelList";
import MethodPanelList from "./MethodPanelList";
// hooks
import { useUMLContext } from "@src/contexts/UML";
// utils
import { createClassCode } from "@src/utils/code";
// icons
import { faCode } from "@fortawesome/free-solid-svg-icons";

function SidebarClass() {
  const {
    umlClasses,
    dispatchClasses,
    umlInfo: { activeClass, errors },
    dispatchInfo,
    umlArrows,
    dispatchArrow,
  } = useUMLContext();
  const { javaClass } = umlClasses[activeClass] ?? {};

  function handlerNameChange(newName: string) {
    if (newName === "") {
      dispatchInfo({
        type: "error/change",
        payload: {
          id: activeClass,
          error: {
            type: "required",
            message: "Name of class is required",
          },
        },
      });
    } else if (/^[a-z]/.test(newName)) {
      dispatchInfo({
        type: "error/change",
        payload: {
          id: activeClass,
          error: {
            type: "startUppercase",
            message: "Must start with uppercase letter",
          },
        },
      });
    } else {
      dispatchInfo({
        type: "error/remove",
        payload: { id: activeClass },
      });
    }

    dispatchClasses({
      type: "class/name",
      payload: { id: activeClass, name: newName },
    });
  }

  function handlerFinalChange(e: ChangeEvent<HTMLInputElement>) {
    dispatchClasses({
      type: "class/final",
      payload: { id: activeClass, isFinal: e.target.checked },
    });
  }

  function handlerMainChange(e: ChangeEvent<HTMLInputElement>) {
    dispatchClasses({
      type: "class/main",
      payload: { id: activeClass, haveMain: e.target.checked },
    });
  }

  function handlerDelete() {
    dispatchClasses({ type: "class/remove", payload: { id: activeClass } });

    for (const [id, arrow] of Object.entries(umlArrows.arrows)) {
      if (arrow.nodes.includes(activeClass)) {
        dispatchArrow({
          type: "arrow/remove",
          payload: { id },
        });
      }
    }
  }

  function handlerCode() {
    if (!activeClass) return;
    const code = createClassCode(javaClass);
    const url = URL.createObjectURL(new File([code], ""));
    const link = document.createElement("a");
    link.download = `${javaClass.name}.java`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!activeClass || !javaClass) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <span>Select a class</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col gap-4 px-4 mb-4">
        <InputField
          label="Name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handlerNameChange(e.target.value)
          }
          value={javaClass.name}
          error={errors[activeClass]?.message}
        />
        <CheckboxField
          text="Final"
          onChange={handlerFinalChange}
          checked={javaClass.isFinal}
        />
        <CheckboxField
          text="Main"
          onChange={handlerMainChange}
          checked={javaClass.haveMain}
        />
      </div>
      <AttributePanelList
        attributes={javaClass.attributes}
        classId={activeClass}
      />
      <ConstructorPanelList
        constructors={javaClass.constructors}
        classId={activeClass}
      />
      <MethodPanelList methods={javaClass.methods} classId={activeClass} />
      <footer className="flex justify-between items-center w-full p-4 bg-white mt-auto">
        <button
          className="btnAction w-10 h-10 border opacity-100 border-gray-500 transition-opacity duration-300"
          type="button"
          onClick={handlerCode}
          data-testid="code-btn"
          disabled={!!errors[activeClass]}
        >
          <FontAwesomeIcon icon={faCode} />
        </button>
        <button
          className="w-fit px-4 py-2 rounded-lg bg-red-600 text-white transition-colors hover:bg-red-800"
          type="button"
          onClick={handlerDelete}
          data-testid="delete-btn"
        >
          Delete Class
        </button>
      </footer>
    </div>
  );
}

export default SidebarClass;
