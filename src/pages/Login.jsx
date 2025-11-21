import Cabecalho from "../components/Cabecalho";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import RodaPe from "../components/RodaPe";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";


export default function Login() {
  const { register, handleSubmit, reset, setFocus } = useForm();

  return (
    <>
      <Cabecalho />

      <section className="mt-25 flex flex-col items-center gap-8">
        <h1 className="uppercase text-black hidden md:block h4 font-bold">
          entrar com email e senha
        </h1>
        <h1 className="uppercase text-black font-bold md:hidden">
          email e senha
        </h1>
        <form action="" className="pt-10 flex flex-col gap-8 w-full max-w-md">
          <p>
            <input
              type="email"
              name=""
              id=""
              className="placeholder-azul_aux w-full detalhes"
              placeholder="exemplo@email.com"
            />
          </p>
          <p>
            <input
              type="password"
              name=""
              id=""
              className="placeholder-azul_aux w-full detalhes"
              placeholder="adicione sua senha"
            />
          </p>
          <div className="flex flex-col justify-end">
            <h5 className="uppercase detalhes text-end hover:text-azul">
              esqueci minha senha
            </h5>
            <hr className="w-full border-preto" />
          </div>
          <button
            type="submit"
            className="bg-preto text-white px-4 py-2 rounded mt-4 hover:bg-azul detalhes"
          >
            Entrar
          </button>
        </form>
        <Link to="/cadastro-usuario"> 
        <h5 className="uppercase detalhes text-center hidden md:block hover:cursor-pointer hover:text-azul">
          não tem uma conta? cadastre-se
        </h5>
        <h5 className="uppercase detalhes text-center hover:cursor-pointer md:hidden hover:text-azul">cadastre-se
        </h5>
        </Link>
      </section>
      <RodaPe />
    </>
  );
}
