import { StrictMode } from "react";  // Ativa verificações extras do React durante o desenvolvimento, ajudando a encontrar possíveis problemas no código.
import { createRoot } from "react-dom/client"; // Cria a raiz da aplicação React e permite renderizar o App dentro da div root do HTML.
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// createBrowserRouter cria o sistema de rotas da aplicação.
// RouterProvider ativa essas rotas no React, permitindo que a página certa apareça de acordo com a URL.

// Páginas da aplicação
import Home from "./routes/Home.jsx";
import NewPost from "./routes/NewPost.jsx";
import Post from "./routes/Post.jsx";
import Admin from "./routes/Admin.jsx";
import EditPost from "./routes/EditPost.jsx";
import NotFound from "./routes/NotFound.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new",
        element: <NewPost />,
      },
      {
        path: "/posts/:id",
        element: <Post />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/posts/edit/:id",
        element: <EditPost />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* O RouterProvider ativa o React Router na aplicação.
        Ele usa o objeto router para decidir qual página/componente
        deve aparecer de acordo com a URL acessada. */}
    <RouterProvider router={router} />
  </StrictMode>
);

/* Esse arquivo é o ponto de entrada do React. Ele pega a div com id "root" do index.html
 e renderiza a aplicação dentro dela. Além disso, é aqui que você configura as rotas com 
 createBrowserRouter, dizendo qual componente deve aparecer para cada URL, como /, /new,
  /admin, /posts/:id e assim por diante.*/