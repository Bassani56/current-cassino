import './homepage.css'
import images from '../GlobalUtils/imageindex'

import ErrorBoundary from "../ErrorBoundary"
import PopUp from "../components/PopUp"
import BonusBar from "../components/BonusBar"
import NavigationBar from "../components/NavigationBar"
import SignInOverlay from '../components/SignInOverlay'
import SignUpOverlay from "../components/SignUpOverlay"
import Loginup from '../components/SignUpOverlay/Loginup'
import Box from "../components/Box"

import { useEffect, useState } from "react"
import { CurrentContext } from "../context/themeContext"
import { useNavigate } from "react-router-dom"

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
        <CurrentContext.Provider value={{showModelLogin, setShowModelLogin, showSpan, setShowSpan, showModelRegister, setShowModelRegister}}>
            <ErrorBoundary>
                <PopUp/>
                <BonusBar/>
                <SignUpOverlay/>
                <div>
                    <NavigationBar>
                        {/**Fazer botao de entrar */}
                        <button className="signin-button" onClick={() => {setShowModelRegister(true)}}>Entrar</button>
                        <button className="signup-button" onClick={() => {setShowModelRegister(true)}}>Criar Conta</button>
                    </NavigationBar>
                    <div className="centerdiv">
                        <h1>Bem vindos ao Bolazula</h1>
                        <div className='image-container'>
                            <img src={images.roulettehomepageimg} alt='nao carregou :('/>
                        </div>
                    </div>
                    <div className="boxdiv"  >
                        <Box
                            title='Cassino'
                            description='Aproveite seus últimos momentos com seu dinheiro, pois agora não o terá mais.'
                            button='Ir ao Cassino'
                            onButtonClick={() => {navigate("/RoulettePage")}}
                        ></Box>
                    </div>
                </div>          
            </ErrorBoundary>
        </CurrentContext.Provider>
    )
}