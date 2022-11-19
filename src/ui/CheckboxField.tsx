import { forwardRef, InputHTMLAttributes, Ref } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

const CheckboxField = forwardRef(
  ({ text, name, ...inputProps }: IProps, ref: Ref<HTMLInputElement>) => {
    return (
      <div className="flex justify-start items-center gap-2">
        <input
          ref={ref}
          className="w-4 h-4 cursor-pointer"
          type="checkbox"
          name={name}
          data-testid={`checkbox-${name}`}
          {...inputProps}
        />
        <p>{text}</p>
      </div>
    );
  }
);

export default CheckboxField;
