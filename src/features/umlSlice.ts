// types
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AtLeast } from "@src/types/general";
import type {
  ClickEvents,
  PayloadWithId,
  UMLElements,
  UML,
} from "@src/types/uml";
// redux
import { createSlice } from "@reduxjs/toolkit";
// utils
import { v4 as uuid } from "uuid";

const initialState: UML = {
  elements: {},
  errors: {},
  activeElement: null,
  clickEvent: null,
};

const umlSlice = createSlice({
  name: "uml",
  initialState,
  reducers: {
    addElement: {
      reducer(
        state,
        action: PayloadWithId<{
          element: AtLeast<UMLElements, "type">;
        }>
      ) {
        const { id, element } = action.payload;
        let newElement: UMLElements;
        switch (element.type) {
          case "class": {
            newElement = {
              type: "class",
              data: {
                name: "Class",
                attributes: [],
                constructors: [],
                methods: [],
                isFinal: false,
                haveMain: false,
                ...element.data,
              },
              layout: { x: 0, y: 0, ...element.layout },
            };
            break;
          }
          case "arrow": {
            newElement = {
              type: "arrow",
              data: {
                name: "Arrow",
                relationship: "association",
                ...element.data,
              },
              layout: { ...element.layout },
            };
            break;
          }
        }
        state.elements[id] = newElement;
      },
      prepare(element: AtLeast<UMLElements, "type">) {
        return {
          payload: {
            id: uuid(),
            element,
          },
        };
      },
    },
    updateElementData(
      state,
      action: PayloadWithId<{
        data: Partial<UMLElements["data"]>;
      }>
    ) {
      const { id, data } = action.payload;
      state.elements[id].data = { ...state.elements[id].data, ...data };
    },
    updateElementLayout(
      state,
      action: PayloadWithId<{
        layout: Partial<UMLElements["layout"]>;
      }>
    ) {
      const { id, layout } = action.payload;
      state.elements[id].layout = { ...state.elements[id].layout, ...layout };
    },
    deleteElement(state, action: PayloadAction<string>) {
      delete state.elements[action.payload];
    },
    setError(state, action: PayloadWithId<{ message: string }>) {
      const { id, message } = action.payload;
      state.errors[id] = message;
    },
    deleteError(state, action: PayloadAction<string>) {
      delete state.errors[action.payload];
    },
    setActiveElement(state, action: PayloadAction<string | null>) {
      state.activeElement = action.payload;
    },
    setClickEvent(state, action: PayloadAction<ClickEvents>) {
      state.clickEvent = action.payload;
    },
  },
});

export const {
  addElement,
  updateElementData,
  updateElementLayout,
  deleteElement,
  setError,
  deleteError,
  setActiveElement,
  setClickEvent,
} = umlSlice.actions;

export default umlSlice.reducer;
