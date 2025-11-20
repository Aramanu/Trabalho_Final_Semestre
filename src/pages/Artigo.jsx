import Cabecalho from "../components/Cabecalho";
import RodaPe from "../components/RodaPe";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Estrelas } from "../components/Estrelas";

function Artigo() {
  const { artigoId } = useParams();
  const [artigo, setArtigo] = useState({});

  useEffect(() => {
    async function getArtigo() {
      const response = await fetch(`http://localhost:3000/artigos/${artigoId}`);
      const artigo2 = await response.json();
      setArtigo(artigo2);
    }
    getArtigo();
  }, [artigoId]);

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
        <h1 className="text-4xl font-bold flex justify-center my-10">
          Comentários: {artigo.nome}
        </h1>

        <div className="flex flex-col md:flex-row justify-center gap-10 mt-20 px-4">
          <div className="flex flex-col gap-4">
            <img
              src={artigo.imagem}
              alt="Imagem do Artigo"
              className="w-full md:w-96 object-cover rounded-lg"
            />
            <div className="bg-cinza p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Detalhes do Produto</h3>
              <p className="text-lg mb-2">
                <span className="font-bold">Material:</span> {artigo.material}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Tamanho:</span> {artigo.tamanho}
              </p>
              <p className="text-lg">
                <span className="font-bold">Cor:</span> {artigo.cor}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4">
              Comentários e Avaliações dos Usuários
            </h2>

            <table className="table-auto border-separate border-spacing-y-3 border-spacing-x-4">
              <thead>
                <tr>
                  <th className="px-4 text-left">Nome do Usuário</th>
                  <th className="px-4 text-left">Comentário sobre o artigo</th>
                  <th className="px-4 text-left">Nota</th>
                </tr>
              </thead>
              <tbody>{listaComentarios}</tbody>
            </table>
          </div>
        </div>
      </div>
      <RodaPe />
    </>
  );
}

export default Artigo;
