import './menuaposta.css'
import Register from '../home/modal/Register'
import { useContext, useEffect, useState } from 'react'
import { CurrentContext } from '../../context/themeContext'
import { fetchHistory } from '../../hook/server'
import CursorTime from '../time/CursorTempo'
export default function Aposta(){
    const[call, setCall] = useState(true)
     const{numberHistory, setNumberHistory, setShowModelRegister, value, setValue, setUpdateValueState, updateValueState, setColorState, colorState}  = useContext(CurrentContext)
    const[valorAposta, setValorAposta] = useState(0)

    const [activeButton, setActiveButton] = useState(null);

    const [inputValue, setInputValue] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(parseFloat(event.target.value));
    };

    const handleButtonClick = (color, index) => {
        setColorState(color);
        setActiveButton(index);
    };


    // function addHistory(){
    //     let number = inputValue
    //     alert(number)
    //     setNumberHistory(number)
    // }

    function handleStart(){
        let currentValue = parseFloat(document.getElementById('valor-atual').innerHTML)
        const valor_input = inputValue
        console.log('current: ', currentValue, 'aposta: ', typeof(valor_input), valor_input)
        if(colorState === null || inputValue > currentValue){
            alert('escolha a cor primeiro')
            return
        }

        setValue(prev => parseFloat(prev) + parseFloat(valor_input));

        document.getElementById('valor-atual').innerHTML -= valor_input
        // alert('aposta', )
    }

    // useEffect(()=>{
    //     console.log('value: ', value)
    //     console.log('COR ATUAAL É: ', colorState)
    // },[value])

    useEffect(()=>{  //atualiza o valor que o usuario tem em caixa - aparece o valor no menu
        async function startValue() {
            const data = await fetchHistory()
            let aux =  data[Object.keys(data).length-1]
            console.log('data retorno: ', aux.valor_atual)
            document.getElementById('valor-atual').innerText = 'R$' + JSON.stringify(data[Object.keys(data).length-1].valor_atual)
        }
        console.log("DEVE ATUALIZAR AQUI CACETE")
        startValue()
        setValue(0)
    },[updateValueState])


    function operacao(op) {
        if (op === 'div' && inputValue/2 >= 0.1) {
            setInputValue(prev => parseFloat((prev / 2).toFixed(2)));
        } else if(op === 'mul' && inputValue*2 < 1000000){
            setInputValue(prev => parseFloat((prev * 2).toFixed(2)));
        }
    }
    

    return(
        <div className="menu-aposta" >
            <div className="valor-aposta">
                <input 
                    id="quantia-apostar" 
                    placeholder='Quantia' 
                    type="text" 
                    value={inputValue}
                    onChange={handleInputChange} />
                <button id="divide" onClick={()=>{operacao('div')}}>1/2</button>
                <button id="multiplica" onClick={()=>{operacao('mul')}}>2x</button>
            </div>
            <h2>Selecionar Cor</h2>
            <div className="selecionar-cor">
            <button
        onClick={() => handleButtonClick('red', 1)}
        style={{ backgroundColor: 'red' }}
        className={`quadros-option ${activeButton === 1 ? 'active' : ''}`}
      >
        x2
      </button>
      <button
        onClick={() => handleButtonClick('white', 2)}
        style={{ backgroundColor: 'white', color: 'red' }}
        className={`quadros-option ${activeButton === 2 ? 'active' : ''}`}
      >
        x14
      </button>
      <button
        onClick={() => handleButtonClick('black', 3)}
        style={{ backgroundColor: 'black' }}
        className={`quadros-option ${activeButton === 3 ? 'active' : ''}`}
      >
        x2
      </button>
            </div>

            <button onClick={()=> { handleStart()}} className='comecar-jogo' disabled={!inputValue} >
                Começar jogo

            </button  >
            <Register/>
        </div>
    )
}