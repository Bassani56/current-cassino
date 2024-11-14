import './menuaposta.css'
import { useContext, useEffect, useState } from 'react'
import { CurrentContext } from '../../context/themeContext'
import { fetchHistory } from '../../hook/server'

export default function Aposta(){
    const[call, setCall] = useState(true)
    const{numberHistory, setNumberHistory, value, setValue, setUpdateValueState, updateValueState}  = useContext(CurrentContext)

    const {colorState, setColorState} = useContext(CurrentContext)
    const [activeButton, setActiveButton] = useState(null);
    const [inputValue, setInputValue] = useState(null);

    const handleInputChange = (event) => {
        if(event.target.value < 1000000){
            setInputValue(parseFloat(event.target.value));
        }else{
            setInputValue(1000000);
        }
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
        resetStartButtonText();
    },[updateValueState])
    
    /*
    function operacao(op) {
        if (op === 'div' && inputValue/2 >= 0.1) {
            setInputValue(prev => parseFloat((prev / 2).toFixed(2)));
        } else if(op === 'mul' && inputValue*2 < 1000000){
            setInputValue(prev => parseFloat((prev * 2).toFixed(2)));
        }
    }*/
    
    /** Para conseguir usar o toLocaleString mesmo iniciando inputValue como null */
    function toLocaleStringNullFix(x){
        if(x != null){
            return x.toLocaleString('pt-BR');
        }else{
            return null
        }
    }
    /** Divisão e Multiplicação */
    function div(){
        if (inputValue / 2 >= 1) {
            setInputValue(prev => prev / 2);
        } 
    }

    function mult(){
        if(inputValue * 2 < 1000000){ // 1 Milhão
            setInputValue(prev => prev * 2);
        }
    }
    /** Mudar botão de start pra ficar bonitin */
    function changeStartButtonText() {
        const buttonText = document.getElementById("betbutton");
        buttonText.textContent = 'Valor jogado: ' + inputValue;
    }
    
    function resetStartButtonText() {
        const buttonText = document.getElementById("betbutton");
        buttonText.textContent = 'Jogar';
    }

    /** Para fazer os botões funcionarem bem, ficarem maiores e tal */
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const colorbuttondiv = [
        { index: 0, text: 'x2', color: 'rgb(241, 44, 76)', colorPattern: 'red' },
        { index: 1, text: 'x14', color: 'white', colorPattern: 'white' },
        { index: 2, text: 'x2', color: 'rgb(15, 25, 35)', colorPattern: 'black' }
    ];
    
    return(
        <div className="menu-aposta" >
            <div className='inputdiv'>
                <input
                    type="number"
                    placeholder='Quantia'
                    value={toLocaleStringNullFix(inputValue)}
                    onChange={handleInputChange}
                />
            </div>
            <div className='mathbuttondiv'>
                <button onClick={()=>{div()}}>1/2</button>
                <button onClick={()=>{mult()}}>2x</button>
            </div>
        
            <div className='colorbuttondiv'>
                {colorbuttondiv.map((colorbuttondiv, colorbuttonindex) => (
                    <button
                        key={colorbuttonindex}
                        onMouseEnter={() => setHoveredIndex(colorbuttonindex)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => handleButtonClick(colorbuttondiv.colorPattern, colorbuttondiv.index)}
                        style={{
                            backgroundColor: colorbuttondiv.color,
                            color: colorbuttondiv.index === 2 ? 'white' : 'black',
                            transform: (activeButton === colorbuttonindex || hoveredIndex === colorbuttonindex) ? 'scale(1.2)' : 'scale(1)',
                            transition: 'transform 0.3s'
                        }}
                    >
                        {colorbuttondiv.text}
                    </button>
                ))}
            </div>

            <div className='startdiv'>
                <button id='betbutton' onClick={()=> { handleStart(); changeStartButtonText() }} disabled={!inputValue}>
                    Jogar
                </button>
            </div>
        </div>
    )
}