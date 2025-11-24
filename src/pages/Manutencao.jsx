import Cabecalho from "../components/Cabecalho";
import RodaPe from "../components/RodaPe";

export default function Manutencao() {
  return (
    <>
      <Cabecalho />

     <div className="min-h-screen flex flex-col">
        <div className="mx-auto grow flex flex-col">
          <div className="grow flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-gray-600 mb-4">
                Site em Manutenção
              </h2>
              <img src="/edecio.png" alt="Manutenção" />
              <p className="text-gray-500 mt-4">
                Esta funcionalidade está temporariamente indisponível.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RodaPe />
    </>
  );
}