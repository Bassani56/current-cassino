import './transacoes.css'
import Saque from './Saque'
import Depositar from './Depositar';
import { useState } from 'react';
import HistTransacoes from './HistTransacoes';
export default function Transacoes({open, setOpen}){
    const[openDeposit, setOpenDeposit] = useState(false)
    const[openSaque, setOpenSaque] = useState(false)
    const [openHist, setOpenHist] = useState(false)
    if(!open){
        return null;
    }
    
        return(
            <div className="containerdiv">
                <button className='transacoesclosebutton' onClick={() => { setOpen(false) }}>
                    &times;
                </button >
                <div className="transacoesbuttondiv">
                    <button className="button-saque" onClick={()=>{setOpenSaque(true); setOpenDeposit(false); setOpenHist(false);}}>Saque</button>
                </div>
                <div className="transacoesbuttondiv">
                    <button className="button-deposito" onClick={()=>{setOpenDeposit(true); setOpenSaque(false); setOpenHist(false);}}>Deposito</button>
                </div>
                <div className='transacoesbuttondiv'>
                    <button className="button-historico" onClick={()=>{setOpenHist(true); setOpenSaque(false); setOpenDeposit(false)}}>Histórico</button>
                </div>
                <Saque open={openSaque} setOpen={setOpenSaque}/>
                <Depositar open={openDeposit} setOpen={setOpenDeposit}/>
                {openHist && <HistTransacoes open={openHist} setOpen={setOpenHist}/>}
            </div>
        )
}