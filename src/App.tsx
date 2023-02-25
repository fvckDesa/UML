import { Provider } from "react-redux";
import { Graph } from "./features/graph/containers";
import store from "./app/store";
import FullscreenProvider from "./contexts/Fullscreen";
import Editor from "./features/editor/containers/Editor";

function App() {
  return (
    <Provider store={store}>
      <FullscreenProvider>
        <Editor />
      </FullscreenProvider>
    </Provider>
  );
}

export default App;
