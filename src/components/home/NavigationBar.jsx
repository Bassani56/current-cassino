
import './navigationbar.css'
import images from '../../styles/imageindex';
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
                    <div className='logodiv'>
                        <a href="/" onClick={handleHomePageClick}><img src={images.navbarlogoimg} alt="nao carregou"/></a>
                    </div>
                    <div className='titlediv'>
                        <a href="/" onClick={handleHomePageClick}>Bolazula</a>
                    </div>
                    <ul className='navbar'>
                        {/**Fazer paginas (acho interessante ter isso) */}
                        <li><a href="#">Página Inicial</a></li>
                        <li><a href="#">Jogos</a></li>
                        <li><a href="#">Sobre Nós</a></li>
                    </ul>
                </div>
                <div className='rightbuttons'>{children}</div>
            </div>
        </header>
    )
}