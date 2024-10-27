import { CurrentContext } from "../../context/themeContext";
import { useContext, useEffect, useState } from "react";

export default function CursorTime() {
    const [rodando, setRodando] = useState(false);
    const { girarCarousel, setGirarCarousel } = useContext(CurrentContext);
    const [width, setWidth] = useState(690); // largura inicial
    const [tempo, setTempo] = useState(15); // inicializa com 15 segundos

    useEffect(() => {
        if (rodando) {
            return;
        } // Se não estiver rodando, não inicia o intervalo

        const interval = setInterval(() => {
            setWidth(prevWidth => {
                const newWidth = prevWidth - 5;
                return newWidth > 0 ? newWidth : 0; // Evita valores negativos
            });
        }, 115);

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [rodando]);

    // Efeito separado para lidar com a largura zero
    useEffect(() => {
        if (width === 0) {
            setRodando(true); // Para a animação quando a largura chega a zero
            setGirarCarousel(true);
            
            // Espera 6 segundos antes de reiniciar a largura
            const timeout = setTimeout(() => {
                setWidth(690); // Reinicia a largura
                setRodando(false); // Reinicia a animação
                setGirarCarousel(false);
                setTempo(15); // Reinicia o tempo
            }, 6000); // 6000 milissegundos = 6 segundos

            // Limpa o timeout se o componente for desmontado ou se width mudar antes de 6 segundos
            return () => clearTimeout(timeout);
        }
    }, [width]);

    // Efeito para decrementar o tempo
    useEffect(() => {
        const intervalTempo = setInterval(() => {
            setTempo(prevTempo => {
                if (prevTempo <= 0) {
                    clearInterval(intervalTempo); // Para o intervalo se o tempo chegar a 0
                    return -1; // Garante que o tempo não fique negativo
                }
                return prevTempo - 1; // Decrementa o tempo
            });
        }, 1000); // Decrementa a cada 1 segundo

        return () => clearInterval(intervalTempo); // Limpa o intervalo ao desmontar o componente
    }, []);

    return (
        <div className='tempo' style={{ width: `${width}px` }}>{tempo !== -1 && tempo}</div>
    );
}
