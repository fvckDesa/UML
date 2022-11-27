// types
import type { Method, Variable } from "@src/types/class";
import type {
  UseFormRegister,
  Merge,
  FieldError,
  FieldErrorsImpl,
} from "react-hook-form";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// hooks
import { useLayoutEffect, useRef } from "react";
// icon
import { faLayerGroup, faXmark } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  isArray: boolean;
  register: UseFormRegister<Method>;
  index: number;
  errors: Merge<FieldError, FieldErrorsImpl<Variable>> | undefined;
  onRemove: (index: number) => void;
}

function VariableField({ isArray, register, index, errors, onRemove }: IProps) {
  const toggleRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...other } = register(`parameters.${index}.isArray`);

  useLayoutEffect(() => {
    toggleRef.current?.focus();
  }, []);

  return (
    <li className="w-full flex justify-between items-center">
      <p>{index + 1}.</p>
      <input
        className={`w-[30%] px-1 text-sm leading-6 outline-none border-2 ${
          errors?.name ? "!border-red-500" : "border-gray-300"
        } rounded focus:border-blue-500`}
        type="text"
        placeholder="Name"
        autoComplete="off"
        data-testid="parameter-name"
        {...register(`parameters.${index}.name`, { required: true })}
      />
      <input
        className={`w-[30%] px-1 text-sm leading-6 outline-none border-2 ${
          errors?.type ? "!border-red-500" : "border-gray-300"
        } rounded focus:border-blue-500`}
        type="text"
        placeholder="Type"
        autoComplete="off"
        data-testid="parameter-type"
        {...register(`parameters.${index}.type`, { required: true })}
      />
      <button
        className={`relative flex justify-center items-center w-6 h-6 rounded ${
          isArray ? "bg-blue-500" : ""
        }`}
        type="button"
        onClick={() => toggleRef.current?.click()}
      >
        <FontAwesomeIcon
          icon={faLayerGroup}
          color={isArray ? "#fff" : "#000"}
        />
        <input
          ref={(e) => {
            ref(e);
            toggleRef.current = e;
          }}
          className="hidden"
          type="checkbox"
          data-testid="parameter-isArray"
          {...other}
        />
      </button>
      <button className="btnAction w-6 h-6" onClick={() => onRemove(index)}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </li>
  );
}

export default VariableField;
