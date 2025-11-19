export default function Listagem({ icon, texto, className, iconClassName }) {
    return (
       <li>
            <a href="" className={`flex items-center gap-2 detalhes text-white ${className}`}>
                <span className={iconClassName}>{icon}</span>
                {texto}
            </a>
        </li>
    );
}