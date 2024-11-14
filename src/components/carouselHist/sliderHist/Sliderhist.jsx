import './slideHist.css';
import { useContext, useEffect, useState } from 'react';
import { CurrentContext } from '../../../context/themeContext';

export default function Slider() {
    const { histDados } = useContext(CurrentContext);
    const [swiperInstance, setSwiperInstance] = useState(null);

    useEffect(() => {
        if (swiperInstance) {
            swiperInstance.update();
        }
    }, [histDados, swiperInstance]);

    const limitedHistoryData = (histDados || []).slice(0, 10);

    return (
        <div className='numbersdiv'>

            {limitedHistoryData.map((item, index) => (
                <div key={index}>
                    <div 
                        className='squarediv'
                        style={{
                            background:
                                item === 15 ? 'white' :
                                item < 8 ? 'rgb(241, 44, 76)' :
                                item > 7 ? 'rgb(15, 25, 35)' : '',
                            color: item === 15 ? 'black' : 'white'
                        }}
                    >
                        {item !== 15 && item}
                    </div>
                </div>
            ))}

        </div>
    );
}
