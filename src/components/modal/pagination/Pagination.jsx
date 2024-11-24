import React, { useState } from 'react';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  const [startIndex, setStartIndex] = useState(0);

  // Define a quantidade máxima de botões de página visíveis de uma vez
  const maxVisibleButtons = 10;

  // Calcula o índice final do conjunto atual de botões
  const endIndex = Math.min(startIndex + maxVisibleButtons, totalPages);

  // Função para avançar para o próximo conjunto de botões
  const nextPageGroup = () => {
    if (endIndex < totalPages) {
      setStartIndex(startIndex + maxVisibleButtons);
    }
  };

  // Função para voltar ao conjunto anterior de botões
  const prevPageGroup = () => {
    if (startIndex >= maxVisibleButtons) {
      setStartIndex(startIndex - maxVisibleButtons);
    }
  };

  return (
    <div className="pagination">
      Botão para retroceder o conjunto de páginas, se necessário
      {startIndex > 0 && (
        <button onClick={prevPageGroup} className="page-button">
          {'<'}
        </button>
      )}

      {/* Renderiza os botões das páginas atuais */}
      {Array.from({ length: endIndex - startIndex }, (_, index) => {
        const pageNumber = startIndex + index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`page-button ${currentPage === pageNumber ? 'active' : ''}`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Botão "..." para avançar para o próximo conjunto de páginas, se houver mais */}
      {endIndex < totalPages && (
        <>
          <button onClick={nextPageGroup} className="page-button">...</button>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`page-button ${currentPage === totalPages ? 'active' : ''}`}
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
