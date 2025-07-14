import PropTypes from 'prop-types';

/**
 * NavigationMenuItem component - displays a single item in the navigation menu
 * @param {Object} props
 * @param {JSX.Element} props.icon - The icon to display
 * @param {string} props.label - The item label
 * @param {string} props.badge - Optional badge number
 * @param {boolean} props.isActive - Whether this item is active
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element}
 */
function NavigationMenuItem({ icon, label, badge, isActive, onClick }) {
  const activeClasses = 'bg-lite-blue border-l-main-blue scale-105';
  const inactiveClasses = 'text-gray-600 hover:scale-[1.02]';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 pl-[30px]  text-left text-sm border-l-[10px] border-l-white transition-colors ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="flex-1 font-medium">{label}</span>
      {badge && (
        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
          {badge}
        </span>
      )}
    </button>
  );
}

NavigationMenuItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  badge: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

NavigationMenuItem.defaultProps = {
  badge: null,
  isActive: false,
  onClick: () => {},
};

export default NavigationMenuItem;
