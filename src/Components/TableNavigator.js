import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const TableNavigator = ({ paginate, currentPage, rowsPerPage, totalRows }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // Handling the case where there are no pages
  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <FaAngleDoubleLeft />
      </button>

      {getPageNumbers().map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? 'active' : ''}
          aria-label={`Go to page ${number}`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default TableNavigator;
