// types
import type { Editor, Bars, ClickEvents } from "@src/types/editor";
import type { PayloadAction } from "@reduxjs/toolkit";
// redux
import { createSlice } from "@reduxjs/toolkit";

const initialState: Editor = {
  barsStatus: {
    top: true,
    bottom: true,
    left: true,
    right: false,
  },
  clickEvent: null,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    toggleBar(state, action: PayloadAction<{ bar: Bars; force?: boolean }>) {
      const { bar, force = !state.barsStatus[bar] } = action.payload;
      state.barsStatus[bar] = force;
    },
    setClickEvent(state, action: PayloadAction<ClickEvents>) {
      state.clickEvent = action.payload;
    },
  },
});

export const { toggleBar, setClickEvent } = editorSlice.actions;

export default editorSlice.reducer;
