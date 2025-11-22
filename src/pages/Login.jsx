import Cabecalho from "../components/Cabecalho";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import RodaPe from "../components/RodaPe";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

export default function Login() {
  const { register, handleSubmit, setFocus, reset } = useForm();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    setFocus("login");
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(
      Array.isArray(usuariosSalvos) ? usuariosSalvos : [usuariosSalvos]
    );
  }, [setFocus]);

  function onSubmit(data) {
    const loginDigitado = data.login.trim().toLowerCase();
    const senhaDigitada = data.senha.trim();

    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!Array.isArray(listaUsuarios) || listaUsuarios.length === 0) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `<span style="font-family: 'Arial'">Nenhum usuário cadastrado!</span>`,
        showConfirmButton: false,
        timer: 2000,
      });
      reset();
      return;
    }

    const usuarioEncontrado = listaUsuarios.find(
      (usuario) =>
        usuario.login.trim().toLowerCase() === loginDigitado &&
        usuario.senha.trim() === senhaDigitada
    );

    if (usuarioEncontrado) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `<span style="font-family: 'Arial'">Login Realizado com Sucesso!!!</span>`,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `<span style="font-family: 'Arial'">Email ou Senha Incorretos!!</span>`,
        showConfirmButton: false,
        timer: 2000,
      });
    }

    reset();
    setFocus("login");
  }

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="pt-10 flex flex-col gap-8 w-full max-w-md"
        >
          <p>
            <input
              type="email"
              name="login"
              id="login"
              className="placeholder-azul_aux w-full detalhes"
              placeholder="exemplo@email.com"
              {...register("login")}
            />
          </p>
          <p>
            <input
              type="password"
              name="senha"
              id="senha"
              className="placeholder-azul_aux w-full detalhes"
              placeholder="adicione sua senha"
              {...register("senha")}
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
          <h5 className="uppercase detalhes text-center hover:cursor-pointer md:hidden hover:text-azul">
            cadastre-se
          </h5>
        </Link>
      </section>
      <RodaPe />
    </>
  );
}
