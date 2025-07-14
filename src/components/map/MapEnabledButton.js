import PropTypes from 'prop-types';

/**
 * MapEnabledButton component - displays a button to enable map view
 * @param {Object} props
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element}
 */
function MapEnabledButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-main-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-dark-blue transition-colors"
    >
      Enable Map View
    </button>
  );
}

MapEnabledButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MapEnabledButton;
