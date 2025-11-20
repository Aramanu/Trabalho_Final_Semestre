export default function Listagem({ imagem, titulo, descricao }) {
  return (
    <div
      className="card-home w-full md:w-[500px] md:min-w-[500px] md:max-w-[500px] md:h-[560px] h-[460px] bg-cover md:bg-top flex items-end p-2 shrink-0 grow-0"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%), url(${imagem})`,
      }}
    >

      <div className="text-branco w-full relative">
        <h3 className="h3">{titulo}</h3>
        <p className="legibilidade">{descricao}</p>
      </div>
      
    </div>
  );
}
