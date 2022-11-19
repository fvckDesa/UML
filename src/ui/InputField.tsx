import { InputHTMLAttributes, forwardRef, Ref } from "react";

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
        {error && <div className="text-red-500">{error}</div>}
      </div>
    );
  }
);

export default InputField;
