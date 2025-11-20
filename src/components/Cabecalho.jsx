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
  },[] );

  return (
    <nav
      ref={menuRef}
      className="bg-preto_azulado fixe
      d top-0 left-0 w-full z-50"
    >
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* LOGO */}
        <a href="#" className="flex items-center space-x-3">
          <img src="/logo.svg" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold text-white"></span>
        </a>

        {/* ÍCONES E TOGGLE */}
        <div className="flex md:order-2 items-center space-x-3">
          <FaShoppingCart className="h-6 w-6 text-white" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
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

        {/* MENU RESPONSIVO */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1 transition-all duration-300`}
        >
          <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link to="/" className="block py-2 px-3 text-white hover:text-blue-400">Home</Link>
            </li>
            <li>
              <Link to="/produtos" className="block py-2 px-3 text-white hover:text-blue-400">Produtos</Link>
            </li>
            <li>
              <Link to="/login" className="block py-2 px-3 text-white hover:text-blue-400">Login</Link>
            </li>
            <li>
              <Link to="/pesquisa" className="block py-2 px-3 text-white hover:text-blue-400">Pesquisar</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
