import { useContext, useEffect, useRef } from 'react';
import './depositar.css';
import { fetchHistory, setTransacoes } from '../../hook/server';
import { CurrentContext } from '../../context/themeContext';

export default function Depositar({ open, setOpen }) {
    const { value, setValue, setUpdateValueState, updateValueState, setColorState } = useContext(CurrentContext);
    const inputRef = useRef(null);

    async function deposit(e) {
        e.preventDefault();
        try {
            const amount = parseFloat(inputRef.current.value);
            setColorState(null)
            await setTransacoes(amount, 'deposito');
            setValue(amount);  // Atualiza `value` com o valor depositado
            updateValor();
            setOpen(false);  // Fecha o modal após o depósito
        } catch (error) {
            console.error(error);
        }
    }

    async function updateValor() {
        try {
            const data = await fetchHistory();
            const lastTransaction = data[Object.keys(data).length - 1];
            console.log('<<<   data retorno updateValor  >>> : ', data);
            document.getElementById('valor-atual').innerText = 'R$' + JSON.stringify(lastTransaction.saldo);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (value !== null && inputRef.current) {
            inputRef.current.value = value;  // Exibe `value` atual no campo de entrada
        }
    }, [value]);

    if (!open) {
        return null;
    }

    return (
        <div className="saquediv">
            <button className='depositoclosebutton' onClick={() => { setOpen(false) }}>
                &times;
            </button >
            <div className='depositodiv'>
                <span className='depositotitle' style={{ color: "white" }}>VALORES DEPÓSITO</span>
            
                <div className="valoresdiv">
                    <button onClick={() => setValue(120)} className="valoresbutton">120 BRL</button>
                    <button onClick={() => setValue(240)} className="valoresbutton">240 BRL</button>
                    <button onClick={() => setValue(600)} className="valoresbutton">600 BRL</button>
                </div>

                <input 
                    className='valorinput'
                    ref={inputRef} 
                    onInput={(e) => setValue(e.target.value)} 
                    type="text" 
                    placeholder="Quantia(BRL)" 
                />
                <button onClick={deposit} className="depositoconfirmbutton">DEPOSITAR</button>
            </div>
        </div>
    );
}
