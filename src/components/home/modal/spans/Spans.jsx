import './spans.css'
import { CurrentContext } from '../../../../context/themeContext'
import { useContext, useState } from 'react'

export default function Span(){
    const {showSpan, setShowSpan} = useContext(CurrentContext)

        if(showSpan){
            return (
                <div className="modal-span">
                    <button className="close-button" onClick={() => { setShowSpan(false); }}>
                        &times; {/* Símbolo "x" para fechar */}
                    </button>
            
                    <div className="modal-content-span content">
                        <h2 className="modal-title">⚠️ AVISO IMPORTANTE!</h2>
                        <p className="modal-message">Saia enquanto é tempo. Sua <strong>poupança</strong> é a nossa prioridade!</p>
                        <button className="confirm-button" onClick={() => { setShowSpan(false); }}>Entendi</button>
                    </div>
                </div>
            );
        }
    
    
    
    return null
}