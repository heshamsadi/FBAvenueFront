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
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-main-blue hover:bg-gray-100'
          }`}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page
          {' '}
          {currentPage}
          {' '}
          of
          {' '}
          {totalPages}
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-main-blue hover:bg-gray-100'
          }`}
        >
          Next
        </button>
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
