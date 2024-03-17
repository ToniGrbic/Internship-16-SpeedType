import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import DialogProvider from "./providers/DialogProvider.jsx";
import GameProvider from "./providers/GameProvider.jsx";
import StopWatchProvider from "./providers/StopWatchProvider.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DialogProvider>
      <StopWatchProvider>
        <GameProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GameProvider>
      </StopWatchProvider>
    </DialogProvider>
  </React.StrictMode>
);
