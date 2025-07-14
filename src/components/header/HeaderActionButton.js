import PropTypes from 'prop-types';

/**
 * HeaderActionButton component - displays a single action button in the header
 * @param {Object} props
 * @param {JSX.Element} props.icon - The icon to display
 * @param {string} props.label - The button label
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element}
 */
function HeaderActionButton({ icon, label, onClick }) {
  return (
    <div className="flex items-center rounded overflow-hidden text-sm font-medium transition-colors bg-main-blue text-white hover:bg-dark-blue">
      {/* Left darker section with icon */}
      <button
        type="button"
        onClick={onClick}
        className="flex items-center justify-center w-8 h-8 bg-dark-blue text-white"
      >
        {icon}
      </button>

      {/* Right section with title */}
      <button
        type="button"
        onClick={onClick}
        className="flex-1 px-3 py-2 text-left"
      >
        {label}
      </button>
    </div>
  );
}

HeaderActionButton.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

HeaderActionButton.defaultProps = {
  onClick: () => {},
};

export default HeaderActionButton;
