import './homepage.css'
import images from '../components/imageindex'
import Register from "../components/home/modal/Register"
import NavigationBar from "../components/home/NavigationBar"
import ErrorBoundary from "../ErrorBoundary"
import { useEffect, useState } from "react"
import { CurrentContext } from "../context/themeContext"
import BonusBar from "../components/home/BonusBar"
import Span from "../components/home/modal/spans/Spans"
import { useNavigate } from "react-router-dom"
import Box from "../components/home/Box"

export default function HomePage(){
    const [showModelRegister, setShowModelRegister] = useState(false);
    const [showSpan, setShowSpan] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        // Define o temporizador
        const timer = setTimeout(() => {
            setShowSpan(true)
        }, 2200); // 3000 milissegundos = 3 segundos

        // Limpeza do temporizador
        return () => clearTimeout(timer);
    }, []);

    return(
        <CurrentContext.Provider value={{showSpan, setShowSpan, showModelRegister, setShowModelRegister}}>
            <ErrorBoundary>
                <Span/>
                <BonusBar/>
                <div>
                    <NavigationBar>
                        {/**Fazer botao de entrar */}
                        <button className="signin-button" onClick={() => {setShowModelRegister(true)}}>Entrar</button>
                        <button className="signup-button" onClick={() => {setShowModelRegister(true)}}>Criar Conta</button>
                    </NavigationBar>
                    <Register/>
                    <div className="centerdiv">
                        <h1>Bem vindos ao Bolazula</h1>
                        <div className='image-container'>
                            <img src={images.homepageimg} alt='nao carregou :('/>
                        </div>
                    </div>
                    <div className="boxdiv"  >
                        <Box
                            title='Cassino'
                            description='Aproveite seus últimos momentos com seu dinheiro, pois agora não os terá mais.'
                            button='Ir ao Cassino'
                            onButtonClick={() => {navigate("/dashboard")}}
                        >    
                        </Box>
                        <Box
                            title='Sobre Nós'
                            description='Lorem icorporis repellat harum vero, adipisci quam ipsum! Rerum, nesciunt ducimus!'
                            button='Clica em mim >///<'
                            onButtonClick={() => {navigate("/dashboard")}} /*MUDAR*/
                        >
                        </Box>
                    </div>
                </div>
            </ErrorBoundary>
        </CurrentContext.Provider>
    )
}