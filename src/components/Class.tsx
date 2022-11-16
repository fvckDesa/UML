import type { JavaClass } from "../types/class";
import { convertVisibility, createParameterString } from "../utils/class";

interface IProps {
  javaClass: JavaClass;
}

function Class({ javaClass: { name, attributes, methods } }: IProps) {
  return (
    <div className="border-2 border-gray-400 rounded-lg overflow-hidden font-medium">
      <h1
        className="text-lg text-center font-semibold p-2 border-b-2 border-gray-400 bg-gray-200"
        data-testid="name"
      >
        {name}
      </h1>
      <ul className="p-2 border-b-2 border-gray-400">
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
      <ul className="p-2">
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
