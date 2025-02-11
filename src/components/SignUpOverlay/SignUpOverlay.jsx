import { useState } from 'react'
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

    return (
        <div className='signup-overlaydiv' onClick={(e) => { 
            if (e.target.classList.contains('signup-overlaydiv')) setActiveOverlay(null);
        }}>
            <div className="signupdiv">
                <div className='signup-titlediv'>
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
