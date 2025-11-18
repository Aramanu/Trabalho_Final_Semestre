import Cabecalho from "../components/Cabecalho";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


export default function Login() {
  const { register, handleSubmit, reset, setFocus } = useForm();

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
        <form action="" className="pt-10 flex flex-col gap-8 w-full max-w-md">
          <p>
            <input
              type="email"
              name=""
              id=""
              className="placeholder-gray-400 w-full"
              placeholder="exemplo@email.com"
            />
          </p>
          <p>
            <input
              type="password"
              name=""
              id=""
              className="placeholder-gray-400 w-full"
              placeholder="adicione sua senha"
            />
          </p>
          <div className="flex flex-col justify-end">
            <h5 className="uppercase text-[0.6rem] text-end ">
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
          não tem uma conta cadastre-se
        </h5>
        <h5 className="uppercase text-[0.6rem] text-center hover:cursor-pointer md:hidden">cadastre-se
        </h5>
        </Link>
      </section>
    </>
  );
}
