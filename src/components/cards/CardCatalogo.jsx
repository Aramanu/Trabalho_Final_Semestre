import { Estrelas } from "../Estrelas";
import { Link } from "react-router-dom";

function CardCatalogo({ artigo }) {
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
    <Link
      to={`/artigo/${artigo.id}`}
      className="w-[350px] h-[500px] border-2 border-preto_azulado hover:border-azul flex flex-col duration-200 cursor-pointer hover:bg-cyan-100"
    >
      <img
        src={artigo.imagem}
        alt={artigo.nome}
        className="w-[330px] min-h-[330px] mx-auto mt-4 object-cover"
      />
      <div className="mx-2.5 flex-1 flex flex-col justify-between">
        <h2 className="text-start legibilidade">{artigo.nome}</h2>

          <h4 className="text-start detalhes font-bold">
            {Number(artigo.valor).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </h4>
          {(artigo.notas?.length ?? 0) === 0 ? (
            <span className="text-sm text-azul_aux mb-2">Sem avaliações</span>
          ) : (
            <div className="flex items-center gap-2 mb-2">
              <Estrelas num={calculaMedia()} />
            </div>
          )}
      </div>
    </Link>
  );
}

export default CardCatalogo;
