// types
import type { Variable } from "@src/types/class";
import { Control, FieldValues, UseFormRegister } from "react-hook-form";
import type { UIEvent } from "react";
// components
import ScrollContainer from "./ScrollContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TypeList from "@src/components/TypeList";
// hooks
import { useFieldArray, useFormState } from "react-hook-form";
import { useState } from "react";
// icons
import {
  faLayerGroup,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface FieldValuesWithParameters extends FieldValues {
  parameters: Variable[];
}

interface IProps {
  control: Control<FieldValuesWithParameters>;
  register: UseFormRegister<FieldValuesWithParameters>;
}

function ParametersField({ control, register }: IProps) {
  const [isTop, setIsTop] = useState(true);
  const { errors } = useFormState({ control });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "parameters",
  });

  function handlerAppend() {
    append({ name: "", type: "", isArray: false });
  }

  function handlerScroll(e: UIEvent) {
    if (e.target instanceof HTMLElement) {
      setIsTop(e.target.scrollTop === 0);
    }
  }

  return (
    <div className="overflow-x-hidden select-none">
      <header className="flex justify-between items-center p-1">
        <h2>Parameters</h2>
        <button
          className="btnAction w-6 h-6"
          type="button"
          data-testid="add-parameter"
          onClick={handlerAppend}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </header>
      <ScrollContainer
        className={`border-t-2 ${
          !isTop ? "border-blue-500" : "border-transparent"
        }`}
        maxHeight={120}
        onScroll={handlerScroll}
      >
        <ul className="flex flex-col items-center gap-2 p-2">
          {fields.map((field, i) => (
            <li
              key={field.id}
              className="w-full flex justify-between items-center"
            >
              <p>{i + 1}.</p>
              <input
                className={`w-[30%] px-1 text-sm leading-6 outline-none border-2 ${
                  errors.parameters?.[i]?.name
                    ? "!border-red-500"
                    : "border-gray-300"
                } rounded focus:border-blue-500`}
                type="text"
                placeholder="Name"
                autoComplete="off"
                data-testid="parameter-name"
                {...register(`parameters.${i}.name`, { required: true })}
              />
              <TypeList
                onSelectOption={(value) => {
                  update(i, {
                    ...field,
                    type: String(value),
                  });
                }}
              >
                <input
                  className={`w-[30%] px-1 text-sm leading-6 outline-none border-2 ${
                    errors.parameters?.[i]?.type
                      ? "!border-red-500"
                      : "border-gray-300"
                  } rounded focus:border-blue-500`}
                  type="text"
                  placeholder="Type"
                  autoComplete="off"
                  data-testid="parameter-type"
                  {...register(`parameters.${i}.type` as const, {
                    required: true,
                  })}
                />
              </TypeList>
              <label className="relative w-6 h-6 rounded overflow-hidden">
                <input
                  type="checkbox"
                  className="hidden peer"
                  {...register(`parameters.${i}.isArray`)}
                />
                <div className="w-full h-full flex justify-center items-center cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white">
                  <FontAwesomeIcon icon={faLayerGroup} />
                </div>
              </label>
              <button
                className="btnAction w-6 h-6"
                type="button"
                onClick={() => remove(i)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </li>
          ))}
        </ul>
      </ScrollContainer>
    </div>
  );
}

export default ParametersField;
