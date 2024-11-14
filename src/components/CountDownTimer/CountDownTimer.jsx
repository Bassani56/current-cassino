
import './countdowntimer.css'
import { CurrentContext } from "../../context/themeContext";
import { useContext, useEffect, useState } from "react";

export default function CountDownTimer() {
    const {girarCarousel, setGirarCarousel } = useContext(CurrentContext);
    
    const [timeLeft, setTimeLeft] = useState(5); // inicializa com 5 segundos
    const [progressBar, setProgressBar] = useState(100); // começa em 100%


    useEffect(() => {
        if(timeLeft < 0) {          // Conta até -1 pq começa em 5 ent:
            setGirarCarousel(true); // 4 -> 3 -> 2 -> 1 -> 0 -> -1 (5 segundos)
            return;                 // só então gira o negocio
        }

        const interval = setInterval(() => {        // Contador para a barra e pro timer
            setTimeLeft((prev) => prev - 1);
            setProgressBar((prev) => Math.max(prev - 100 / 5, 0)); // Subtrai uma porcentagem a cada vez
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, setGirarCarousel]);

    useEffect(() => {
        if (!girarCarousel) {   // Quando resetar, reseta os dois contadores
            setTimeLeft(5);
            setProgressBar(100);
        }
      }, [girarCarousel]);

    return (
        <div className='timerdiv'>
            <div className='textdiv'>
                {timeLeft >= 0 ? `Tempo Restante: ${timeLeft}` : 'Tempo Restante: 0'}
            </div>
            <div className='countdowndiv'>
                <div className='timeleftdiv' style={{ width: `${progressBar}%` }}></div>
            </div>
        </div>
    )
}
