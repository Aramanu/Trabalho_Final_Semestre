import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";

export default function RodaPe() {
    return (
        <footer className="">
            <div>
                <ul>
                    <li><a href=""><FaFacebook /></a></li>
                    <li><a href=""><RiInstagramFill /></a></li>
                    <li><a href=""><IoLogoLinkedin /></a></li>
                </ul>
            </div>
        </footer>
    );
}