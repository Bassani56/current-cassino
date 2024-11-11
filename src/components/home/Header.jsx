
import './header.css'

export default function Header({children}){
    return(
        <header>
            <nav>
                <div className="navdiv">
                    <div className='homediv'>
                        <div className='titlediv'>
                            <a href="#">Bolazula</a> {/**Fazer voltar pra home quando clicar */}
                        </div>
                        <ul className='navbar'>
                            {/**Fazer paginas (acho interessante ter isso) */}
                            <li className='options'><a href="#">Página Inicial</a></li>
                            <li className='options'><a href="#">Jogos</a></li>
                            <li className='options'><a href="#">Sobre Nós</a></li>
                        </ul>
                    </div>
                    {children}
                </div>
            </nav>
        </header>
    )
}