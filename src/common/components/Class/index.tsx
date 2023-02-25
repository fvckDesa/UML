import {
  stringifyAttribute,
  stringifyFinal,
  stringifyConstructor,
  stringifyMethod,
} from "./utils";
// data
import { MAIN_METHOD } from "@src/data/class";
import { JavaClass } from "./types";

interface IClass {
  data: JavaClass;
}

function Class({ data }: IClass) {
  return (
    <div className="flex flex-col w-[220px] h-[150px] border-2 border-gray-400 rounded-lg font-medium bg-white overflow-hidden">
      <h1
        className="text-lg text-center font-semibold p-2 border-b-2 border-gray-400 bg-gray-200"
        data-testid="name"
      >
        {stringifyFinal(data.name || "Class", data.isFinal)}
      </h1>
      <ul className="flex-1 p-2 border-b-2 border-gray-400 transition-all">
        {data.attributes.map((attribute, i) => (
          <li
            key={attribute.name + i}
            className={`${
              attribute.isStatic ? "underline" : ""
            } underline-offset-2`}
            data-testid="attribute"
          >
            {stringifyAttribute(attribute)}
          </li>
        ))}
      </ul>
      <ul className="flex-1 p-2">
        {data.constructors.map((constructor, i) => (
          <li
            key={constructor.name + i}
            className="underline-offset-2"
            data-testid="constructor"
          >
            {stringifyConstructor(constructor)}
          </li>
        ))}
        {data.haveMain && (
          <li className="underline underline-offset-2">
            {stringifyMethod(MAIN_METHOD)}
          </li>
        )}
        {data.methods.map((method, i) => (
          <li
            key={method.name + i}
            className={`${
              method.isStatic ? "underline" : ""
            } underline-offset-2`}
            data-testid="method"
          >
            {stringifyMethod(method)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Class;
