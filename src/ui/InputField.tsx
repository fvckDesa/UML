// types
import type { InputHTMLAttributes } from "react";
// components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// hooks
import { forwardRef, Ref } from "react";
// icons
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  type?: "text" | "password" | "email";
}

const InputField = forwardRef(
  (
    {
      label,
      error,
      name,
      className = "",
      type = "text",
      ...inputProps
    }: IProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div>
        <label
          className={`block w-full mb-1 ${error ? "text-red-500" : ""}`}
          htmlFor={name}
        >
          {label}
        </label>
        <input
          ref={ref}
          name={name}
          id={name}
          className={`${className} w-full px-3 py-1.5 border-2 ${
            error ? "!border-red-500" : "border-gray-300"
          } rounded-lg transition-all outline-none focus:border-blue-600`}
          type={type}
          autoComplete="off"
          {...inputProps}
        />
        {error && (
          <div className="flex items-center gap-2 px-1 text-center text-red-500">
            <FontAwesomeIcon
              className="fill-red-500"
              icon={faTriangleExclamation}
            />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

export default InputField;
