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
            <div className="container-modal-transacoes">
                <div className="transacoes-option">
                    <button onClick={()=>{setOpenSaque(true); setOpenDeposit(false); setOpenHist(false);}} className="button-saque">Saque</button>
                    <button onClick={()=>{setOpenDeposit(true); setOpenSaque(false); setOpenHist(false);}} className="button-deposito">Deposito</button>
                </div>
                <div className='teste'>
                    <button onClick={()=>{setOpenHist(true); setOpenSaque(false); setOpenDeposit(false)}} >Histórico de transacoes</button>
                </div>
                <Saque open={openSaque} setOpen={setOpenSaque}/>
                <Depositar open={openDeposit} setOpen={setOpenDeposit}/>
                {openHist && <HistTransacoes open={openHist} setOpen={setOpenHist}/>}
                <button onClick={()=>{setOpen(false)}} >X</button>
            </div>
        )
}