import { useEffect, useState } from "react";
import Cabecalho from "../components/Cabecalho";
import RodaPe from "../components/RodaPe";
import CardCatalogo from "../components/cards/CardCatalogo";

function Produtos() {
  const [artigos, setArtigos] = useState([]);

  useEffect(() => {
    async function buscarArtigos() {
      const resposta = await fetch("http://localhost:3000/artigos");
      const dados = await resposta.json();
      setArtigos(dados);
    }
    buscarArtigos();
  }, []);

  const listaArtigos = artigos.map((artigo) => (
    <CardCatalogo key={artigo.id} artigo={artigo} setArtigos={setArtigos} />
  ));

  return (
    <>
      <Cabecalho />
      <div className="pt-20">
        <h1 className="text-4xl font-bold flex justify-center my-10">
          Catálogo de Artigos Esportivos
        </h1>

        <div className="flex flex-wrap gap-8 justify-center mb-30 px-4">
          {listaArtigos}
        </div>
      </div>
      <RodaPe />
    </>
  );
}

export default Produtos;