import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import DialogProvider from "./providers/DialogProvider.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DialogProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DialogProvider>
  </React.StrictMode>
);
