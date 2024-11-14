import './bonusbar.css'
import { useState } from 'react';

export default function BonusBar(){
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    return(
        isVisible && (
            <div className='bonusbar'>
                <div className='text'>Inscreva-se e receba bônus de até R$ 1000! 🇧🇷</div>
                <button className="closebonus-button" onClick={handleClose}>&times;</button>
            </div>
        )
    )
}