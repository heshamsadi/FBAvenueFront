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
    <button
      type="button"
      className="bg-main-blue hover:bg-dark-blue text-white px-4 py-2 rounded text-sm font-medium transition-colors"
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
    </button>
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
