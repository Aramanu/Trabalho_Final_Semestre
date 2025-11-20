import Cabecalho from "../components/Cabecalho";
import RodaPe from "../components/RodaPe";
import Listagem from "../components/Listagem";
import { FaTruckPickup } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { FaWhatsapp } from "react-icons/fa";
import CardHome from "../components/cards/CardHome";
import SequenciaDeCardsCatalogo from "../components/cards/SequenciaDeCardsCatalogo";

export default function Home() {
  return (
    <>
      <Cabecalho />

      <section>
        <img src="fundo1.png" alt="" className="w-full h-96 object-cover" />
        <div className="bg-cinza flex md:p-6 py-6 items-center justify-center">
          <ul className="md:flex grid grid-cols-2 place-items-center gap-16">
            <li>
              <Listagem
                className="flex-col md:legibilidade w-[130px] text-center detalhes"
                icon={<FaTruckPickup />}
                texto="Frete Grátis acima de R$399"
                iconClassName="text-2xl"
              />
            </li>
            <li>
              <Listagem
                className="flex-col md:legibilidade w-[184px] text-center detalhes"
                icon={<FaRegCreditCard />}
                texto="Parcelamento em até 10x sem juros"
                iconClassName="text-2xl"
              />
            </li>
            <li>
              <Listagem
                className="flex-col md:legibilidade w-[212px] text-center detalhes"
                icon={<TfiReload />}
                texto="até 2 trocas grátis. VER POLÍTICA DE TROCAS"
                iconClassName="text-2xl"
              />
            </li>
            <li>
              <Listagem
                className="flex-col md:legibilidade w-[200px] text-center detalhes"
                icon={<FaWhatsapp />}
                texto="DÚVIDAS NA COMPRA? (99) 99999-9999"
                iconClassName="text-2xl"
              />
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-2 mx-2 gap-12 flex flex-col md:flex-row md:justify-center">
        <CardHome
          imagem="pogba.jpg"
          titulo="Artigos de Futebol"
          descricao="Conheça nosso catálogo de artigos de futebol"
        />
        <CardHome
          imagem="public/corredora.png"
          titulo="Itens para corrida"
          descricao="Comece a correr com o que nós temos a oferecer de melhor."
        />
      </section>

      <SequenciaDeCardsCatalogo />

      <RodaPe />
    </>
  );
}
