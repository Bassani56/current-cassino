import { useState } from 'react'
import './signinoverlay.css';

export default function SignInOverlay({setActiveOverlay}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignIn = async (e) => {
        console.log(email, password);
        e.preventDefault();
    } 

    return(
        <div className='signin-overlaydiv' onClick={(e) => { 
            if (e.target.classList.contains('signin-overlaydiv')) setActiveOverlay(null);
        }}>
            <div className="signindiv">
                <div className='signin-titlediv'>
                    <h2>Bolazula</h2>
                </div>

                <div className="signin-formdiv" >
                    <form onSubmit={handleSignIn}>
                        <div className='signin-inputdiv'>
                            <input
                                type="text"
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='signin-inputdiv'>
                            <input
                                type="text"
                                placeholder='Senha'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </form>
                    <button className='signinbutton' type='submit' onClick={handleSignIn}>Entrar</button>
                </div>
            </div>
        </div>
    )
}