import Cabecalho from "../components/Cabecalho";
import RodaPe from "../components/RodaPe";

export default function Home() {
  return (
    <>
      <Cabecalho />
      <div className="pt-20 px-4">
        <h1 className="text-4xl font-bold text-black p-8">Home</h1>
      </div>
      <RodaPe />
    </>
  );
}
