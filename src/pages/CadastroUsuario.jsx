import Cabecalho from "../components/Cabecalho";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function CadastroUsuario() {
    const {register, handleSubmit, setFocus, reset} = useForm();
    const [usuario, setUsuario] = useState(null);

    function cadastrarUsuario(data){
      const novoUsuario = {
        nome: data.name,
        cpf: data.cpf,
        telefone: data.telefone,
        endereco: data.endereco,
        cep: data.cep,
        login: data.login,
        senha: data.senha
      };
      setUsuario(novoUsuario);
      localStorage.setItem("usuario", JSON.stringify(novoUsuario));
      Swal.fire({
              position: "top-end",
              icon: "success",
              title: `<span style="font-family: 'Arial'">Cadastro Realizado com Sucesso!!</span>`,
              showConfirmButton: false,
              timer: 2000,
            })
      limparFormulario()
    }
    useEffect(() => {
      setFocus("name")
      if(localStorage.getItem("usuario")){
        const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
        setUsuario(usuarioSalvo);
      }
    }, [setFocus]);
    function limparFormulario(){
      reset({
        name: "",
        cpf: "",
        telefone: "",
        endereco: "",
        cep: "",
        login: "",
        senha: ""
      });
      setFocus("name");
    }
  return (
    <>
      <Cabecalho />
       <section className="mt-30 md:mt-35 flex flex-col items-center gap-8  ">
              <h1 className="uppercase text-black font-bold ">
                cadastro
              </h1>
              <form action="" onSubmit={handleSubmit(cadastrarUsuario)} className="flex flex-col w-200 gap-8 items-center">
                <p className="flex  flex-row items-end gap-2 md:w-115 justify-end  ">
                  <label htmlFor="name"className="font-semibold items-center justify-center hidden md:block">Nome : </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="placeholder-gray-400 w-80 h-7 md:placeholder-transparent md:w-100"
                    placeholder="Nome Completo"
                    required {...register("name")}
                  />
                </p>
                <p className="flex flex-row items-end gap-2 md:w-115 justify-end ">
                  <label htmlFor="cpf"className="font-semibold items-center justify-center hidden md:block">CPF : </label>
                  <input
                    type="text"
                    name="cpf"
                    id="cpf"
                    className="placeholder-gray-400 w-80 h-7 md:placeholder-transparent md:w-100"
                    placeholder="CPF"
                    required {...register("cpf")}
                  />
                </p>
                <p className="flex flex-row items-end gap-2 md:w-115 justify-end ">
                  <label htmlFor="telefone"className="font-semibold items-center justify-center hidden md:block">Telefone : </label>
                  <input
                    type="text"
                    name="telefone"
                    id="telefone"
                    className="placeholder-gray-400 w-80 h-7 md:placeholder-transparent md:w-100"
                    placeholder="Telefone"
                    required {...register("telefone")}
                  />
                </p>
                <p className="flex flex-row items-end gap-2 md:w-115 justify-end ">
                  <label htmlFor="endereco"className="font-semibold items-center justify-center hidden md:block">Endereço : </label>
                  <input
                    type="text"
                    name="endereco"
                    id="endereco"
                    className="placeholder-gray-400 w-80 h-7 md:placeholder-transparent md:w-100"
                    placeholder="Endereço"
                    required {...register("endereco")}
                  />
                </p>
                <p className="flex flex-row items-end gap-2 md:w-115 justify-end ">
                  <label htmlFor="cep"className="font-semibold items-center justify-center hidden md:block">Cep : </label>
                  <input
                    type="number"
                    name="cep"
                    id="cep"
                    className="placeholder-gray-400 w-80 h-7 md:placeholder-transparent md:w-100"
                    placeholder="Cep"
                    required {...register("cep")}
                  />
                </p>
                <p className="flex flex-row items-end gap-2 md:w-115 justify-end ">
                  <label htmlFor="login"className="font-semibold items-center justify-center hidden md:block">Login / e-mail : </label>
                  <input
                    type="email"
                    name="login"
                    id="login"
                    className="placeholder-gray-400 w-80 h-7 md:placeholder-transparent md:w-100"
                    placeholder="Login / e-mail"
                    required {...register("login")}
                  />
                </p>
                <p className="flex flex-row items-end gap-2 md:w-115 justify-end ">
                  <label htmlFor="senha"className="font-semibold items-center justify-center hidden md:block">Senha : </label>
                  <input
                    type="password"
                    name="senha"
                    id="senha"
                    className="placeholder-gray-400 w-80 h-7 md:placeholder-transparent md:w-100"
                    placeholder="Senha"
                    required {...register("senha")}
                  />
                </p>
                <button
                  type="submit"
                  className="bg-[#0E1418] text-white px-4 py-2 rounded mt-4 hover:bg-preto_azulado w-60"
                >
                  CRIAR CADASTRO
                </button>
              </form>
              
            </section>
    </>
  );
}
