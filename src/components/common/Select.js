import PropTypes from 'prop-types';

/**
 * Select component - displays a reusable select dropdown
 * @param {Object} props
 * @param {Array} props.options - Array of option objects with value and label
 * @param {string} props.value - Selected value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
function Select({ options, value, onChange, placeholder, className = '' }) {
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-main-blue';

  return (
    <select
      value={value}
      onChange={onChange}
      className={`${baseClasses} ${className}`}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

Select.defaultProps = {
  placeholder: null,
  className: '',
};

export default Select;
