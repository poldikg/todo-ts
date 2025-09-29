import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import TasksContextProvider from "./Components/TasksContext/TasksContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TasksContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TasksContextProvider>
  </StrictMode>
);
