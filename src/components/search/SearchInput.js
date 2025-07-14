import PropTypes from 'prop-types';

/**
 * SearchInput component - displays a search input field
 * @param {Object} props
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
function SearchInput({ placeholder, value, onChange, className = '' }) {
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-main-blue';

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${baseClasses} ${className}`}
    />
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SearchInput.defaultProps = {
  placeholder: 'Search...',
  className: '',
};

export default SearchInput;
