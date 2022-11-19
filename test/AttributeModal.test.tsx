import React, { ReactElement } from "react";
// test
import { it, expect, vi, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// component
import type { Attribute } from "@src/types/class";
import AttributeModal from "@src/components/AttributeModal";

vi.mock("react-dom");
const handlerSave = vi.fn();
const handlerClose = vi.fn();

function setup(ui: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(ui),
  };
}

describe("Correct call of passed functions", () => {
  it("Call onClose function", async () => {
    const { user } = setup(
      <AttributeModal
        close={false}
        onSave={handlerSave}
        onClose={handlerClose}
      />
    );

    const closeBtn = screen.getByTestId("close-btn");

    await user.click(closeBtn);

    expect(handlerClose).toHaveBeenCalled();
  });

  it("Call onSave with attribute object", async () => {
    const { user } = setup(
      <AttributeModal
        close={false}
        onSave={handlerSave}
        onClose={handlerClose}
      />
    );

    const visibility = screen.getByLabelText(/visibility/i);
    const name = screen.getByLabelText(/name/i);
    const type = screen.getByLabelText(/type/i);
    const submit = screen.getByRole("button", { name: /save/i });
    // fill inputs
    await user.selectOptions(visibility, "private");
    await user.type(name, "attribute");
    await user.type(type, "int");
    // submit
    await user.click(submit);

    expect(handlerSave).toHaveBeenCalledWith({
      visibility: "private",
      name: "attribute",
      type: "int",
      isArray: false,
      isStatic: false,
    });
  });

  it("Not call onSave if there is an empty field", async () => {
    const { user } = setup(
      <AttributeModal
        close={false}
        onSave={handlerSave}
        onClose={handlerClose}
      />
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
  it("Have attribute title", () => {
    render(
      <AttributeModal
        close={false}
        onSave={handlerSave}
        onClose={handlerClose}
      />
    );
    expect(screen.getByTestId("title")).toHaveTextContent(/attribute/i);
  });

  it("Not have the arguments field", () => {
    render(
      <AttributeModal
        close={false}
        onSave={handlerSave}
        onClose={handlerClose}
      />
    );
    expect(screen.queryByText(/arguments/i)).not.toBeInTheDocument();
  });

  it("Array checkbox indicate the type", async () => {
    const { user } = setup(
      <AttributeModal
        close={false}
        onSave={handlerSave}
        onClose={handlerClose}
      />
    );

    const type = screen.getByLabelText(/type/i);
    const checkbox = screen.getByTestId("checkbox-isArray");

    await user.type(type, "String");

    expect(checkbox.nextSibling).toHaveTextContent("Array of String");
  });
});

describe("Correct location of passed data", () => {
  it("No data", () => {
    render(
      <AttributeModal
        close={false}
        onSave={handlerSave}
        onClose={handlerClose}
      />
    );

    const visibility = screen.getByLabelText<HTMLSelectElement>(/visibility/i);
    const name = screen.getByLabelText(/name/i);
    const type = screen.getByLabelText(/type/i);
    const isArray = screen.getByTestId("checkbox-isArray");
    const isStatic = screen.getByTestId("checkbox-isStatic");

    expect(visibility).toHaveValue("public");
    expect(name).toHaveValue("");
    expect(type).toHaveValue("");
    expect(isArray).not.toBeChecked();
    expect(isStatic).not.toBeChecked();
  });

  it("With attribute", () => {
    const attribute: Attribute = {
      visibility: "package",
      name: "myAttr",
      type: "int",
      isArray: false,
      isStatic: true,
    };

    render(
      <AttributeModal
        close={false}
        onSave={handlerSave}
        onClose={handlerClose}
        data={attribute}
      />
    );

    const visibility = screen.getByLabelText<HTMLSelectElement>(/visibility/i);
    const name = screen.getByLabelText(/name/i);
    const type = screen.getByLabelText(/type/i);
    const isArray = screen.getByTestId("checkbox-isArray");
    const isStatic = screen.getByTestId("checkbox-isStatic");

    expect(visibility).toHaveValue("package");
    expect(name).toHaveValue("myAttr");
    expect(type).toHaveValue("int");
    expect(isArray).not.toBeChecked();
    expect(isStatic).toBeChecked();
  });
});
