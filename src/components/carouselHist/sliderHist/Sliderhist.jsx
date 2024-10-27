import React, { useContext, useEffect, useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import './slideHist.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Autoplay } from 'swiper/modules'; // Importando Autoplay
import { CurrentContext } from '../../../context/themeContext';

export default function Slider() {
    const { histDados } = useContext(CurrentContext);
    const [swiperInstance, setSwiperInstance] = useState(null); // Estado para armazenar a instância do Swiper
    // const histDados = [1, 14, 2, 13, 3, 12, 4, 20, 11, 5, 10, 6, 9, 7, 8, 9, 1, 21]
    // const histDados = [1, 14, 2, 13, 3, 12]
    useEffect(() => {
        if (swiperInstance) {
            swiperInstance.update(); // Atualiza o Swiper sempre que histDados mudar
        }
        console.log('Slider: ', histDados);
    }, [histDados, swiperInstance]);

    return (
            <div className='container-hist'>
                {histDados.map((item, index) => (
                    <div key={index}>
                        <div
                            className='squareHist'
                            style={{
                                background:
                                    item === 20 ? 'white' :
                                    item < 8 ? 'red' :
                                    item > 7 ? 'rgb(15, 25, 35)' : ''
                            }}
                        >
                            {item}
                        </div>
                    </div>
                ))}
        
            </div>
    );
}
