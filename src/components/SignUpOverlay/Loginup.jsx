import { CurrentContext } from '../../context/themeContext'
import { useContext, useEffect, useState } from 'react'
import LogoMensagem from '../../assets/img/logoMensagem.jpg'
import Escolha from '../../assets/img/antesEscolha.jpg'
import Proteger from '../../assets/img/deus-proteja-bolsonabo.jpg'
import Urgente from '../../assets/img/urgente-bolsonabo.jpg'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import './signupoverlay.css'

export default function Loginup() {
    const { setShowModelRegister, showModelRegister } = useContext(CurrentContext)
    const {setShowModelLogin, showModelLogin} = useContext(CurrentContext)
    // const [selectedPet, setSelectedPet] = useState('');

    // const handleSelectChange = (event) => {
    //     setSelectedPet(event.target.value);
    // };
    
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
        console.log(showModelLogin)
    }, [showModelLogin])

    if (showModelLogin) {
        return (
            <div className='overlaydiv'>
                <div className="signupdiv">
                    <button className='closebutton' onClick={() => { setShowModelLogin(false) }}>

                        &times;
                    </button>

                    <div className='titlediv'>
                        <h2>Bolazula</h2>
                        <p>Fazer login</p>
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
                        </form>
                        <button
                            onClick={() => {navigate("/RoulettePage")}}
                            className='signupbutton' type='submit'
                            >
                                Entrar
                        </button>

                        <div className='userexistsdiv'>
                            Ainda não possui uma conta?
                            <button
        
                                onClick={() => {setShowModelLogin(false); setShowModelRegister(true)}}                               
                            >Criar</button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return null
}
