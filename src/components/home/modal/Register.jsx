import './index.css'
import { CurrentContext } from '../../../context/themeContext'
import { useContext, useEffect, useState } from 'react'
import LogoMensagem from '../../img/logoMensagem.jpg'
import Escolha from '../../img/antesEscolha.jpg'
import Proteger from '../../img/deus-proteja-bolsonabo.jpg'
import Urgente from '../../img/urgente-bolsonabo.jpg'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../supabaseClient'

export default function Register() {
    const { setShowModelRegister, showModelRegister } = useContext(CurrentContext)
    
    const [selectedPet, setSelectedPet] = useState('');

    const handleSelectChange = (event) => {
        setSelectedPet(event.target.value);
    };
    
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        console.log(email, password);
        e.preventDefault();
    
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
    
            if (error) {
                console.error('Erro completo:', error);
                alert(`Erro auth: ${error.message}`);
            } else {
                alert('Registro realizado com sucesso! Verifique seu email para confirmar.');
                navigate("/dashboard");
            }
        } catch (err) {
            console.error('Erro no processo de registro:', err);
        }
    };
    
    useEffect(() => {
        console.log(showModelRegister)
    }, [showModelRegister])

    if (showModelRegister) {
        return (
            <div className="modal-overlay-register">
                <button onClick={() => { setShowModelRegister(false) }}>Fechar</button>

                <div className="modal-content-register mensagem">
                    <h2>AVISO!</h2>
                    <p>Você tem certeza disso?</p>
                    <img src={LogoMensagem} alt="" />
                    <p>Você foi avisado</p>
                </div>

                <div className="modal-content-register cadastro">
                    <h2><strong>Bolazula</strong></h2>
                    <p>Cadastre-se na Bolazula</p>

                    <form 
                        className="modal-content-register cadastro" 
                        onSubmit={handleSignUp}
                    >
                        <input 
                            type="text" 
                            placeholder='Endereço de Email' 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />

                        <input 
                            type="text" 
                            placeholder='Senha' 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />

                        <select 
                            name="client" 
                            onChange={handleSelectChange} 
                            value={selectedPet} 
                            className="select-client-dropdown"
                        >
                            <option value="">Selecione um pet</option>
                            <option value="lule">Lule</option>
                            <option value="bolsonabo">Bolsonabo</option>
                            <option value="nenhum">Deus é mais...</option>
                        </select>

                        <div className='foto'>
                            {selectedPet === 'bolsonabo' && <img src={Proteger} alt="" />}
                            {selectedPet === 'lule' && <img src={Urgente} alt="" />}
                            {selectedPet.length < 1 ? (
                                <img src={Escolha} alt="" />
                            ) : (
                                <button type='submit'>Comece já</button>
                            )}
                        </div>
                    </form>
                    
                    {selectedPet === 'bolsonabo' && <img src={Proteger} alt="" />}
                    {selectedPet === 'lule' && <img src={Urgente} alt="" />}
                    {selectedPet.length < 1 ? (
                        <img src={Escolha} alt="" />
                    ) : (
                        <button onClick={() => { navigate("/dashboard") }}>Comece já</button>
                    )}
                </div>
            </div>
        )
    }
    return null
}
