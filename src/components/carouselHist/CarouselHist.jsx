
import './carousel-hist.css'
import SliderHist from './sliderHist/Sliderhist';

export default function CarouselHist(){

    return (
        <div className='historydiv'>
            <div className='textdiv'>Giros anteriores:</div>
            <SliderHist/>
        </div>
    );
}