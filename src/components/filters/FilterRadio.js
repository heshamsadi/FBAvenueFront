import PropTypes from 'prop-types';

/**
 * FilterRadio component - displays a radio button filter
 * @param {Object} props
 * @param {string} props.id - The radio button ID
 * @param {string} props.name - The radio button name
 * @param {string} props.value - The radio button value
 * @param {string} props.label - The radio button label
 * @param {boolean} props.checked - Whether the radio is checked
 * @param {Function} props.onChange - Change handler
 * @returns {JSX.Element}
 */
function FilterRadio({ id, name, value, label, checked, onChange }) {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-main-blue border-gray-300 focus:ring-main-blue"
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
}

FilterRadio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FilterRadio;
