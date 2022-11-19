// types
import type { JavaClass } from "@src/types/class";
// utils
import { convertVisibility, createParameterString } from "@src/utils/class";

interface IProps {
  javaClass: JavaClass;
}

function Class({ javaClass: { name, attributes, methods } }: IProps) {
  return (
    <div className="min-w-[200px] border-2 border-gray-400 rounded-lg overflow-hidden font-medium cursor-pointer">
      <h1
        className="text-lg text-center font-semibold p-2 border-b-2 border-gray-400 bg-gray-200"
        data-testid="name"
      >
        {name}
      </h1>
      <ul className="min-h-[50px] p-2 border-b-2 border-gray-400 transition-all">
        {attributes.map(({ name, visibility, type, isArray, isStatic }) => (
          <li
            key={name}
            className={`${isStatic ? "underline" : ""} underline-offset-2`}
            data-testid="attribute"
          >
            {convertVisibility(visibility)}
            {name}: {type}
            {isArray ? "[]" : ""}
          </li>
        ))}
      </ul>
      <ul className="min-h-[50px] p-2">
        {methods.map(
          ({ name, visibility, type, isArray, isStatic, parameters }) => (
            <li
              key={name}
              className={`${isStatic ? "underline" : ""} underline-offset-2`}
              data-testid="method"
            >
              {convertVisibility(visibility)}
              {name}({parameters.map(createParameterString).join(", ")}): {type}
              {isArray ? "[]" : ""}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Class;
