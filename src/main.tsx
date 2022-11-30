import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UMLProvider from "./contexts/UML";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UMLProvider>
      <App />
    </UMLProvider>
  </React.StrictMode>
);
