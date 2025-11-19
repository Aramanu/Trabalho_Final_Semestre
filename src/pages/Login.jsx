import Cabecalho from "../components/Cabecalho";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login() {
  const { register, handleSubmit, watch, setFocus, reset } = useForm();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    setFocus("login");
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuario")) || [];
    setUsuarios(
      Array.isArray(usuariosSalvos) ? usuariosSalvos : [usuariosSalvos]
    );
  }, [setFocus]);

  function parseUsuario(raw) {
    try {
      const once = JSON.parse(raw);
      if (typeof once === "string") {
        return JSON.parse(once);
      }
      return once;
    } catch (e) {
      return null;
    }
  }

  function onSubmit(data) {
    const loginDigitado = data.login.trim().toLowerCase();
    const senhaDigitada = data.senha.trim();

    const raw = localStorage.getItem("usuario");
    const usuarioSalvo = parseUsuario(raw);

    if (!usuarioSalvo) {
      alert("Nenhum usuário cadastrado!");
      reset();
      return;
    }

    const emailSalvo = usuarioSalvo.login.trim().toLowerCase();
    const senhaSalva = usuarioSalvo.senha.trim();

    if (emailSalvo === loginDigitado && senhaSalva === senhaDigitada) {
      alert("Login realizado com sucesso!");
    } else {
      alert("Email ou senha incorretos.");
    }

    reset();
    setFocus("login");
  }


  return (
    <>
      <Cabecalho />

      <section className="mt-40 flex flex-col items-center gap-8">
        <h1 className="uppercase text-black font-bold hidden md:block">
          entrar com email e senha
        </h1>
        <h1 className="uppercase text-black font-bold md:hidden">
          email e senha
        </h1>

        <form
          className="pt-10 flex flex-col gap-8 md:w-full w-80 max-w-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p>
            <input
              type="email"
              className="placeholder-gray-400 w-full"
              placeholder="exemplo@email.com"
              {...register("login", { required: true })}
            />
          </p>

          <p>
            <input
              type="password"
              className="placeholder-gray-400 w-full"
              placeholder="adicione sua senha"
              {...register("senha", { required: true })}
            />
          </p>

          <div className="flex flex-col justify-end">
            <h5 className="uppercase text-[0.6rem] text-end">
              esqueci minha senha
            </h5>
            <hr className="w-full border-black" />
          </div>

          <button
            type="submit"
            className="bg-[#0E1418] text-white px-4 py-2 rounded mt-4 hover:bg-preto_azulado"
          >
            Entrar
          </button>
        </form>

        <Link to="/cadastro-usuario">
          <h5 className="uppercase text-[0.6rem] text-center hidden md:block hover:cursor-pointer">
            não tem uma conta? cadastre-se
          </h5>
          <h5 className="uppercase text-[0.6rem] text-center md:hidden hover:cursor-pointer">
            cadastre-se
          </h5>
        </Link>
      </section>
    </>
  );
}
