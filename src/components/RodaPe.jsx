import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Listagem from "./Listagem";

export default function RodaPe() {
    return (
        <footer className="bg-azul h-36 flex justify-around items-center">

            <div>
                <ul className="">
                    <Listagem icon={<FaFacebook />} texto="facebook" />
                    <Listagem icon={<RiInstagramFill />} texto="instagram" />
                    <Listagem icon={<IoLogoLinkedin />} texto="linkedin" />
                </ul>
            </div>
            <p className="detalhes text-branco">&copy; 2025 EAI. Todos os direitos reservados.</p>
            <div>
                <ul>
                    <Listagem icon={<FaPhoneAlt />} texto="(99) 99999-9999" />
                    <Listagem icon={<SiGmail />} texto="eai@gmail.com" />
                </ul>
            </div>
        </footer>
    );
}