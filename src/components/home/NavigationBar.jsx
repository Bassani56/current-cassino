
import './navigationbar.css'
import { useNavigate } from 'react-router-dom';

export default function NavigationBar({children}){
    const navigate = useNavigate()

    const handleHomePageClick = (e) => {
        e.preventDefault();
        navigate('/');
    };
    
    return(
        <header>
            <div className="navdiv">
                <div className='homediv'>
                    <div className='titlediv'>
                        <a href="/" onClick={handleHomePageClick}>Bolazula</a> {/**Fazer voltar pra home quando clicar */}
                    </div>
                    <ul className='navbar'>
                        {/**Fazer paginas (acho interessante ter isso) */}
                        <li className='options'><a href="#">Página Inicial</a></li>
                        <li className='options'><a href="#">Jogos</a></li>
                        <li className='options'><a href="#">Sobre Nós</a></li>
                    </ul>
                </div>
                <div className='rightbuttons'>{children}</div>
            </div>
        </header>
    )
}