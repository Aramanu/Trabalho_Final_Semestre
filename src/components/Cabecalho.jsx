import { useState, useEffect, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Cabecalho() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // referência ao nav/menu

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      // se o clique for fora do menu, fecha
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      ref={menuRef}
      className="bg-preto_azulado fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="/logo.svg" className="h-8" alt="Logo" />
        </Link>

        {/* MENU LINKS - Desktop apenas */}
        <div className="hidden md:flex md:order-1 flex-1 justify-center">
          <ul className="flex flex-row space-x-8">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white hover:text-laranja detalhes duration-200 hover:bg-cinza rounded-lg"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/produtos"
                className="block py-2 px-3 text-white hover:text-laranja detalhes duration-200 hover:bg-cinza rounded-lg"
              >
                Produtos
              </Link>
            </li>
            <li>
              <Link
                to="/pesquisa"
                className="block py-2 px-3 text-white hover:text-laranja detalhes duration-200 hover:bg-cinza rounded-lg"
              >
                Pesquisar
              </Link>
            </li>
          </ul>
        </div>

        {/* ÍCONES E TOGGLE */}
        <div className="flex md:order-2 items-center space-x-4 ">
          <Link
            to="/login"
            className="bg-azul px-2 py-1 rounded text-branco hover:text-azul hover:bg-branco detalhes duration-200 "
          >
            Login
          </Link>
          <FaShoppingCart className="p-2 w-10 h-10 hover:bg-cinza rounded-lg text-verde cursor-pointer  hover:text-branco duration-200 " />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-laranja hover:text-white rounded-lg md:hidden hover:bg-cinza focus:outline-none focus:ring-2 focus:ring-preto_azulado"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* MENU MOBILE */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:hidden transition-all duration-300`}
        >
          <ul className="flex flex-col font-medium p-4 mt-4 border border-cinza rounded-lg bg-preto_azulado space-y-2">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white hover:text-laranja detalhes duration-200 hover:bg-cinza rounded-lg"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/produtos"
                className="block py-2 px-3 text-white hover:text-laranja detalhes duration-200 hover:bg-cinza rounded-lg"
              >
                Produtos
              </Link>
            </li>
            <li>
              <Link
                to="/pesquisa"
                className="block py-2 px-3 text-white hover:text-laranja detalhes duration-200 hover:bg-cinza rounded-lg"
              >
                Pesquisar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
