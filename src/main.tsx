import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "react-form-suite/styles.css";
import "./demo.css";

const root = document.getElementById("root");

if (!root) throw new Error("Elemento #root não encontrado.");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

