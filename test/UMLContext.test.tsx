import React from "react";
// test
import { describe, it, expect, vi } from "vitest";
import { render, screen, renderHook, act } from "@testing-library/react";
// types
import { JavaClass } from "@src/types/class";
import type { UMLContext } from "@src/types/UML";
// component
import UMLProvider, { useUMLContext } from "@src/contexts/UML";

vi.mock("uuid");

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

describe("Context provider", () => {
  it("Render children", () => {
    render(
      <UMLProvider>
        <h1>Success</h1>
      </UMLProvider>
    );

    const heading = screen.queryByRole("heading");

    expect(heading).toHaveTextContent("Success");
  });
});

describe("Context hook", () => {
  it("Have classes array", () => {
    const { result } = renderHook(useUMLContext, { wrapper: UMLProvider });
    const { classes } = result.current as UMLContext;
    expect(Array.isArray(classes)).toBe(true);
  });

  describe("Add class", () => {
    it("Classes have unique id", () => {
      const { result } = renderHook(useUMLContext, {
        wrapper: UMLProvider,
      });
      const { addClass } = result.current as UMLContext;

      act(() => addClass("Test1"));
      act(() => addClass("Test2"));
      act(() => addClass("Test3"));

      const { classes } = result.current as UMLContext;

      expect(classes[0].id).toBe("1");
      expect(classes[1].id).toBe("2");
      expect(classes[2].id).toBe("3");
    });

    it("Add class without attributes and methods", () => {
      const { result } = renderHook(useUMLContext, {
        wrapper: UMLProvider,
      });
      const { addClass } = result.current as UMLContext;

      act(() => addClass("Test"));

      const { classes } = result.current as UMLContext;

      expect(classes[0]).toEqual<JavaClass>({
        id: "4",
        name: "Test",
        attributes: [],
        methods: [],
      });
    });

    it("Add class without methods", () => {
      const { result } = renderHook(useUMLContext, { wrapper: UMLProvider });
      const { addClass } = result.current as UMLContext;

      act(() => addClass("Test", Custom.attributes));

      const { classes } = result.current as UMLContext;

      expect(classes[0]).toEqual<JavaClass>({
        id: "5",
        name: "Test",
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
        methods: [],
      });
    });

    it("Add class without attributes", () => {
      const { result } = renderHook(useUMLContext, { wrapper: UMLProvider });
      const { addClass } = result.current as UMLContext;

      act(() => addClass(Custom.name, [], Custom.methods));

      const { classes } = result.current as UMLContext;

      expect(classes[0]).toEqual<JavaClass>({
        id: "6",
        name: "test",
        attributes: [],
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
      });
    });
  });

  describe("Remove class", () => {
    it("Remove 1 class", () => {
      const { result } = renderHook(useUMLContext, { wrapper: UMLProvider });
      const { addClass, removeClass } = result.current as UMLContext;

      act(() => addClass("test1"));
      act(() => addClass("test2"));
      act(() => removeClass("7"));

      const { classes } = result.current as UMLContext;

      expect(classes).toEqual<JavaClass[]>([
        { id: "8", name: "test2", attributes: [], methods: [] },
      ]);
    });
  });

  describe("Update class", () => {
    it("Update correctly one class", () => {
      const { result } = renderHook(useUMLContext, { wrapper: UMLProvider });
      const { addClass, updateClass } = result.current as UMLContext;

      act(() => addClass("test1"));
      act(() =>
        updateClass("9", {
          name: "test",
          attributes: [
            {
              name: "updateAtt",
              isArray: true,
              type: "String",
              isStatic: false,
              visibility: "private",
            },
          ],
        })
      );

      const { classes } = result.current as UMLContext;
      expect(classes).toEqual<JavaClass[]>([
        {
          id: "9",
          name: "test",
          attributes: [
            {
              name: "updateAtt",
              isArray: true,
              type: "String",
              isStatic: false,
              visibility: "private",
            },
          ],
          methods: [],
        },
      ]);
    });

    it("Update class with wrong id", () => {
      const { result } = renderHook(useUMLContext, { wrapper: UMLProvider });
      const { addClass, updateClass } = result.current as UMLContext;

      act(() => addClass("test1"));
      act(() => updateClass("wrong", { name: "test" }));

      const { classes } = result.current as UMLContext;

      expect(classes).toEqual<JavaClass[]>([
        { id: "10", name: "test1", attributes: [], methods: [] },
      ]);
    });
  });
});
