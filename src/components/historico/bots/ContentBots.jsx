import { useContext, useEffect, useState } from "react";
import './bots.css'
import { CurrentContext } from "../../../context/themeContext";

let cont = 0

export default function ContentBots({apostas, nome}){
    const {trava, setAssociacoes, setTrava, associacoes ,girarCarousel, histDados, refresh, setRefresh} = useContext(CurrentContext)
    const [apostasLocal, setApostas] = useState([]);
    const [libera, setLibera] = useState(true)
    const [ganhou, setGanhou] = useState(false)
    useEffect(()=>{
        // console.log('associacoesRed: ', associacoes)
    },[associacoes])

    useEffect(() => {
        // console.log('trava: ', trava)
        if (trava) {
            return;
        }
        setApostas(apostas); // Limpa o estado apostas
            // console.log('deve resetar tudo agora', apostasLocal);
            // console.log("trava", trava);
        // console.log('apostas: ', apostas)
        
    }, [girarCarousel, apostas]);


    const obterNomeAssociado = (numeroAposta) => {
        for (const associacao of associacoes) {
            if (associacao.numeroWhite === numeroAposta) {
                return associacao.nomeWhite;
            }
            if (associacao.numeroBlack === numeroAposta) {
                return associacao.nomeBlack;
            }
            if (associacao.numeroRed === numeroAposta) {
                return associacao.nomeRed;
            }
        }
        return "Nome não encontrado"; // Caso não encontre o número
    };
    
    // Função para resetar a cor de fundo dos elementos
function resetColor(className) {
    const elementos = document.getElementsByClassName(className);

    // Itera por todos os elementos e muda a cor de fundo para a cor original
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].style.backgroundColor = 'rgb(20, 22, 32)';
    }
}

function victory(className){
    setGanhou(true)
    setTrava(true)
    const elementos = document.getElementsByClassName(className);

    // Itera por todos os elementos e muda a cor de fundo para vermelho
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].style.backgroundColor = 'green';
        // const valores = apostasLocal.slice(0, 8)
        // const novosValores = valores.map(item => item * 2);
        // setApostas(novosValores);
    }
    
    const timeoutId = setTimeout(() => {
        setLibera(false)
        reset()
        
    }, 6000); // 3 segundos de delay

    // Cleanup do timeout
    return () => clearTimeout(timeoutId);
}

function reset(){
    // console.log('deve resetar tudo agora', apostasLocal);
    
    setTrava(false)
    const timeoutId = setTimeout(() => {
        setLibera(true)
        
    }, 1300); // 3 segundos de delay

    // Cleanup do timeout
    return () => clearTimeout(timeoutId);
}

// Função para esperar um tempo antes de resetar a cor
function esperaTime(className) {
    
    const timeoutId = setTimeout(() => {
        resetColor(className);
        setLibera(false)
        reset()
    }, 6000); // 3 segundos de delay

    // Cleanup do timeout
    return () => clearTimeout(timeoutId);
}

// Função para mudar a cor dos elementos para vermelho
function setColor(className) {
    setTrava(true)
    setGanhou(false)
    const elementos = document.getElementsByClassName(className);

    // Itera por todos os elementos e muda a cor de fundo para vermelho
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].style.backgroundColor = 'red';
    
    }
}

// useEffect ajustado
useEffect(() => {

    if (nome === 'red') {
        if (histDados[0] > 7 && histDados[0] !== 20) {
            // console.log('vermelho perdeu');
            setColor('red');
            esperaTime('red');
        } else if (histDados[0] <= 7) {
            console.log('vitória do vermelho');
            victory(nome)
        } else {
            // console.log('vermelho perdeu');
            setColor('red');
            esperaTime('red');
        }
    } 
    else if (nome === 'white') {
        if (histDados[0] > 7 && histDados[0] !== 20) {
            // console.log('white perdeu');
            setColor('white');
            esperaTime('white');
        } else if (histDados[0] <= 7) {
            // console.log('white perdeu');
            setColor('white');
            esperaTime('white');
        } else {
            console.log('vitória do white');
            victory(nome)
        }
    }
    else if (nome === 'black') {
        if (histDados[0] > 7 && histDados[0] !== 20) {
            console.log('vitória do black');
            victory(nome)
        } else if (histDados[0] <= 7) {
            // console.log('black perdeu');
            setColor('black');
            esperaTime('black');
        } else {
            // console.log('black perdeu');
            setColor('black');
            esperaTime('black');
        }
    }
}, [histDados]);

    return(
        <div className="container-apostas" >
            { libera &&
                apostasLocal.map((item, index) => (
                    <div key={index}>
                        <div className={`bot-hist ${nome}`}>
                           <div className="nomes-user">
                            {obterNomeAssociado(item)}
                            </div> 
                            
                            <h3> {!ganhou ? `R${item}` : `R${item * 2}`}</h3>
                        </div>
                    </div>
                ))
            }     
        </div>
    )
}