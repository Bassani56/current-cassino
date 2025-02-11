import './roulettepage.css'
import { useEffect, useState } from 'react';
import Aposta from '../components/aposta/MenuAposta';
import useSound from 'use-sound';
import { CurrentContext } from '../context/themeContext';
import { useNavigate } from 'react-router-dom';
import ComponentsHist from '../components/historico/ComponentsHist';
import Depositar from '../components/modal/Depositar';
import Transacoes from '../components/modal/Transações';

import NavigationBar from '../components/NavigationBar';
import CountDownTimer from '../components/CountDownTimer';
import Carousel from '../components/Carousel';
import CarouselHistory from '../components/CarouselHistory';

export default function RoulettePage(){

    const [showModelRegister, setShowModelRegister] = useState(false);
    const [listaDouble, setListaDouble] = useState([])
    const [numberHistory, setNumberHistory] = useState()
    const[girarCarousel, setGirarCarousel] = useState(false)

    // const [playSound, { stop }] = useSound(audio, {
    //     // Defina os tempos de início e fim (em segundos)
    //     playbackRate: 1,  // Ajusta a velocidade de reprodução, se necessário
    //     sprite: {
    //         shortClip: [5000, 40000], // Começa em 5 segundos e toca por 3 segundos (5000ms a 8000ms)
    //     },
    // });

    // useEffect(() => {
    //     playSound({ id: 'shortClip' }); // Reproduz o trecho definido no sprite
    //     return () => {
    //         stop(); // Para o áudio ao desmontar o componente
    //     };
    // }, [playSound, stop]);
    const[histDados, setHistDados] = useState([])
    const[refresh, setRefresh] = useState(false)
    const[associacoes, setAssociacoes] = useState([]);
    const[trava, setTrava] = useState(false)
    const[value, setValue] = useState(null)

    const[open, setOpen] = useState(false)
    const navigate = useNavigate()
    const[updateValueState, setUpdateValueState] = useState(false)
    const[apostouState, setApostouState] = useState(false)
    const[colorState, setColorState] = useState(null)
   
    return(
        <CurrentContext.Provider 
            value={{numberHistory, setNumberHistory, 
            showModelRegister, setShowModelRegister,
            histDados, setHistDados, listaDouble, setListaDouble,
            refresh, setRefresh, girarCarousel, setGirarCarousel,
            associacoes, setAssociacoes, trava, setTrava, value, setValue,
            setUpdateValueState, updateValueState, apostouState, setApostouState, 
            colorState, setColorState}}
        >
            <NavigationBar>
                <button id ='valor-atual' className='transaction-button' onClick={() => {setOpen(true)}} ></button>
                <button className='logout-button' onClick={()=> {navigate("/HomePage")}} >Logout</button>
            </NavigationBar>
            <Transacoes open={open} setOpen={setOpen}/>

            <div className='maindiv'>
                <div className='centergamediv'>
                    <CountDownTimer/>
                    
                    <div className='gamediv'>
                        <Aposta/>
                        <Carousel/>
                    </div>

                    <CarouselHistory/>
                </div>

                <div className="overlay-double">
                    <div className="historico-container">
                        <ComponentsHist/>
                    </div>
                </div>
            </div>
        </CurrentContext.Provider>
    )
}