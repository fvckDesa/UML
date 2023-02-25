import { forwardRef, ForwardedRef, SelectHTMLAttributes } from "react";
import { ListItem, isListGroup } from "./types";
import { getLabel, getValue } from "./utils";

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: ListItem[];
}

function SelectField(
  { label, name, options, ...selectProps }: IProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  return (
    <div>
      <label className="block w-full mb-1" htmlFor={name}>
        {label}
      </label>
      <select
        ref={ref}
        name={name}
        id={name}
        className={`w-full px-3 py-1.5 border-2 border-gray-300 rounded-lg transition-all outline-none focus:border-blue-600`}
        {...selectProps}
      >
        {options?.map((el) =>
          isListGroup(el) ? (
            <optgroup key={el.label} label={el.label}>
              {el.items?.map((option) => (
                <option key={getLabel(option)} value={getValue(option)}>
                  {getLabel(option)}
                </option>
              ))}
            </optgroup>
          ) : (
            <option key={getLabel(el)} value={getValue(el)}>
              {getLabel(el)}
            </option>
          )
        )}
      </select>
    </div>
  );
}

export default forwardRef(SelectField);
