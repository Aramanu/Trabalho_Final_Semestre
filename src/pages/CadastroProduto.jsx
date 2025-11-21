import Cabecalho from "../components/Cabecalho";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import RodaPe from "../components/RodaPe";
import Swal from "sweetalert2";

export default function CadastroProduto() {
  const { register, handleSubmit, setFocus, reset } = useForm();

  async function cadastroProduto(data) {
    const nome = data.produto;
    const valor = data.valor;
    const imagem = data.imagem;
    const material  = data.material;
    const tamanho = data.tamanho;
    const cor = data.cor;

    try {
      const resposta = await fetch("http://localhost:3000/artigos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome,
          valor: valor,
          imagem: imagem,
          material: material,
          tamanho: tamanho,
          cor: cor,
          nomes: [],
          comentarios: [],
          notas: [],
        }),
      });
      if (!resposta.ok) throw new Error("Erro ao incluir o produto");
      const novoProduto = await resposta.json();
      alert(`Ok! Artigo cadastrado com o código: ${novoProduto.id}`);
    } catch (erro) {
      console.log(`Erro: ${erro.message}`);
    }
    reset();
  }
  useEffect(() => {
    setFocus("produto");
  }, []);

  return (
    <>
      <Cabecalho />
      <section className="mt-30 md:mt-35 flex flex-col items-center gap-8  ">
        <h1 className="uppercase text-black font-bold ">cadastro de produto</h1>
        <form
          action=""
          onSubmit={handleSubmit(cadastroProduto)}
          className="flex flex-col w-200 gap-8 items-center"
        >
          <p className="flex  flex-row items-end gap-2 md:w-115 justify-end  ">
            <label
              htmlFor="produto"
              className="font-semibold items-center justify-center hidden md:block"
            >
              Produto :{" "}
            </label>
            <input
              type="text"
              name="produto"
              id="produto"
              className="placeholder-gray-400 w-80 h-7 md:placeholder-transparent md:w-100"
              placeholder="Produto"
              required
              {...register("produto")}
            />
          </p>
          <p className="flex flex-row items-end gap-2 md:w-115 justify-end ">
            <label
              htmlFor="valor"
              className="font-semibold items-center justify-center hidden md:block"
            >
              Valor :{" "}
            </label>
            <input
              type="number"
              name="valor"
              id="valor"
              className="placeholder-gray-400 w-80 h-7 md:placeholder-transparent md:w-100"
              placeholder="Valor"
              required
              {...register("valor")}
            />
          </p>
          <p className="flex flex-row items-end gap-2 md:w-115 justify-end ">
            <label
              htmlFor="imagem"
              className="font-semibold items-center justify-center hidden md:block"
            >
              Imagem :{" "}
            </label>
            <input
              type="text"
              name="imagem"
              id="imagem"
              className="placeholder-gray-400 w-80 h-7 md:placeholder-transparent md:w-100"
              placeholder="Imagem"
              required
              {...register("imagem")}
            />
          </p>
          <p className="flex flex-row items-end gap-2 md:w-115 justify-end ">
            <label
              htmlFor="tamanho"
              className="font-semibold items-center justify-center hidden md:block"
            >
              Tamanho :{" "}
            </label>
            <input
              type="text"
              name="tamanho"
              id="tamanho"
              className="placeholder-gray-400 w-80 h-7 md:placeholder-transparent md:w-100"
              placeholder="Tamanho"
              required
              {...register("tamanho")}
            />
          </p>
          <p className="flex flex-row items-end gap-2 md:w-115 justify-end ">
            <label
              htmlFor="material"
              className="font-semibold items-center justify-center hidden md:block"
            >
              Material :{" "}
            </label>
            <input
              type="text"
              name="material"
              id="material"
              className="placeholder-gray-400 w-80 h-7 md:placeholder-transparent md:w-100"
              placeholder="Material"
              required
              {...register("material")}
            />
          </p>
          <p className="flex flex-row items-end gap-2 md:w-115 justify-end ">
            <label
              htmlFor="cor"
              className="font-semibold items-center justify-center hidden md:block"
            >
              Cor :{" "}
            </label>
            <input
              type="text"
              name="cor"
              id="cor"
              className="placeholder-gray-400 w-80 h-7 md:placeholder-transparent md:w-100"
              placeholder="Cor"
              required
              {...register("cor")}
            />
          </p>

          <button
            type="submit"
            className="bg-[#0E1418] text-white px-4 py-2 rounded mt-4 hover:bg-preto_azulado w-60"
          >
            CADASTRAR PRODUTO
          </button>
        </form>
      </section>
      <RodaPe />
    </>
  );
}
