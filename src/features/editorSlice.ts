// types
import type { Editor, Bars } from "@src/types/editor";
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
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    toggleBar(state, action: PayloadAction<{ bar: Bars; force?: boolean }>) {
      const { bar, force = !state.barsStatus[bar] } = action.payload;
      state.barsStatus[bar] = force;
    },
  },
});

export const { toggleBar } = editorSlice.actions;

export default editorSlice.reducer;
