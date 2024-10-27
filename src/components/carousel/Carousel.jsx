import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css'
import './carousel.css'
import Slider from './slider/Slider';
import { Navigation, Pagination, A11y } from 'swiper'; 
export default function Carousel(){
    let children = [1, 14, 2, 13, 3, 12, 4, 20, 11, 5, 10, 6, 9, 7, 8]

    return(
        <div className='carousel-container'>
            <Swiper>
                <Slider  >
                    {children}
                </Slider>
            </Swiper>
        </div>
    )
}