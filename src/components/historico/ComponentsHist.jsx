import { CurrentContext } from "../../context/themeContext"
import ContentBots from "./bots/ContentBots"
import { useContext, useEffect, useState } from "react"
let contRed = 0;
let contBlack = 0;
let contWhite = 0;

export default function ComponentsHist() {
    const { histDados, girarCarousel, refresh } = useContext(CurrentContext);
    const [apostasRed, setApostasRed] = useState([]);
    const [apostasBlack, setApostasBlack] = useState([]);
    const [apostasWhite, setApostasWhite] = useState([]);

    function ordenaVetor(vetor) {
        // Ordena o vetor de forma decrescente
        return [...vetor].sort((a, b) => b - a);
    }

    useEffect(()=>{
        contRed = 0;
        contBlack = 0;
        contWhite = 0;
    },[histDados])

    useEffect(() => {
        if(girarCarousel){return}
        const intervalRed = setInterval(() => {
            const numeroRed = Math.floor(Math.random() * 100000) + 10 - Math.floor(Math.random() * 100000) + 10;
            
            setApostasRed(prevDados => {
                let novoArray;
                if (prevDados.length < 9) {
                    novoArray = [numeroRed, ...prevDados];
                } else {
                    contRed++;
                    novoArray = [numeroRed, ...prevDados.slice(0, 8)];
                }
                return ordenaVetor(novoArray);
            });
        }, Math.floor(Math.random() * 350) + 200);

        return () => clearInterval(intervalRed);
    }, [girarCarousel]);

    useEffect(() => {
        if(girarCarousel){return}

        const intervalWhite = setInterval(() => {
            const numeroWhite = Math.floor(Math.random() * 100000) + 10;

            setApostasWhite(prevDados => {
                let novoArray;
                if (prevDados.length < 9) {
                    novoArray = [numeroWhite, ...prevDados];
                } else {
                    contWhite++;
                    novoArray = [numeroWhite, ...prevDados.slice(0, 8)];
                }
                return ordenaVetor(novoArray);
            });
        }, Math.floor(Math.random() * 250) + 100);

        return () => clearInterval(intervalWhite);
    }, [girarCarousel]);

    useEffect(() => {
        if(girarCarousel){return}

        const intervalBlack = setInterval(() => {
            const numeroBlack = Math.floor(Math.random() * 100000) + 10;

            setApostasBlack(prevDados => {
                let novoArray;
                if (prevDados.length < 9) {
                    novoArray = [numeroBlack, ...prevDados];
                } else {
                    contBlack++;
                    novoArray = [numeroBlack, ...prevDados.slice(0, 8)];
                }
                return ordenaVetor(novoArray); // Certifique-se de que ordenaVetor é uma função válida
            });
        }, Math.floor(Math.random() * 200) + 100);

        // Cleanup do intervalo
        return () => clearInterval(intervalBlack);
    }, [girarCarousel]);

    return (
        <div className="historico-components-wrapper">
            <div className="historico-component">
                <h2>Vitória 2X</h2>
                <ContentBots apostas={apostasBlack} />
                <div><h1>+{contBlack} jogadores</h1></div>
            </div>
            <div className="historico-component">
                <h2>Vitória 14X</h2>
                <ContentBots apostas={apostasWhite} />
                <div><h1>+{contWhite} jogadores</h1></div>
            </div>
            <div className="historico-component">
                <h2>Vitória 2X</h2>
                <ContentBots apostas={apostasRed} />
                <div><h1>+{contRed} jogadores</h1></div>
            </div>
        </div>
    );
}