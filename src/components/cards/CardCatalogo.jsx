import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";
import { Estrelas } from "../Estrelas";
import { Link } from "react-router-dom";

const MySwal = withReactContent(Swal);

function CardCatalogo({ artigo, setArtigos }) {
  const { register, handleSubmit, reset } = useForm();

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

      // Atualiza lista
      const respostaLista = await fetch("http://localhost:3000/artigos");
      const dados = await respostaLista.json();
      setArtigos(dados);
    } catch (erro) {
      console.error("Erro: " + erro.message);
    }
    reset(); // limpa o form
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

  return (
    <div className="w-72 border-2 border-zinc-700 rounded-2xl p-4 flex flex-col items-center">
      <img
        src={artigo.imagem}
        alt={artigo.nome}
        className="h-56 w-full object-cover rounded-2xl mb-4"
      />
      <h2 className="text-center font-bold text-2xl mb-2">{artigo.nome}</h2>
      <h4 className="text-xl font-bold mb-3">
        {Number(artigo.valor).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </h4>
      {(artigo.notas?.length ?? 0) === 0 ? (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-500">Sem avaliações</span>
        </div>
      ) : (
        <div className="mb-3 flex flex-col items-center">
          <Estrelas num={calculaMedia()} />
          <Link
            className="bg-azul hover:bg-laranja text-white text-xs font-bold px-3 py-1 rounded duration-200 inline-block mt-2"
            to={`/artigo/${artigo.id}`}
          >
            Ver Comentários
          </Link>
        </div>
      )}
      <button
        className="bg-verde hover:bg-laranja text-preto_azulado font-bold py-2 px-4 rounded duration-200 w-full"
        onClick={avaliarArtigo}
      >
        Avaliar Produto
      </button>
    </div>
  );
}

export default CardCatalogo;
