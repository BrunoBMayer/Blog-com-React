import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("dark"); // Guarda o tema atual da aplicação

  const toggleTheme = () => {
    // Alterna o tema entre escuro e claro
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    // Aplica no body a classe correspondente ao tema atual
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="App">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="container">
        <Outlet />
      </main>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={theme}
        limit={1}
      />
    </div>
  );
}

export default App;

// A função toggleTheme alterna o valor do estado theme entre dark e light.
//  Quando esse estado muda, o useEffect aplica essa classe no body, e o CSS 
// usa essa classe para trocar as variáveis de cor da aplicação.

//O App.jsx é o componente principal da aplicação. Ele organiza a estrutura geral do site,
//  colocando a Navbar no topo, o conteúdo das páginas no meio e o Footer no final. 
// Também é nele que fica o controle do tema claro/escuro, usando useState para guardar o 
// tema atual e useEffect para aplicar a classe dark ou light no body.