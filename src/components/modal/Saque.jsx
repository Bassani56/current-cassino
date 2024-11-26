import { useContext, useEffect, useRef } from 'react';
import { fetchHistory, setTransacoes } from '../../hook/server';
import { CurrentContext } from '../../context/themeContext';

export default function Saque({ open, setOpen }) {
    const { value, setValue, setColorState } = useContext(CurrentContext);
    const inputRef = useRef(null);

    async function Sacar(e) {
        e.preventDefault();
        const amount = parseFloat(inputRef.current.value);
        
        if (isNaN(amount) || amount < 60) {
            alert("O valor mínimo para saque é 60 BRL");
            return;
        }

        try {
            const saldoAtual = parseFloat(document.getElementById('valor-atual').innerText);
            if (amount > saldoAtual) {
                alert("Saldo insuficiente para realizar o saque");
                return;
            }
            setColorState(null)
            await setTransacoes(amount, 'saque');
            setValue(amount);
            updateValor();
            setOpen(false); // Fecha o modal após o saque
        } catch (error) {
            console.error(error);
        }
    }

    async function updateValor() {
        try {
            const data = await fetchHistory();
            const lastTransaction = data[Object.keys(data).length - 1];
            document.getElementById('valor-atual').innerText = 'R$' + JSON.stringify(lastTransaction.saldo);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (value !== null && inputRef.current) {
            inputRef.current.value = value;  // Exibe o valor atual no campo de entrada
        }
    }, [value]);

    if (!open) {
        return null;
    }

    return (
        <div className="container-modal-deposito">
            <span style={{ color: "white" }}>VALORES DE SAQUE</span>
           
            <div className="valores-pix">
                <button onClick={() => setValue(100)} className="pix-button">100 BRL</button>
                <button onClick={() => setValue(200)} className="pix-button">200 BRL</button>
                <button onClick={() => setValue(400)} className="pix-button">400 BRL</button>
            </div>

            <input 
                ref={inputRef} 
                type="text" 
                placeholder="Mínimo 60 BRL" 
                onInput={(e) => setValue(e.target.value)}
            />
            <button onClick={Sacar} className="deposit-start">SACAR</button>
            
            <button onClick={() => setOpen(false)}>X</button>
        </div>
    );
}
