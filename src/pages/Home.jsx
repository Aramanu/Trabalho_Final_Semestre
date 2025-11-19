import Cabecalho from "../components/Cabecalho";
import RodaPe from "../components/RodaPe";
import Listagem from "../components/Listagem";
import { FaTruckPickup } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Cabecalho />
        <img src="fundo1.png" alt="" className="w-full"/>
        <div className="bg-cinza flex h-40 justify-around items-center">
          <ul className="grid md:grid-cols-4 grid-cols-2">
            <li><Listagem className="flex-col legibilidade w-[130px]" icon={<FaTruckPickup />} texto="Frete Grátis acima de R$399" iconClassName="text-"/></li>
            <li><Listagem className="flex-col legibilidade w-[184px]" icon={<FaRegCreditCard />} texto="Parcelamento em até 10x sem juros" /></li>
            <li><Listagem className="flex-col legibilidade w-[212px]" icon={<TfiReload />} texto="até 2 trocas grátis. VER POLÍTICA DE TROCAS" /></li>
            <li><Listagem className="flex-col legibilidade w-[200px]" icon={<FaWhatsapp />} texto="DÚVIDAS NA COMPRA? (48) 98852.9200" /></li>
          </ul>
        </div>
      <RodaPe />
    </>
  );
}
