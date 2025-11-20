import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Listagem from "./Listagem";

export default function RodaPe() {
  return (
    <div className="flex flex-col gap-11 mt-15">

    <h5 className="h5 text-center">#ParaTodosOsEsportes</h5>
    <footer className="bg-azul py-6 px-4 md:h-36 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      
      <div className="flex flex-col items-center md:items-start order-1 md:order-1">
        <ul className="flex flex-col items-center md:items-start">
          <Listagem icon={<FaFacebook />} texto="facebook" />
          <Listagem icon={<RiInstagramFill />} texto="instagram" />
          <Listagem icon={<IoLogoLinkedin />} texto="linkedin" />
        </ul>
      </div>

      <p className="detalhes text-branco text-center order-3 md:order-2">
        &copy; 2025 EAI. Todos os direitos reservados.
      </p>

      <div className="flex flex-col items-center md:items-start order-2 md:order-3">
        <ul className="space-y-2 flex flex-col items-center md:items-start">
          <Listagem icon={<FaPhoneAlt />} texto="(99) 99999-9999" />
          <Listagem icon={<SiGmail />} texto="eai@gmail.com" />
        </ul>
      </div>
    </footer>
    </div>
  );
}
