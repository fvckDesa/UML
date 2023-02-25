import { configureStore } from "@reduxjs/toolkit";
// slices
import editorSlice from "@src/features/editor/editorSlice";
import graphSlice from "@src/features/graph/graphSlice";

const store = configureStore({
  reducer: {
    editor: editorSlice,
    graph: graphSlice,
  },
});

export default store;
