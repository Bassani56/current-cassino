import './menuaposta.css'
import Register from '../home/modal/Register'
import { useContext, useEffect, useState } from 'react'
import { CurrentContext } from '../../context/themeContext'
import { fetchHistory, setTransacoes } from '../../hook/server'
export default function Aposta(){
    const[call, setCall] = useState(true)
     const{numberHistory, setNumberHistory, setShowModelRegister, value, setValue, setUpdateValueState, updateValueState, setColorState, colorState}  = useContext(CurrentContext)
    const[valorAposta, setValorAposta] = useState(0)

    function addHistory(){
        let number = document.getElementById('quantia-apostar').value
        alert(number)
        setNumberHistory(number)
    }

    function handleStart(){
        if(colorState === null){
            alert('escolha a cor primeiro')
            return
        }

        const valor_input = document.getElementById('quantia-apostar').value
        console.log('VALOR APOSTADO AQUI EM: ', valor_input)
        setValue(valor_input)
    }

    useEffect(()=>{  //atualiza o valor que o usuario tem em caixa - aparece o valor no menu
        async function startValue() {
            const data = await fetchHistory()
            let aux =  data[Object.keys(data).length-1]
            console.log('data retorno: ', aux.valor_atual)
            document.getElementById('valor-atual').innerText = JSON.stringify(data[Object.keys(data).length-1].valor_atual)
        }
        console.log("DEVE ATUALIZAR AQUI CACETE")
        startValue()
        
    },[updateValueState])


    return(
        <div className="menu-aposta" >
            <div className="valor-aposta">
                <input id="quantia-apostar" placeholder='Quantia' type="text" />
                <button id="divide" >1/2</button>
                <button id="multiplica">2x</button>
            </div>
            <h2>Selecionar Cor</h2>
            <div className="selecionar-cor">
                <button onClick={()=>{setColorState('red')}} style={{backgroundColor: 'red'}} className="quadros-option">x2</button>
                <button onClick={()=>{setColorState('white')}} style={{backgroundColor: 'white', color: 'red'}} className="quadros-option">x14</button>
                <button onClick={()=>{setColorState('black')}} style={{backgroundColor: 'black'}} className="quadros-option">x2</button>
            </div>

            <button onClick={()=> { handleStart()}} className='comecar-jogo' >
                Começar jogo

            </button  >
            <Register/>
        </div>
    )
}