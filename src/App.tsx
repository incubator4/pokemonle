import { Header, Body } from "./layouts";
import { useTheme } from "@heroui/use-theme";
import { useEffect } from "react";

function App() {
  useTheme();

  useEffect(() => {
    // Ensure the html and body elements fill the full height
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";
  }, []);

  return (
    <div className="app-container min-h-screen flex flex-col">
      <Header title="Pokemonle" />
      <div className="flex-grow">
        <Body />
      </div>
    </div>
  );
}

export default App;
