import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("dark"); // Guarda o tema atual da aplicação

  const toggleTheme = () => {
    // Alterna entre dark e light
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    // Aplica uma classe no body de acordo com o tema atual
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="App">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

export default App;