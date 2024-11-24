import React, { useContext, useEffect, useRef, useState } from 'react';
import { CurrentContext } from '../../context/themeContext';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import RouletteSquare from '../RouletteSquare';

import 'swiper/css';
import './carousel.css'

export default function Carousel(){
    const children = [1, 14, 2, 13, 3, 12, 4, 15, 11, 5, 10, 6, 9, 7, 8]

    const swiperRef = useRef(null);
    const {girarCarousel, setGirarCarousel, trava, setTrava, setHistDados } = useContext(CurrentContext);
    const [visibleSlides, setVisibleSlides] = useState([]);
    const [isExecuted, setIsExecuted] = useState(false); 

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            if (girarCarousel) {
                swiperRef.current.swiper.autoplay.start();
                const number = Math.floor(Math.random() * (8000 - 2000 + 1)) + 2000;
    
                const timeout = setTimeout(() => {
                    if (swiperRef.current && swiperRef.current.swiper) {
                        swiperRef.current.swiper.autoplay.stop();
                        setTrava(true);
    
                        const innerTimeout = setTimeout(() => {
                            setTrava(false);
                            console.log('Time')
                            // Adicionado para redefinir girarCarousel após o tempo esgotar
                        }, 1500);
                        
                        setGirarCarousel(false)
                        setIsExecuted(false)
                        return () => clearTimeout(innerTimeout);
                    }
                }, number);
                
                return () => clearTimeout(timeout);
                
            } else {
                swiperRef.current.swiper.autoplay.stop();
            }
        }
    }, [girarCarousel]);
    

    // Função para lidar com a mudança de slide e atualizar os slides visíveis
    const handleSlideChange = () => {
        const swiper = swiperRef.current.swiper;
        const currentIndex = swiper.realIndex; // Índice do slide ativo
        const slidesPerView = swiper.params.slidesPerView;

        // Calcula os índices dos slides visíveis com base no slide ativo
        const visible = Array.from({ length: slidesPerView }, (_, i) => (currentIndex + i) % children.length);
        setVisibleSlides(visible);
    };

    // Estado para controlar a execução

    useEffect(() => {
        // Verifica se o carrossel está travado
        if (!trava || isExecuted) {
            return;
        }

        // Verifica se já foi executado uma vez
        if (visibleSlides && visibleSlides.length > 0) {
            // Pega o índice do meio e o elemento correspondente
            const middleIndex = Math.floor(visibleSlides.length / 2);
            const middleChild = children[visibleSlides[middleIndex]];

            // Atualiza histDados com o número do meio
            setHistDados(prevDados => [middleChild, ...prevDados]);

            // Marca como executado
            setIsExecuted(true);
        }
    }, [visibleSlides, children, trava, isExecuted]);

    return(
        <div className='carouseldiv'>
            <div className='middlebar'></div>
            <Swiper
                ref={swiperRef}
                modules={[Navigation, Autoplay]}
                spaceBetween={15}
                slidesPerView={7}
                loop={true}
                autoplay={{delay: 100}}

                onSlideChange={handleSlideChange} // Atualiza os slides visíveis em cada mudança de slide
            >
                {React.Children.map(children, (child, index) => (
                    <SwiperSlide key={index}>
                        <RouletteSquare
                            number = {child}
                            size = '96px'
                        ></RouletteSquare>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}