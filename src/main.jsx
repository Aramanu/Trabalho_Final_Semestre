import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "flowbite";

import App from "./App.jsx";
import CadastroProduto from "./pages/CadastroProduto.jsx";
import CadastroUsuario from "./pages/CadastroUsuario.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Pesquisa from "./pages/Pesquisa.jsx";
import Produtos from "./pages/Produtos.jsx";
import Catalogo from "./pages/Catalogo.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/pesquisa", element: <Pesquisa /> },
  { path: "/produtos", element: <Produtos /> },
  { path: "/catalogo", element: <Catalogo /> },
  { path: "/cadastro-produto", element: <CadastroProduto /> },
  { path: "/cadastro-usuario", element: <CadastroUsuario /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
