
import './carouselhistory.css'
import { useContext, useEffect, useState } from 'react';
import { CurrentContext } from '../../context/themeContext';
import RouletteSquare from '../RouletteSquare';

export default function CarouselHistory(){
    const { histDados } = useContext(CurrentContext);
    const {swiperInstance} = useState(null);
    
    useEffect(() => {
        if (swiperInstance) {
            swiperInstance.update();
        }
    }, [histDados, swiperInstance]);

    const limitedHistoryData = (histDados || []).slice(0, 12);

    return (
        <div className='historydiv'>
            <div className='textdiv'>Giros anteriores:</div>
            
            <div className='numbersdiv'>
                {limitedHistoryData.map((item, index) => (
                    <div key={index}>
                        <RouletteSquare
                            number = {item}
                            size = '50px'
                        ></RouletteSquare>
                    </div>
                ))}
            </div>
        </div>
    );
}