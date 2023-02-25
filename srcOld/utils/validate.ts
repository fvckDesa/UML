import { Validate } from "react-hook-form";

export function validation(
  fieldName: string
): Record<string, Validate<string>> {
  const upperFieldName = fieldName[0].toUpperCase() + fieldName.slice(1);
  return {
    start: (name) =>
      /[A-z\_\$]/.test(name[0]) ||
      `${upperFieldName} can't start with ${
        name[0] === " " ? "space" : name[0]
      }`,
    entireName: (name) => {
      const invalidLetter = [...name].find(
        (letter) => !/[A-z\_\$0-9]/.test(letter)
      );
      return (
        !invalidLetter ||
        `${upperFieldName} can't contains ${
          invalidLetter === " " ? "space" : invalidLetter
        }`
      );
    },
  };
}
