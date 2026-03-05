import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NavProvider } from "./components/ui/NavContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NavProvider>
      <App />
    </NavProvider>
  </StrictMode>
);