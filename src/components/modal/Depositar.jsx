import { useContext, useEffect, useRef, useState } from 'react'
import './depositar.css'
import { fetchHistory, setTransacoes, getLastTransaction } from '../../hook/server';
import { CurrentContext } from '../../context/themeContext';

export default function Depositar({open, setOpen}){
    const{value, setValue, setUpdateValueState, updateValueState} = useContext(CurrentContext)
    const inputRef = useRef(null);

    async function deposit(e){
        e.preventDefault();
        try {
            const account = await setTransacoes(value, 'deposito')
            // setValue(account)
            console.log('account: ', account)
            updateValor()
        } catch (error) {
            console.error(error)
        }
    }

    async function updateValor(){
        try {
            const data = await fetchHistory()
            let aux =  data[Object.keys(data).length-1]
            console.log('<<<   data retorno updateValor  >>> : ', data)
            document.getElementById('valor-atual').innerText = JSON.stringify(data[Object.keys(data).length-1].valor_atual)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        if(value !== null && inputRef.current){
            inputRef.current.value = JSON.stringify(value);
            
        }
        
    },[value])

    if(!open){
        return
    }

    return(
        <div className="container-modal-deposito">
            <span style={{color: "white"}}  className=''>VALORES DEPÓSITO</span>
           
            <div className='valores-pix'>
                <button onClick={() => setValue(120)} className='pix-button'>120 BRL</button>
                <button onClick={() => setValue(240)} className='pix-button'>240 BRL</button>
                <button onClick={() => setValue(600)} className='pix-button'>600 BRL</button>
            </div>

            <input ref={inputRef} type="text" placeholder='Quantia(BRL)' />
            <button onClick={(e)=>{deposit(e)}} className='deposit-start'>DEPOSITAR</button>
            
            <button onClick={() => setOpen(false)} >X</button>
            {/* <form 
                onSubmit={handleSignUp} 
                className="form-deposito" 
                action="submit"
            >
                <input id='depositar' required type="text" placeholder="Digite o valor" />
                <button  type="submit" >Depositar</button>
            </form>

            <button onClick={()=>{setOpen(!open)}} >X</button> */}
        </div>
    )
}