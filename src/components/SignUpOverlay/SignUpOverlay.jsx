import { CurrentContext } from '../../context/themeContext'
import { useContext, useEffect, useState } from 'react'
import LogoMensagem from '../../assets/img/logoMensagem.jpg'
import Escolha from '../../assets/img/antesEscolha.jpg'
import Proteger from '../../assets/img/deus-proteja-bolsonabo.jpg'
import Urgente from '../../assets/img/urgente-bolsonabo.jpg'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import './signupoverlay.css'

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
                navigate("/RoulettePage");
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
            <div className='overlaydiv'>
                <div className="signupdiv">
                    <button className='closebutton' onClick={() => { setShowModelRegister(false) }}>
                        &times;
                    </button>

                    <div className='titlediv'>
                        <h2>Bolazula</h2>
                        <p>Cadastre-se agora</p>
                    </div>

                    <div className="formdiv" >
                        <form onSubmit={handleSignUp}>
                            <div className='inputdiv'>
                                <input
                                    type="text"
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='inputdiv'>
                                <input
                                    type="text"
                                    placeholder='Senha'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='inputdiv'>
                                <input
                                    type="text"
                                    maxLength={'14'}
                                    placeholder='CPF'
                                />
                            </div>
                        </form>
                        <button className='signupbutton' type='submit'>Criar Conta</button>
                        <div className='userexistsdiv'>
                            Já tem uma conta?
                            <button>Entrar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return null
}
