import PropTypes from 'prop-types';

/**
 * EmptyState component - displays an empty state message
 * @param {Object} props
 * @param {string} props.message - The message to display
 * @param {number} props.colSpan - Number of columns to span
 * @returns {JSX.Element}
 */
function EmptyState({ message, colSpan }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-16 text-center text-gray-500">
        {message}
      </td>
    </tr>
  );
}

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
  colSpan: PropTypes.number.isRequired,
};

export default EmptyState;
