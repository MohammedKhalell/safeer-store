import React from 'react';
import './pagination.scss';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const PrevArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const NextArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          className={`pagination-button ${number === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ));
    }

    const pageNumbers = [];

    // Always show first page and ellipsis if needed
    if (currentPage > 3) {
      pageNumbers.push(
        <button
          key={1}
          className={`pagination-button ${currentPage === 1 ? "active" : ""}`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
     
    }

    // Calculate the range of numbers to show
    let startPage: number;
    let endPage: number;

    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }

    // Add the page numbers
    for (let i = startPage; i <= endPage; i++) {
      if (i > 0 && i <= totalPages) {
        pageNumbers.push(
          <button
            key={i}
            className={`pagination-button ${i === currentPage ? "active" : ""}`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    }

    // Show last page and ellipsis if needed
    if (currentPage < totalPages - 2) {
     
      pageNumbers.push(
        <button
          key={totalPages}
          className={`pagination-button ${currentPage === totalPages ? "active" : ""}`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return totalPages > 0 ? (
    <div className="pagination">
      <button
        className={`pagination-button arrow ${currentPage === 1 ? 'disabled' : ''}`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <PrevArrow />
      </button>
      <div className="pagination-right">
        <div className="pagination-numbers">
          {renderPageNumbers()}
        </div>
        <button
          className={`pagination-button arrow ${currentPage === totalPages ? 'disabled' : ''}`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <NextArrow />
        </button>
      </div>
    </div>
  ) : null;
};
