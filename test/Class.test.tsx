import React from "react";
// test
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
// component
import type { JavaClass } from "../src/types/class";
import Class from "../src/components/Class";

const Custom: JavaClass = {
  name: "test",
  attributes: [
    {
      name: "att1",
      type: "int",
      isArray: false,
      visibility: "public",
      isStatic: true,
    },
    {
      name: "att2",
      type: "float",
      isArray: true,
      visibility: "private",
      isStatic: false,
    },
    {
      name: "att3",
      type: "Custom",
      isArray: false,
      visibility: "package",
      isStatic: false,
    },
  ],
  methods: [
    {
      name: "method1",
      type: "int",
      isArray: false,
      visibility: "public",
      isStatic: true,
      parameters: [
        { name: "var1", type: "String", isArray: false },
        { name: "var2", type: "double", isArray: true },
      ],
    },
    {
      name: "method2",
      type: "String",
      isArray: true,
      visibility: "protected",
      isStatic: false,
      parameters: [],
    },
  ],
};

beforeEach(() => {
  render(<Class javaClass={Custom} />);
});

describe("Class name", () => {
  it("correct class name given", () => {
    expect(screen.getByTestId("name")).toHaveTextContent("test");
  });
});

describe("Attributes", () => {
  it("Render correct num of attributes", () => {
    const attributes = screen.queryAllByTestId("attribute");

    expect(attributes.length).toBe(3);
  });

  it("Public, static, int", () => {
    const attribute = screen.getAllByTestId("attribute")[0];

    expect(attribute).toHaveTextContent("+att1: int");
    expect(attribute).toHaveClass("underline");
  });

  it("Private, array of float", () => {
    const attribute = screen.getAllByTestId("attribute")[1];

    expect(attribute).toHaveTextContent("-att2: float[]");
    expect(attribute).not.toHaveClass("underline");
  });

  it("Package, Custom", () => {
    const attribute = screen.getAllByTestId("attribute")[2];

    expect(attribute).toHaveTextContent("~att3: Custom");
    expect(attribute).not.toHaveClass("underline");
  });
});

describe("Methods", () => {
  it("Render correct num of methods", () => {
    const methods = screen.queryAllByTestId("method");

    expect(methods.length).toBe(2);
  });

  it("Public, static, int, 2 params", () => {
    const method = screen.getAllByTestId("method")[0];

    expect(method).toHaveTextContent(
      "+method1(var1: String, var2: double[]): int"
    );
    expect(method).toHaveClass("underline");
  });

  it("Protected, array of String, 0 params", () => {
    const method = screen.getAllByTestId("method")[1];

    expect(method).toHaveTextContent("#method2(): String[]");
    expect(method).not.toHaveClass("underline");
  });
});
