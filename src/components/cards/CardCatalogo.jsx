export default function Listagem({ imagem, titulo, descricao, valor}) {
  return (
    <div className="w-[350px] h-135 flex flex-col border-2 border-azul">
        <img className="mt-4.5" src={imagem} alt="" />
        <div className="mx-2.5 mt-1 ">
            <h4 className="h4">{titulo}</h4>
            <h5 className="h5">{valor}</h5>
            <p className="detalhes">{descricao}</p>
        </div>
    </div>
  );
}
