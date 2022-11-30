// types
import type { JavaClass } from "@src/types/class";
import type { ChangeEvent } from "react";
// components
import { InputField } from "@src/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AttributePanelList from "./AttributePanelList";
import MethodPanelList from "./MethodPanelList";
// hooks
import { useEffect } from "react";
import { useUMLContext } from "@src/contexts/UML";
// utils
import { generateClassCode } from "@src/utils/class";
// icons
import { faXmark, faCode } from "@fortawesome/free-solid-svg-icons";

function ClassPanel() {
  const { umlClasses, dispatchClasses, umlInfo, dispatchInfo } =
    useUMLContext();
  const { activeClass } = umlInfo;
  const { javaClass = { name: "", attributes: [], methods: [] } } =
    umlClasses[activeClass] ?? {};

  useEffect(() => {
    if (!activeClass) return;
    handlerNameChange(javaClass.name);
  }, [activeClass]);

  function handlerClose() {
    dispatchInfo({ type: "activeClass/change", payload: { id: "" } });
  }

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

  function handlerDelete() {
    dispatchClasses({ type: "class/remove", payload: { id: activeClass } });
    handlerClose();
  }

  function handlerCode() {
    if (!activeClass) return;
    const code = generateClassCode(javaClass);

    const url = URL.createObjectURL(new File([code], ""));
    const link = document.createElement("a");
    link.download = `${javaClass.name}.java`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      className={`absolute top-0 ${activeClass ? "right-0" : "-right-80"
        } flex flex-col w-80 h-full py-6 border-l-2 border-gray-400 bg-white transition-all`}
    >
      <header className="flex justify-between items-center px-4 mb-4">
        <h1 className="text-xl">Class:</h1>
        <button
          className="btnAction w-8 h-8"
          type="button"
          onClick={handlerClose}
          data-testid="close-btn"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </header>
      <div className="px-4 mb-4">
        <InputField
          label="Name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handlerNameChange(e.target.value)
          }
          value={javaClass.name}
          error={umlInfo.errors[activeClass]?.message}
        />
      </div>
      <AttributePanelList
        attributes={javaClass.attributes}
        classId={activeClass}
      />
      <MethodPanelList methods={javaClass.methods} classId={activeClass} />
      <footer className="flex justify-between items-center px-4 mt-auto">
        <button
          className="btnAction w-10 h-10 border opacity-100 border-gray-500 transition-opacity duration-300 disabled:opacity-25 disabled:bg-white"
          type="button"
          onClick={handlerCode}
          data-testid="code-btn"
          disabled={!!umlInfo.errors[activeClass]}
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

export default ClassPanel;
