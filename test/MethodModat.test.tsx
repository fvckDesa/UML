import React, { ReactElement } from "react";
// test
import { it, expect, vi, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// component
import type { Method } from "@src/types/class";
import MethodModal from "@src/components/MethodModal";

vi.mock("react-dom");
const handlerSave = vi.fn();
const handlerClose = vi.fn();

Element.prototype.scrollTo = vi.fn() as any;

function setup(ui: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(ui),
  };
}

describe("Correct call of passed functions", () => {
  it("Call onClose function", async () => {
    const { user } = setup(
      <MethodModal close={false} onSave={handlerSave} onClose={handlerClose} />
    );

    const closeBtn = screen.getByTestId("close-btn");

    await user.click(closeBtn);

    expect(handlerClose).toHaveBeenCalled();
  });

  it("Call onSave with method object", async () => {
    const { user } = setup(
      <MethodModal close={false} onSave={handlerSave} onClose={handlerClose} />
    );

    const visibility = screen.getByLabelText(/visibility/i);
    const name = screen.getByLabelText(/name/i);
    const type = screen.getByLabelText(/type/i);
    const arrayBox = screen.getByTestId("checkbox-isArray");
    const staticBox = screen.getByTestId("checkbox-isStatic");
    const submit = screen.getByRole("button", { name: /save/i });
    // fill inputs
    await user.selectOptions(visibility, "package");
    await user.type(name, "method");
    await user.type(type, "String");
    await user.click(arrayBox);
    await user.click(staticBox);
    // submit
    await user.click(submit);

    expect(handlerSave).toHaveBeenCalledWith({
      visibility: "package",
      name: "method",
      type: "String",
      isArray: true,
      isStatic: true,
      parameters: [],
    });
  });

  it("Not call onSave if there is an empty field", async () => {
    const { user } = setup(
      <MethodModal close={false} onSave={handlerSave} onClose={handlerClose} />
    );

    const visibility = screen.getByLabelText(/visibility/i);
    const name = screen.getByLabelText(/name/i);
    const staticCheckbox = screen.getByTestId("checkbox-isStatic");
    const submit = screen.getByRole("button", { name: /save/i });
    // fill inputs
    await user.selectOptions(visibility, "private");
    await user.type(name, "attribute");
    await user.click(staticCheckbox);
    // submit
    await user.click(submit);

    expect(handlerSave).not.toHaveBeenCalled();
  });
});

describe("Modal shape", () => {
  it("Have method title", () => {
    render(
      <MethodModal close={false} onSave={handlerSave} onClose={handlerClose} />
    );
    expect(screen.getByTestId("title")).toHaveTextContent(/method/i);
  });

  it("Array checkbox indicate the type", async () => {
    const { user } = setup(
      <MethodModal close={false} onSave={handlerSave} onClose={handlerClose} />
    );

    const type = screen.getByLabelText(/type/i);
    const checkbox = screen.getByTestId("checkbox-isArray");

    await user.type(type, "String");

    expect(checkbox.nextSibling).toHaveTextContent("Return array of String");
  });
});

describe("Correct location of passed data", () => {
  it("No data", () => {
    render(
      <MethodModal close={false} onSave={handlerSave} onClose={handlerClose} />
    );

    const visibility = screen.getByLabelText<HTMLSelectElement>(/visibility/i);
    const name = screen.getByLabelText(/name/i);
    const parameters = screen.queryAllByTestId("parameter-name");
    const type = screen.getByLabelText(/type/i);
    const isArray = screen.getByTestId("checkbox-isArray");
    const isStatic = screen.getByTestId("checkbox-isStatic");

    expect(visibility).toHaveValue("public");
    expect(name).toHaveValue("");
    expect(parameters.length).toBe(0);
    expect(type).toHaveValue("");
    expect(isArray).not.toBeChecked();
    expect(isStatic).not.toBeChecked();
  });

  it("With method", () => {
    const method: Method = {
      visibility: "public",
      name: "myMethod",
      parameters: [
        {
          name: "x",
          type: "number",
          isArray: false,
        },
        {
          name: "y",
          type: "number",
          isArray: false,
        },
        {
          name: "z",
          type: "number",
          isArray: true,
        },
      ],
      type: "String",
      isArray: true,
      isStatic: false,
    };

    render(
      <MethodModal
        close={false}
        onSave={handlerSave}
        onClose={handlerClose}
        data={method}
      />
    );

    const visibility = screen.getByLabelText<HTMLSelectElement>(/visibility/i);
    const name = screen.getByLabelText(/name/i);
    const parametersName = screen.getAllByTestId("parameter-name");
    const parametersType = screen.getAllByTestId("parameter-type");
    const parametersIsArray = screen.getAllByTestId("parameter-isArray");
    const type = screen.getByLabelText(/type/i);
    const isArray = screen.getByTestId("checkbox-isArray");
    const isStatic = screen.getByTestId("checkbox-isStatic");

    expect(visibility).toHaveValue("public");
    expect(name).toHaveValue("myMethod");
    // parameter 1
    expect(parametersName[0]).toHaveValue("x");
    expect(parametersType[0]).toHaveValue("number");
    expect(parametersIsArray[0]).not.toBeChecked();
    // parameter 2
    expect(parametersName[1]).toHaveValue("y");
    expect(parametersType[1]).toHaveValue("number");
    expect(parametersIsArray[1]).not.toBeChecked();
    // parameter 3
    expect(parametersName[2]).toHaveValue("z");
    expect(parametersType[2]).toHaveValue("number");
    expect(parametersIsArray[2]).toBeChecked();

    expect(type).toHaveValue("String");
    expect(isArray).toBeChecked();
    expect(isStatic).not.toBeChecked();
  });
});
