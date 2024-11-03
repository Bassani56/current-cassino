import { CurrentContext } from "../../context/themeContext";
import { useContext, useEffect, useState } from "react";

export default function CursorTime() {
    const {histDados, girarCarousel, setGirarCarousel } = useContext(CurrentContext);
    const [width, setWidth] = useState(690); // largura inicial
    const [tempo, setTempo] = useState(15); // inicializa com 15 segundos

    useEffect(() => {
        if (girarCarousel) {
            return;
        } 
        
        setTempo(15); // Reinicia o tempo
        setWidth(690); // Reinicia a largura
        const interval = setInterval(() => {
            setWidth(prevWidth => {
                const newWidth = prevWidth - 5;
                return newWidth > 0 ? newWidth : 0; // Evita valores negativos
            });
        }, 115);

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [girarCarousel]);

    // Efeito separado para lidar com a largura zero
    useEffect(() => {
        if (width === 0) {
            setGirarCarousel(true);
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
    
            return () => clearInterval(intervalTempo);
         // Limpa o intervalo ao desmontar o componente
    }, [histDados]); // Esta dependência vazia significa que o intervalo é criado apenas uma vez ao montar

    return (
        <div className='tempo' style={{ width: `${width}px` }}>
                <div style={{ 
                    position: 'absolute', 
                    zIndex: '2000'  // Um valor maior que o z-index da div
                }}>
                    {tempo >= 0 ? ` Girando em ${tempo}` : 'Girando...'}
                </div> {/* Exibe mensagem se o tempo chegar a zero */}
        </div>
    );
}
