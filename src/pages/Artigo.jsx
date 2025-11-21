import Cabecalho from "../components/Cabecalho";
import RodaPe from "../components/RodaPe";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Estrelas } from "../components/Estrelas";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";

const MySwal = withReactContent(Swal);

function Artigo() {
  const { artigoId } = useParams();
  const [artigo, setArtigo] = useState({});
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    async function getArtigo() {
      const response = await fetch(`http://localhost:3000/artigos/${artigoId}`);
      const artigo2 = await response.json();
      setArtigo(artigo2);
    }
    getArtigo();
  }, [artigoId]);

  async function enviarComentario(data) {
    const { nomes, comentarios, notas } = data;

    const artigoAlterado = {
      ...artigo,
      nomes: [...(artigo.nomes ?? []), nomes],
      comentarios: [...(artigo.comentarios ?? []), comentarios],
      notas: [...(artigo.notas ?? []), Number(notas)],
    };

    try {
      const resposta = await fetch(
        `http://localhost:3000/artigos/${artigo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(artigoAlterado),
        }
      );
      if (!resposta.ok)
        throw new Error("Erro ao incluir avaliação do artigo...");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `<span style="font-family: 'Arial'">Ok! Avaliação cadastrada com sucesso</span>`,
        showConfirmButton: false,
        timer: 2000,
      });

      // Atualiza artigo
      const response = await fetch(`http://localhost:3000/artigos/${artigoId}`);
      const artigoAtualizado = await response.json();
      setArtigo(artigoAtualizado);
    } catch (erro) {
      console.error("Erro: " + erro.message);
    }
    reset();
  }

  function avaliarArtigo() {
    MySwal.fire({
      title: (
        <span style={{ fontFamily: "Arial" }}>Avaliação: {artigo.nome}</span>
      ),
      html: (
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={handleSubmit(enviarComentario)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Seu nome"
            className="border-2 border-azul rounded-md p-2"
            style={{ width: "300px" }}
            required
            {...register("nomes")}
          />
          <input
            type="text"
            placeholder="Comentário"
            className="border-2 border-azul rounded-md p-2"
            style={{ width: "300px" }}
            required
            {...register("comentarios")}
          />
          <input
            type="number"
            placeholder="Nota (1 a 5)"
            className="border-2 border-azul rounded-md p-2"
            style={{ width: "300px" }}
            min="1"
            max="5"
            required
            {...register("notas")}
          />
          <button
            type="submit"
            className="bg-verde hover:bg-laranja text-preto_azulado px-4 py-2 rounded duration-200"
            style={{ marginTop: "20px" }}
          >
            Enviar
          </button>
        </form>
      ),
      showConfirmButton: false,
    });
  }

  function calculaMedia() {
    const notas = artigo?.notas ?? [];
    if (notas.length === 0) return 0;
    let soma = 0;
    for (const nota of notas) {
      soma = soma + nota;
    }
    return soma / notas.length;
  }

  const listaComentarios = [];
  if (artigo.comentarios) {
    for (let i = 0; i < artigo.comentarios.length; i++) {
      listaComentarios.push(
        <tr key={artigo.comentarios[i]} className="">
          <td className="px-4">{artigo.nomes[i]}</td>
          <td className="px-4">{artigo.comentarios[i]}</td>
          <td className="px-4">
            <Estrelas num={artigo.notas[i]} />
          </td>
        </tr>
      );
    }
  }

  return (
    <>
      <Cabecalho />
      <div className="pt-20">
        <h1 className="md:h2 h4 text-center font-bold my-10">
          {artigo.nome}
        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-6 max-w-7xl mx-auto px-4">
          <img
            src={artigo.imagem}
            alt="Imagem do Artigo"
            className="w-full md:w-[600px] md:h-[600px] object-cover"
          />
          <div className="border-2 border-preto_azulado p-6 w-full md:w-96">
            <h3 className="text-2xl font-bold mb-4">Detalhes do Produto</h3>
            <p className="text-lg mb-3">
              <span className="font-bold">Valor:</span>{" "}
              {Number(artigo.valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="text-lg mb-3">
              <span className="font-bold">Material:</span> {artigo.material}
            </p>
            <p className="text-lg mb-3">
              <span className="font-bold">Tamanho:</span> {artigo.tamanho}
            </p>
            <p className="text-lg mb-4">
              <span className="font-bold">Cor:</span> {artigo.cor}
            </p>
            <div className="mt-4 pt-4 border-t border-preto-azulado">
              {(artigo.notas?.length ?? 0) === 0 ? (
                <p className="text-sm text-azul_aux">Sem avaliações ainda</p>
              ) : (
                <div>
                  <p className="font-bold mb-2">Avaliação Média:</p>
                  <Estrelas num={calculaMedia()} />
                  <p className="text-sm text-azul_aux mt-1">
                    ({artigo.notas.length}{" "}
                    {artigo.notas.length === 1 ? "avaliação" : "avaliações"})
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-16 px-4 mb-10">
          <h2 className="text-2xl font-bold mb-6">
            Comentários e Avaliações dos Usuários
          </h2>

          <button
            className="bg-verde hover:bg-laranja text-preto_azulado font-bold py-3 px-8 rounded duration-200 mb-8"
            onClick={avaliarArtigo}
          >
            Avaliar Produto
          </button>

          {(artigo.comentarios?.length ?? 0) === 0 ? (
            <p className="text-gray-500 text-lg">
              Nenhum comentário ainda. Seja o primeiro a avaliar!
            </p>
          ) : (
            <table className="table-auto border-separate border-spacing-y-3 border-spacing-x-4 w-full max-w-4xl">
              <thead>
                <tr className="border-preto_azulado">
                  <th className="px-6 py-3 text-left rounded-l-lg">
                    Nome do Usuário
                  </th>
                  <th className="px-6 py-3 text-left">
                    Comentário sobre o artigo
                  </th>
                  <th className="px-6 py-3 text-left rounded-r-lg">Nota</th>
                </tr>
              </thead>
              <tbody>{listaComentarios}</tbody>
            </table>
          )}
        </div>
      </div>
      <RodaPe />
    </>
  );
}

export default Artigo;
