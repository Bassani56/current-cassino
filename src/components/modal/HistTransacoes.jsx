import { useContext, useEffect, useState } from 'react';
import { fetchHistory, inserirTransacoes } from '../../hook/server';
import { CurrentContext } from '../../context/themeContext';
import './historico.css';
import Pagination from './pagination/Pagination';
export default function HistTransacoes({ open, setOpen }) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        async function fetch() {
            try {
                const account = await fetchHistory();
                console.log("Account history: ", account);
                setData(account);
            } catch (error) {
                console.log("FetchHistory: ", error);
            }
        }

        if (open) {
            fetch();
            // inserirTransacoes()
        }
    }, [open]);

    if (!open) {
        return null;
    }

    // Calcular a quantidade de páginas
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Obter os itens para a página atual
    const currentData = data.slice().reverse().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Função para trocar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container-modal-historico">
            <span style={{ color: "white" }}>HISTÓRICO DE TRANSAÇÕES</span>

            {/* Renderizar os itens da página atual */}
            {currentData.map((item, index) => {
                // Verifica se o item deve ser renderizado
                if (item.type === 'deposito' || item.type === 'saque' || item.type === 'INICIO' || item.valor === null) {
                    return null; // Não renderiza nada se as condições não forem atendidas
                }

                return (
                    <div className="item-hist" key={index}>
                        <div className="tipe-ap"  >{item.type}</div>
                        <div style={{ color: item.type === 'ganhou' ? 'green' : 'red' }} className="value-ap">
                            {item.type === 'ganhou' ? '+' : '-'} {item.valor}
                        </div>
                    </div>
                );
            })}

            {/* Botões de navegação de páginas */}
            {/* <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div> */}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />

            <button onClick={() => setOpen(false)}>X</button>
        </div>
    );
}
