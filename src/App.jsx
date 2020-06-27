import React, { useState } from "react";
import "./App.css";
import { ThemeProvider } from "styled-components";

import Navigation from "./components/Navigation";

function App() {
  const [theme, setTheme] = useState("light");

  const handleSwitchTheme = () => {
    setTheme((old) => {
      if (old === "light") {
        return "dark";
      }
      return "light";
    });
  };
  return (
    <ThemeProvider
      theme={{
        mode: theme,
      }}
    >
      <div className="App">
        <Navigation onSwitchTheme={handleSwitchTheme} theme={theme} />
      </div>
    </ThemeProvider>
  );
}

export default App;
