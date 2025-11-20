import { useEffect, useState } from "react";
import CardCatalogo from "./CardCatalogo";

export default function SequenciaDeCardsCatalogo() {
  const [artigos, setArtigos] = useState([]);

  useEffect(() => {
    async function buscarArtigos() {
      const resposta = await fetch("http://localhost:3000/artigos?_limit=3");
      const dados = await resposta.json();
      setArtigos(dados);
    }
    buscarArtigos();
  }, []);

  return (
    <div className="flex flex-col items-center md:justify-center mt-20 gap-4 md:flex-row">
      {artigos.map((artigo) => (
        <CardCatalogo key={artigo.id} artigo={artigo} setArtigos={setArtigos} />
      ))}
    </div>
  );
}
