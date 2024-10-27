import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css'
import SliderHist from './sliderHist/Sliderhist';
import { CurrentContext } from '../../context/themeContext';
import { useContext, useEffect } from 'react';
import './carousel-hist.css'

export default function CarouselHist(){
    const{girarCarousel, histDados, refresh, setRefresh, setHistDados, numberHistory} = useContext(CurrentContext)
    
    useEffect(() => {
        if(!girarCarousel){
            const numeroAleatorio = Math.floor(Math.random() * 15) + 1; // Gera um número aleatório entre 1 e 15
            setHistDados(prevDados => [numeroAleatorio, ...prevDados]);
            setRefresh(!refresh)
        }
    }, [girarCarousel]);

    useEffect(() => {
        if(numberHistory){
            setHistDados(prev => [...prev, numberHistory]);
        } // Adiciona numberHistory ao array
    }, [numberHistory]);

    useEffect(() => {
        console.log('children: ', histDados); // Verifica o estado atualizado
    }, [histDados]); // Escuta mudanças no histDados

    return (
        <div className='carousel-container-hist'>
            <SliderHist histDados={histDados}/>
        </div>
    );
}