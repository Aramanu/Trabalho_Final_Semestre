import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "flowbite";

import { CarrinhoProvider } from "./context/CarrinhoContext.jsx";
import CadastroProduto from "./pages/CadastroProduto.jsx";
import CadastroUsuario from "./pages/CadastroUsuario.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Pesquisa from "./pages/Pesquisa.jsx";
import Produtos from "./pages/Produtos.jsx";
import Artigo from "./pages/Artigo.jsx";
import Carrinho from "./pages/Carrinho.jsx";
import Manutencao from "./pages/Manutencao.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CarrinhoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pesquisa" element={<Pesquisa />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/artigo/:artigoId" element={<Artigo />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/cadastro-produto" element={<CadastroProduto />} />
          <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
          <Route path="/manutencao" element={<Manutencao />} />
        </Routes>
      </BrowserRouter>
    </CarrinhoProvider>
  </StrictMode>
);
