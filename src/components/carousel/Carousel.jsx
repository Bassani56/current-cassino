import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css'
import './carousel.css'
import Slider from './slider/Slider';
import { Navigation, Pagination, A11y } from 'swiper'; 
export default function Carousel(){
    let children = [1, 14, 2, 13, 3, 12, 4, 15, 11, 5, 10, 6, 9, 7, 8]

    return(
        <div className='carousel-container'>
            <Swiper>
                <Slider>
                    {children}
                </Slider>
            </Swiper>
        </div>
    )
}


// useEffect(() => {
    //     // Verifica se o carrossel está travado
    //     if (!trava || isExecuted) {
    //         return;
    //     }

    //     // Verifica se já foi executado uma vez
    //     if (visibleSlides && visibleSlides.length > 0) {
    //         // Pega o índice do meio e o elemento correspondente
    //         const middleIndex = Math.floor(visibleSlides.length / 2);
    //         const middleChild = children[visibleSlides[middleIndex]];

    //         // Atualiza histDados com o número do meio
    //         setHistDados(prevDados => [middleChild, ...prevDados]);

    //         // Marca como executado
    //         setIsExecuted(true);
    //     }
    // }, [visibleSlides, children, trava, isExecuted]);

    // const timeout = setTimeout(() => {
    //     if (swiperRef.current && swiperRef.current.swiper) {
    //         swiperRef.current.swiper.autoplay.stop();
    //         setTrava(true);

    //         const innerTimeout = setTimeout(() => {
    //             setTrava(false);
    //              // Adicionado para redefinir girarCarousel após o tempo esgotar
    //         }, 6000);
    //         setGirarCarousel(false);
    //         return () => clearTimeout(innerTimeout);
    //     }
    // }, number);