import './dash.css'
import Carousel from '../components/carousel/Carousel'
import { useEffect, useState } from 'react';
import Header from '../components/home/Header';
import Aposta from '../components/aposta/MenuAposta';
import useSound from 'use-sound';
import audio from '../components/audio/audio-bolso.mp3'
import Register from '../components/home/modal/Register';
import { CurrentContext } from '../context/themeContext';
import { useNavigate } from 'react-router-dom';
import CarouselHist from '../components/carouselHist/CarouselHist';
import ComponentsHist from '../components/historico/ComponentsHist';
import CursorTime from '../components/time/CursorTempo';
import Depositar from '../components/modal/Depositar';
import Transacoes from '../components/modal/Transações';

export default function Dashboards(){

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
            <div className='dashboard' >
                <Header>
                    <div id='valor-atual' className='value'>R$-dinheiro</div>
                    <button className='depositar' onClick={() => {setOpen(true)}} >Transações</button>
                    <button className='logout' onClick={()=>{navigate("/")}} >Logout</button>
                </Header>

                <Transacoes open={open} setOpen={setOpen}/>

                <div className="overlay-double" >
                    {/* <h1>Bem vindos ao <strong>Bolazula</strong></h1> */}
                    <div className='content-double'>
                        <div className='left'>
                            <Aposta/>

                        </div>
                        <div className='right'>
                            <div className='up'>
                                <div className='container-tempo' >
                                    <div className='espera' >
                                        <CursorTime/>
                                    </div>
                                </div>
                                <Carousel/>
                                <div className='traco'></div>
                            </div>
                            <div className='down'>
                                <h3>Giros anteriores</h3>
                                <CarouselHist/>
                                    
                            </div>
                        </div>
                    </div>
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