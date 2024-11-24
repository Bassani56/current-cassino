import './menuaposta.css'
import { useContext, useEffect, useState } from 'react'
import { CurrentContext } from '../../context/themeContext'
import { fetchHistory } from '../../hook/server'

export default function Aposta(){
    const[call, setCall] = useState(true)
    const{numberHistory, girarCarousel, setNumberHistory, value, setValue, setUpdateValueState, updateValueState}  = useContext(CurrentContext)

    const {colorState, setColorState} = useContext(CurrentContext)
    const [activeButton, setActiveButton] = useState(null);
    const [inputValue, setInputValue] = useState(''); // Começar como string

    const handleInputChange = (event) => {
        let rawValue = event.target.value;
    
        // Substitui vírgula por ponto para facilitar a manipulação como número decimal
        rawValue = rawValue.replace(',', '.');
    
        // Permitir apenas números e um único ponto decimal, e limitar a duas casas decimais
        if (/^[0-9]*\.?[0-9]{0,2}$/.test(rawValue)) {
            // Se o valor for numérico e dentro do limite
            if (rawValue !== '' && !isNaN(parseFloat(rawValue)) && parseFloat(rawValue) <= 1000000) {
                setInputValue(rawValue); // Atualiza com o valor válido
            } else if (rawValue === '') {
                setInputValue(''); // Reseta o campo se o valor não for numérico ou vazio
            }
        }
    };
    
    const handleInputBlur = () => {
        if (inputValue !== '') {
            // Converte para número, limita a duas casas decimais e aplica formatação
            let numericValue = parseFloat(inputValue);
            
            // Limita o valor máximo a 1.000.000
            if (numericValue > 1000000) {
                numericValue = 1000000;
            }
            
            const formattedValue = numericValue.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            setInputValue(formattedValue); // Deixa como string formatada
        }
    };
    
    const handleInputFocus = () => {
        // Remove a formatação ao focar para permitir edição fácil
        if (inputValue !== '') {
            setInputValue(inputValue.replace(/\./g, '').replace(',', '.'));
        }
    };
    
    const handleButtonClick = (color, index) => {
        setColorState(color);
        setActiveButton(index);
    };

    function handleStart() {
        
        // Obtém o valor atual do 'valor-atual' (remover "R$")
        let currentValue = document.getElementById('valor-atual').innerHTML;
        console.log('Valor atual (raw):', currentValue);
        
        // Remove "R$" e qualquer outro caractere não numérico
        currentValue = currentValue.replace(/[^\d.-]/g, '');
        
        // Converte para número
        currentValue = parseFloat(currentValue);
        const valor_input = parseFloat(inputValue); // O valor da aposta que o usuário inseriu
        console.log('Valor atual (convertido):', currentValue);
        console.log('Aposta: ', valor_input);
    
        // Validação para verificar se a cor foi selecionada e se o valor da aposta é válido
        if (colorState === null || valor_input > currentValue) {
            alert('Escolha a cor primeiro ou o valor da aposta é maior que o valor disponível.');
            return;
        }
    
        // Atualiza o valor da aposta
        setValue(prev => prev + valor_input);
    
        // Subtrai o valor da aposta do valor atual
        let newValue = currentValue - valor_input;
    
        // Atualiza o valor do 'valor-atual' no HTML, com o novo valor formatado
        document.getElementById('valor-atual').innerHTML = 'R$' + newValue.toFixed(2);
    }

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
    
    /** Para conseguir usar o toLocaleString mesmo iniciando inputValue como null */
    function toLocaleStringNullFix(x){
        if(x != null){
            return x.toLocaleString('pt-BR');
        }else{
            return null
        }
    }
    /** Divisão e Multiplicação */
    function div() {
        let valorInputNumerico = parseFloat(inputValue);
        if (valorInputNumerico / 2 >= 0.10) {
            setInputValue((valorInputNumerico / 2).toFixed(2)); // Manter duas casas decimais como string
        } 
    }
    
    function mult(){
        let valorInputNumerico = parseFloat(inputValue);
        if(valorInputNumerico * 2 < 1000000){ // 1 Milhão
            setInputValue((valorInputNumerico * 2).toFixed(2)); // Manter duas casas decimais como string
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
                type="text"
                placeholder="Quantia"
                value={inputValue || ''}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
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
                <button id='betbutton' onClick={()=> { 
                    // if(girarCarousel){
                    //     return
                    // }  
                     handleStart(); 
                     changeStartButtonText() 
                }} disabled={!inputValue || girarCarousel}>
                    Jogar
                </button>
            </div>
        </div>
    )
}
