import { forwardRef, ReactElement, Ref, SelectHTMLAttributes } from "react";

type ProbablyArr<T> = T | T[];

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children?: ProbablyArr<ReactElement<HTMLOptionElement | HTMLOptGroupElement>>;
}

const SelectField = forwardRef(
  (
    { label, children, name, ...selectProps }: IProps,
    ref: Ref<HTMLSelectElement>
  ) => {
    return (
      <div>
        <label className="block w-full mb-1" htmlFor={name}>
          {label}
        </label>
        <select
          ref={ref}
          name={name}
          id={name}
          className="w-full px-3 py-1.5 border-2 border-gray-300 rounded-lg transition-all outline-none focus:border-blue-600"
          {...selectProps}
        >
          {children}
        </select>
      </div>
    );
  }
);

export default SelectField;
