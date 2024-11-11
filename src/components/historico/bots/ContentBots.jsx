import { Children, useContext, useEffect, useState } from "react";
import './bots.css'
import { CurrentContext } from "../../../context/themeContext";
import { setTransacoes } from "../../../hook/server";

let cont = 0

export default function ContentBots({apostas, nome, valorApostado, corApostada}){
    const {trava, setAssociacoes, associacoes ,girarCarousel, histDados, refresh, setRefresh, colorState, setColorState, value, updateValueState, setUpdateValueState} = useContext(CurrentContext)
    const [apostasLocal, setApostas] = useState([]);
    const [libera, setLibera] = useState(true)
    const [ganhou, setGanhou] = useState(3)
    useEffect(()=>{
        // console.log('associacoesRed: ', associacoes)
    },[associacoes])

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

    useEffect(()=>{
        if(!trava){
            resetColor(nome)
            setApostas([])
            setApostas(apostas);
            setGanhou(3)
        }
    },[trava, apostas])

function victory(className){
    setGanhou(1)
    const elementos = document.getElementsByClassName(className);

    // Itera por todos os elementos e muda a cor de fundo para vermelho
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].style.backgroundColor = 'green';
        // const valores = apostasLocal.slice(0, 8)
        // const novosValores = valores.map(item => item * 2);
        // setApostas(novosValores);
    }

    if(colorState === className){
        setGanhosAposta('ganhou')
    }
    
    // const timeoutId = setTimeout(() => {
    //     setLibera(false)
    //     reset()
        
    // }, 6000); // 3 segundos de delay

    // // Cleanup do timeout
    // return () => clearTimeout(timeoutId);
}

function reset(){
    // console.log('deve resetar tudo agora', apostasLocal);
    
    // setTrava(false)
    const timeoutId = setTimeout(() => {
        setLibera(true)
        
    }, 1300); // 3 segundos de delay

    // Cleanup do timeout
    return () => clearTimeout(timeoutId);
}

async function setGanhosAposta(result) {
    if(value > 0){
        await setTransacoes(value, result)
    }
    setUpdateValueState(!updateValueState)
}

// Função para mudar a cor dos elementos para vermelho
function setColor(className) {
    setGanhou(2)
    const elementos = document.getElementsByClassName(className);

    if(colorState === className){
        setGanhosAposta('perdeu')
    }

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
            // esperaTime('red');
        } else if (histDados[0] <= 7) {
            // console.log('vitória do vermelho');
            victory(nome)
        } else {
            // console.log('vermelho perdeu');
            setColor('red');
            // esperaTime('red');
        }
    } 
    else if (nome === 'white') {
        if (histDados[0] > 7 && histDados[0] !== 20) {
            // console.log('white perdeu');
            setColor('white');
            // esperaTime('white');
        } else if (histDados[0] <= 7) {
            // console.log('white perdeu');
            setColor('white');
            // esperaTime('white');
        } else {
            // console.log('vitória do white');
            victory(nome)
        }
    }
    else if (nome === 'black') {
        if (histDados[0] > 7 && histDados[0] !== 20) {
            // console.log('vitória do black');
            victory(nome)
        } else if (histDados[0] <= 7) {
            // console.log('black perdeu');
            setColor('black');
            // esperaTime('black');
        } else {
            // console.log('black perdeu');
            setColor('black');
            // esperaTime('black');
        }
    }
}, [histDados]);

    return(
        <div className="container-apostas" >
            { corApostada === nome && valorApostado > 0 && (
                <>
                    
                    <div className="nomes-usuario"> USER {ganhou === 2 ? `$ ${valorApostado}` : ganhou === 1 ? `R$ ${valorApostado * 2}` : `$ ${valorApostado}`}</div>
                </>
            )
            }
            { libera &&
                apostasLocal.map((item, index) => (
                    <div key={index}>
                        <div className={`bot-hist ${nome}`}>
                           <div className="nomes-user">
                            {obterNomeAssociado(item)}
                            </div> 
                            
                            <h3>{ganhou === 2 ? `$ ${item}` : ganhou === 1 ? `R$ ${item * 2}` : `$ ${item}`}</h3>

                        </div>
                    </div>
                ))
            }     
        </div>
    )
}