// types
import type { ChangeEvent } from "react";
import type { ClassElement } from "@src/types/uml";
// components
import { CheckboxField, InputField } from "@src/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AttributePanelList from "./AttributePanelList";
import ConstructorPanelList from "./ConstructorPanelList";
import MethodPanelList from "./MethodPanelList";
// hooks
import { useRedux } from "@src/hooks/useRedux";
// redux
import {
  deleteElement,
  deleteError,
  setError,
  updateElementData,
} from "@src/features/umlSlice";
// utils
import { createClassCode } from "@src/utils/code";
// icons
import { faCode } from "@fortawesome/free-solid-svg-icons";

function SidebarClass() {
  const { data, dispatch } = useRedux((state) => ({
    classEl: state.uml.activeElement
      ? (state.uml.elements[state.uml.activeElement] as ClassElement)
      : null,
    activeClass: state.uml.activeElement,
    error: state.uml.activeElement
      ? state.uml.errors[state.uml.activeElement]
      : null,
  }));
  const { activeClass, classEl, error } = data;

  function handlerNameChange(newName: string) {
    if (!activeClass) return;
    if (newName === "") {
      dispatch(
        setError({ id: activeClass, message: "Name of class is required" })
      );
    } else {
      dispatch(deleteError(activeClass));
    }

    dispatch(updateElementData({ id: activeClass, data: { name: newName } }));
  }

  function handlerFinalChange(e: ChangeEvent<HTMLInputElement>) {
    if (!activeClass) return;
    dispatch(
      updateElementData({
        id: activeClass,
        data: { isFinal: e.target.checked },
      })
    );
  }

  function handlerMainChange(e: ChangeEvent<HTMLInputElement>) {
    if (!activeClass) return;
    dispatch(
      updateElementData({
        id: activeClass,
        data: { haveMain: e.target.checked },
      })
    );
  }

  function handlerDelete() {
    if (!activeClass) return;
    dispatch(deleteElement(activeClass));
  }

  function handlerCode() {
    if (!classEl) return;
    const code = createClassCode(classEl.data);
    const url = URL.createObjectURL(new File([code], ""));
    const link = document.createElement("a");
    link.download = `${classEl.data.name}.java`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!activeClass || !classEl) {
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
          value={classEl.data.name}
          error={error || undefined}
        />
        <CheckboxField
          text="Final"
          onChange={handlerFinalChange}
          checked={classEl.data.isFinal}
        />
        <CheckboxField
          text="Main"
          onChange={handlerMainChange}
          checked={classEl.data.haveMain}
        />
      </div>
      <AttributePanelList
        attributes={classEl.data.attributes}
        classId={activeClass}
      />
      <ConstructorPanelList
        constructors={classEl.data.constructors}
        classId={activeClass}
      />
      <MethodPanelList methods={classEl.data.methods} classId={activeClass} />
      <footer className="flex justify-between items-center w-full p-4 bg-white mt-auto">
        <button
          className="btnAction w-10 h-10 border opacity-100 border-gray-500 transition-opacity duration-300"
          type="button"
          onClick={handlerCode}
          data-testid="code-btn"
          disabled={!!error}
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
