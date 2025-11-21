import Cabecalho from "../components/Cabecalho";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import RodaPe from "../components/RodaPe";
import Swal from "sweetalert2";
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
        icon: "success",
        title: `<span style="font-family: 'Arial'">Email ou Senha Incorretos!!</span>`,
        showConfirmButton: false,
        timer: 2000,
      })
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
          className="pt-10 flex flex-col gap-8 md:w-full w-80 max-w-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p>
            <input
              type="email"
              name=""
              id=""
              className="placeholder-azul_aux w-full detalhes"
              placeholder="exemplo@email.com"
              {...register("login", { required: true })}
            />
          </p>

          <p>
            <input
              type="password"
              name=""
              id=""
              className="placeholder-azul_aux w-full detalhes"
              placeholder="adicione sua senha"
              {...register("senha", { required: true })}
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
