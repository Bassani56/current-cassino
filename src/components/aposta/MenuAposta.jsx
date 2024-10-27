import './menuaposta.css'
import Register from '../home/modal/Register'
import { useContext, useState } from 'react'
import { CurrentContext } from '../../context/themeContext'
export default function Aposta(){
    const[call, setCall] = useState(true)
     const{numberHistory, setNumberHistory, setShowModelRegister}  = useContext(CurrentContext)

    function addHistory(){
        let number = document.getElementById('quantia-apostar').value
        alert(number)
        setNumberHistory(number)
    }

    return(
        <div className="menu-aposta" >
            <div className="valor-aposta">
                <input id="quantia-apostar" defaultValue={'Quantia'} style={{backgroundColor: 'black'}} type="text" />
                <button id="divide" >1/2</button>
                <button id="multiplica">2x</button>
            </div>
            <h2>Selecionar Cor</h2>
            <div className="selecionar-cor">
                <button style={{backgroundColor: 'red'}} className="quadros-option">x2</button>
                <button style={{backgroundColor: 'white', color: 'red'}} className="quadros-option">x14</button>
                <button style={{backgroundColor: 'black'}} className="quadros-option">x2</button>
            </div>

            <button onClick={()=> {addHistory()}} className='comecar-jogo' >
                Começar jogo

            </button  >
            <Register/>
        </div>
    )
}