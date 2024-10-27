import React, { useContext, useEffect, useRef } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import './slide.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Autoplay } from 'swiper/modules'; // Importando Autoplay
import { CurrentContext } from '../../../context/themeContext';

export default function Slider({ settings, children }) {
    const swiperRef = useRef(null); // Cria uma referência para o Swiper
    const {girarCarousel, histDados} = useContext(CurrentContext)
    useEffect(() => {
        console.log('girar: ', girarCarousel);
    
        if (swiperRef.current && swiperRef.current.swiper) {
            if (girarCarousel) {
                swiperRef.current.swiper.autoplay.start(); // Inicia o autoplay
                 // Pára o autoplay após 4 segundos (4000ms)
                const timeout = setTimeout(() => {
                    if (swiperRef.current && swiperRef.current.swiper) {
                        swiperRef.current.swiper.autoplay.stop(); // Para o autoplay
                        
                    }
                }, Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000); // Gera um número aleatório entre 3000 e 8000ms

                // Cleanup do timeout quando o componente desmontar
                return () => clearTimeout(timeout);
            } else {
                swiperRef.current.swiper.autoplay.stop(); // Para o autoplay
            }
        }

       
    }, [girarCarousel]);

    return (
        <Swiper
            {...settings} // Configurações do Swiper
            ref={swiperRef} // Armazena a referência do Swiper
            modules={[Navigation, Autoplay]} // Adicionando o Autoplay como módulo
            spaceBetween={0}
            slidesPerView={7}
            navigation={true}
            loop={true} // Habilita o loop infinito
            autoplay={{
                delay: 100, // Pequeno delay para simular movimento rápido
                disableOnInteraction: false, // Mantém o autoplay após interação
            }}
        >
            {React.Children.map(children, (child, index) => (
                <SwiperSlide key={index}>
                    <div 
                        className='square' 
                        style={{
                            background: 
                                child === 20 ? 'white':
                                child < 8 ? 'red' : 
                                'rgb(15, 25, 35)'
                        }}
                    >
                        {child}
                    </div>      
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
