import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import "./index.css";
import "./utils/i18n.ts";
import App from "./App.tsx";

// Get the root element and ensure it doesn't have aria-hidden
const rootElement = document.getElementById("root");
if (rootElement) {
  rootElement.removeAttribute("aria-hidden");
}

createRoot(rootElement!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <App />
    </HeroUIProvider>
  </StrictMode>
);
