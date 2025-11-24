import Cabecalho from "../components/Cabecalho";
import RodaPe from "../components/RodaPe";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CardCatalogo from "../components/cards/CardCatalogo";
import Swal from "sweetalert2";

export default function Pesquisa() {
  const { register, handleSubmit } = useForm();
  const [resultados, setResultados] = useState([]);

  async function pesquisaArtigos(data) {
     try {
      console.log("Pesquisando com palavra-chave:", data.palavraChave);
      const resposta = await fetch(
        `http://localhost:3000/artigos`
      );
      if (!resposta.ok) throw new Error("Erro na requisição");
      const dados = await resposta.json();
      console.log("Dados recebidos da API:", dados);
      const dados2 = dados.filter(artigo => (
        artigo.nome.toLowerCase().includes(data.palavraChave.toLowerCase()) ||
        artigo.material.toLowerCase().includes(data.palavraChave.toLowerCase())
      ));
      console.log("Resultados filtrados:", dados2);
      if (dados2.length === 0) {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: `<span style="font-family: 'Arial'">Nenhum artigo encontrado</span>`,
          text: "Tente buscar com outra palavra-chave",
          showConfirmButton: false,
          timer: 2500,
        });
        setResultados([]);
      } else {
        setResultados(dados2);
      }
      
    } catch (error) {
      console.error("Erro na pesquisa:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `<span style="font-family: 'Arial'">Erro ao buscar artigos</span>`,
        text: error.message,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }

  const listaResultados = resultados.map(artigo => (
    <CardCatalogo key={artigo.id} artigo={artigo} />
  ));
  

  return (
    <div className="flex flex-col min-h-screen">
      <Cabecalho />
      <main className="flex-1">
        <div className="mt-30 md:mt-35 flex flex-col items-center gap-8  ">
          <h1 className="text-4xl font-bold flex justify-center my-10e">
            Pesquisa Produtos
          </h1>
          <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit(pesquisaArtigos)}>
            <input
              type="text"
              className="w-80 md:w-96"
              required
              placeholder="Palavra chave do artigo"
              {...register("palavraChave")}
            />
            <input
              type="submit"
              value="Pesquisar"
              className="bg-verde hover:bg-laranja text-preto_azulado font-bold py-3 px-6 rounded duration-200 w-72 md:w-80"
            />
          </form>
        </div>
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center md:place-items-start">
            {listaResultados}
          </div>
        </section>
      </main>
      <RodaPe />
    </div>
  );
}
