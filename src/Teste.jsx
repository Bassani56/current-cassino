import React, { useState } from 'react';
import './roleta.css'; // Para estilos adicionais
import { animated, useSpring } from '@react-spring/web';

const Roulette = () => {
    const [index, setIndex] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const items = Array.from({ length: 15 }, (_, i) => `Item ${i + 1}`); // 15 itens

    // Animação para a roleta
    const { transform } = useSpring({
        transform: `translateX(-${index * 100}%)`, // Move horizontalmente
        config: { tension: 300, friction: 20 },
    });

    const spinRoulette = () => {
        if (!isSpinning) {
            setIsSpinning(true);
            let spins = 0;
            const totalSpins = 50; // Número total de giros
            const duration = 7000; // Duração total em milissegundos
            const initialInterval = duration / totalSpins; // Intervalo inicial

            const spinInterval = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % items.length);
                spins += 1;

                // Calcula o novo intervalo baseado no tempo restante
                const remainingSpins = totalSpins - spins;
                const newInterval = Math.max(100, (duration - (spins * initialInterval)) / remainingSpins); // Ajusta o intervalo

                // Atualiza o intervalo de giro
                clearInterval(spinInterval);
                setTimeout(spinRoulette, newInterval); // Chama novamente a função com novo intervalo

                if (spins === totalSpins) {
                    clearInterval(spinInterval);
                    setIsSpinning(false);
                }
            }, initialInterval);
        }
    };

    return (
        <div className="roulette-container">
            <animated.div className="roulette" style={{ transform }}>
                {items.map((item, i) => (
                    <div className="roulette-item" key={i}>
                        {item}
                    </div>
                ))}
            </animated.div>
            <button onClick={spinRoulette} disabled={isSpinning}>
                {isSpinning ? 'Girando...' : 'Girar'}
            </button>
        </div>
    );
};

export default Roulette;
