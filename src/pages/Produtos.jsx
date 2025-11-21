import { useEffect, useState } from "react";
import Cabecalho from "../components/Cabecalho";
import RodaPe from "../components/RodaPe";
import CardCatalogo from "../components/cards/CardCatalogo";
import { Link } from "react-router-dom";

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
      <div className="pt-20 ">
        <h1 className="md:h2 h4 text-center font-bold my-10">
          Catálogo de Artigos Esportivos
        </h1>

        <div className="flex flex-wrap gap-8 justify-center mb-30 px-4 max-w-7xl mx-auto">
          {listaArtigos}
        </div>

        <div className="flex justify-center my-10">
          <Link
            to="/cadastro-produto"
            className="bg-verde hover:bg-laranja text-preto_azulado font-bold py-3 px-6 rounded duration-200"
          >
            Cadastrar Produto
          </Link>
        </div>
      </div>

      <RodaPe />
    </>
  );
}

export default Produtos;
