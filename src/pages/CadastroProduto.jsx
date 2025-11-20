import { useState } from "react";
import Cabecalho from "../components/Cabecalho";
import { useForm } from "react-hook-form";
import RodaPe from "../components/RodaPe";
import Swal from "sweetalert2";

export default function CadastroProduto() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [imagem, setImagem] = useState("");
  const [material, setMaterial] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [cor, setCor] = useState("");

  async function cadastrarProduto(e) {
    e.preventDefault();

    const novoArtigo = {
      nome,
      valor: Number(valor),
      imagem,
      material,
      tamanho,
      cor,
      nomes: [],
      comentarios: [],
      notas: [],
    };

    try {
      const resposta = await fetch("http://localhost:3000/artigos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoArtigo),
      });

      if (!resposta.ok) throw new Error("Erro ao cadastrar produto");

      Swal.fire({
        icon: "success",
        title: "Produto cadastrado com sucesso!",
        showConfirmButton: false,
        timer: 2000,
      });

      // Limpar formulário
      setNome("");
      setValor("");
      setImagem("");
      setMaterial("");
      setTamanho("");
      setCor("");
    } catch (erro) {
      Swal.fire({
        icon: "error",
        title: "Erro ao cadastrar produto",
        text: erro.message,
      });
    }
  }

  return (
    <>
      <Cabecalho />
      <div className="pt-20 min-h-screen flex justify-center items-center">
        <div className="w-full max-w-md bg-cinza p-8 rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Cadastro de Produto
          </h1>
          <form onSubmit={cadastrarProduto} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome do Produto"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="p-3 rounded bg-preto_azulado border-2 border-azul focus:outline-none focus:border-verde"
              required
            />
            <input
              type="number"
              placeholder="Valor (R$)"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              step="0.01"
              className="p-3 rounded bg-preto_azulado border-2 border-azul focus:outline-none focus:border-verde"
              required
            />
            <input
              type="text"
              placeholder="URL da Imagem"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              className="p-3 rounded bg-preto_azulado border-2 border-azul focus:outline-none focus:border-verde"
              required
            />
            <input
              type="text"
              placeholder="Material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="p-3 rounded bg-preto_azulado border-2 border-azul focus:outline-none focus:border-verde"
              required
            />
            <input
              type="text"
              placeholder="Tamanho"
              value={tamanho}
              onChange={(e) => setTamanho(e.target.value)}
              className="p-3 rounded bg-preto_azulado border-2 border-azul focus:outline-none focus:border-verde"
              required
            />
            <input
              type="text"
              placeholder="Cor"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
              className="p-3 rounded bg-preto_azulado border-2 border-azul focus:outline-none focus:border-verde"
              required
            />
            <button
              type="submit"
              className="bg-verde hover:bg-laranja text-preto_azulado font-bold py-3 rounded duration-200 mt-2"
            >
              Cadastrar Produto
            </button>
          </form>
        </div>
      </div>
      <RodaPe />
    </>
  );
}
