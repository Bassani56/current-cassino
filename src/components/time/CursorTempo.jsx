import { CurrentContext } from "../../context/themeContext";
import { useContext, useEffect, useState } from "react";
export default function CursorTime(){
    const[rodando, setRodando] = useState(false)
    const {girarCarousel, setGirarCarousel} = useContext(CurrentContext)
    const [width, setWidth] = useState(690); // largura inicial
    useEffect(() => {
        if (rodando) {
            return;
        } // Se não estiver rodando, não inicia o intervalo

        const interval = setInterval(() => {
            setWidth(prevWidth => {
                const newWidth = prevWidth - 5;
                return newWidth > 0 ? newWidth : 0; // Evita valores negativos
            });
        }, 77);

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [rodando]);

    // Efeito separado para lidar com a largura zero
    useEffect(() => {
        if (width === 0) {
            setRodando(true); // Para a animação quando a largura chega a zero
            // Espera 6 segundos antes de reiniciar a largura
            setGirarCarousel(true)
            const timeout = setTimeout(() => {
                setWidth(690); // Reinicia a largura
                setRodando(false); // Reinicia a animação
                setGirarCarousel(false)
            }, 6000); // 6000 milissegundos = 6 segundos

            // Limpa o timeout se o componente for desmontado ou se width mudar antes de 6 segundos
            return () => clearTimeout(timeout);
        }
    }, [width]);

    return(
        <div className='tempo' style={{ width: `${width}px` }}>tempo</div>
    )
}