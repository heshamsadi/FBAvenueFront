import PropTypes from 'prop-types';

/**
 * TablePagination component - displays pagination controls for a table
 * @param {Object} props
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Page change handler
 * @returns {JSX.Element}
 */
function TablePagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  // Generate array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center px-4 py-3 border-t border-gray-200">
      <div className="flex items-center gap-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => handlePageClick(page)}
            className={`w-8 h-8 flex items-center justify-center text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-main-blue text-white rounded-md'
                : 'text-gray-700 hover:text-main-blue'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

TablePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default TablePagination;
