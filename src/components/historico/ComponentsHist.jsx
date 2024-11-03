import { CurrentContext } from "../../context/themeContext"
import ContentBots from "./bots/ContentBots"
import { useContext, useEffect, useState } from "react"
import { nomes } from "./bots/nomes";

let contRed = 0;
let contBlack = 0;
let contWhite = 0;

export default function ComponentsHist() {
    const {trava, associacoes, setAssociacoes, histDados, girarCarousel, refresh, colorState, setColorState } = useContext(CurrentContext);
    const [apostasRed, setApostasRed] = useState([]);
    const [apostasBlack, setApostasBlack] = useState([]);
    const [apostasWhite, setApostasWhite] = useState([]);
    const [nomesDisponiveis, setNomesDisponiveis] = useState(nomes);
    const[teste, setTeste] = useState(false)
    function ordenaVetor(vetor) {
        // Ordena o vetor de forma decrescente
        return [...vetor].sort((a, b) => b - a);
    }

    // useEffect(()=>{
    //     contRed = 0;
    //     contBlack = 0;
    //     contWhite = 0;
    //     console.log("associassoes: ", associacoes)
    //     // setAssociacoes([])
    // },[histDados])

    useEffect(()=>{
        // console.log('apostas red: ', apostasRed)
    },[apostasRed])

    useEffect(() => {
        if(girarCarousel || trava){
            // contRed = 0;
            return
        }
        else if(!girarCarousel && !trava){
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

                // Sorteia um nome aleatório da lista disponível
                if (nomesDisponiveis.length > 0) {
                    const indiceNomeAleatorio = Math.floor(Math.random() * nomesDisponiveis.length);
                    const nomeSorteado = nomesDisponiveis[indiceNomeAleatorio];

                    // Remove o nome sorteado da lista de disponíveis
                    const novosNomesDisponiveis = nomesDisponiveis.filter((_, index) => index !== indiceNomeAleatorio);
                    setNomesDisponiveis(novosNomesDisponiveis);

                    // Adiciona a nova associação ao estado de associações
                    setAssociacoes(prevAssociacoes => [
                        { numeroRed: numeroRed, nomeRed: nomeSorteado },
                        ...prevAssociacoes
                    ]);
                }

                return ordenaVetor(novoArray);
            });
        }, Math.floor(Math.random() * 350) + 200);

        return () => clearInterval(intervalRed);
    }
    }, [girarCarousel, trava]);

    useEffect(() => {
        if(girarCarousel || trava){
            // console.log('apostas paradas', "girarCarousel ", girarCarousel,"trava ",  trava);
            return
        }

        else if(!girarCarousel && !trava){
            console.log('CUIDADO MOVIMENTO INVOLUNTARIO', girarCarousel, trava)
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

                // Sorteia um nome aleatório da lista disponível
                if (nomesDisponiveis.length > 0) {
                    const indiceNomeAleatorio = Math.floor(Math.random() * nomesDisponiveis.length);
                    const nomeSorteado = nomesDisponiveis[indiceNomeAleatorio];

                    // Remove o nome sorteado da lista de disponíveis
                    const novosNomesDisponiveis = nomesDisponiveis.filter((_, index) => index !== indiceNomeAleatorio);
                    setNomesDisponiveis(novosNomesDisponiveis);

                    // Adiciona a nova associação ao estado de associações
                    setAssociacoes(prevAssociacoes => [
                        { numeroWhite: numeroWhite, nomeWhite: nomeSorteado },
                        ...prevAssociacoes
                    ]);
                }

                return ordenaVetor(novoArray);
            });
        }, Math.floor(Math.random() * 250) + 100);

        return () => clearInterval(intervalWhite);
        }
    }, [girarCarousel, trava]);

    useEffect(() => {
        if(girarCarousel || trava){
            // contBlack = 0; 
            return
        }
        else if(!girarCarousel && !trava){
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

                // Sorteia um nome aleatório da lista disponível
                if (nomesDisponiveis.length > 0) {
                    const indiceNomeAleatorio = Math.floor(Math.random() * nomesDisponiveis.length);
                    const nomeSorteado = nomesDisponiveis[indiceNomeAleatorio];

                    // Remove o nome sorteado da lista de disponíveis
                    const novosNomesDisponiveis = nomesDisponiveis.filter((_, index) => index !== indiceNomeAleatorio);
                    setNomesDisponiveis(novosNomesDisponiveis);

                    // Adiciona a nova associação ao estado de associações
                    setAssociacoes(prevAssociacoes => [
                        { numeroBlack: numeroBlack, nomeBlack: nomeSorteado },
                        ...prevAssociacoes
                    ]);
                }

                return ordenaVetor(novoArray); // Certifique-se de que ordenaVetor é uma função válida
            });
        }, Math.floor(Math.random() * 200) + 100);

        // Cleanup do intervalo
        return () => clearInterval(intervalBlack);
        }
    }, [girarCarousel, trava]);

    return (
        <div className="historico-components-wrapper">
            <div className="historico-component">
                <div className="title">
                    <div className="simbol-red"></div>
                    <div className="type">Vitória 2X</div>
                </div>
                <ContentBots apostas={apostasRed} nome={'red'}/>
                <div className="nome-user"><h2>+{contRed} jogadores</h2></div>
            </div>
            
            <div className="historico-component">
                <div className="title">
                    <div className="simbol-white"></div>
                    <div className="type">Vitória 14X</div>
                </div>
                <ContentBots apostas={apostasWhite}  nome={'white'}/>
                <div className="nome-user"><h2>+{contWhite} jogadores</h2></div>
            </div>

            <div className="historico-component">
                <div className="title">
                    <div className="simbol-black"></div>
                    <div className="type">Vitória 2X</div>
                </div>
                <ContentBots apostas={apostasBlack} nome={'black'} />
                <div className="nome-user"><h2>+{contBlack} jogadores</h2></div>
            </div>
        </div>
    );
}