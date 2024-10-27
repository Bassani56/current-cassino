// import Header from "../components/home/Header"
import BoasVindas from "../components/BoasVindas"
import './menu.css'
import Register from "../components/home/modal/Register"
import Header from "../components/home/Header"
import ErrorBoundary from "../ErrorBoundary"
import { useEffect, useState } from "react"
import { CurrentContext } from "../context/themeContext"
import Bonus from "../components/home/Bonus"
import  logo from '../components/img/bolso-lula.jpg'
import Span from "../components/home/modal/spans/Spans"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"
export default function MenuRegistro(){
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
        <CurrentContext.Provider value={{showSpan, setShowSpan, showModelRegister, setShowModelRegister }}>
            <ErrorBoundary>
                <Bonus/>
                    <Header>
                        <button id="button-entrar">Entrar</button>
                        <button id="button-cadastrar" onClick={() => {setShowModelRegister(true)}}>Cadastre-se</button>
                    </Header> 
                    
                <div className="app-dash" >
                    <Span />
                    <div className="sub-app-dash">
                        <h1>Bem vindos ao <strong>Bolazula</strong></h1>
                         
                        <BoasVindas> 
                            <img src={logo}/>
                            
                        </BoasVindas>
                        <div className="sub-context"  >
                            <div className="square-context" >
                                <h2>Cassino</h2>
                                <h4>Aproveite seus últimos momentos com seu dinheiro, pois agora não os terá mais.</h4>
                                <button  onClick={() => {navigate("/dashboard")}} className="button-go-cassino"><h4>Ir ao Cassino</h4></button>
                            </div>
                            <div className="square-context">DIV2</div>
                        </div>
                        <Register/> 
                    </div>
                </div>
            </ErrorBoundary>
        </CurrentContext.Provider>
        

    )
}