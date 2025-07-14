import PropTypes from 'prop-types';

/**
 * FilterTabs component - displays filter tabs for the providers table
 * @param {Object} props
 * @param {string} props.activeTab - Currently active tab
 * @param {Function} props.onTabChange - Tab change handler
 * @returns {JSX.Element}
 */
function FilterTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'favored', label: 'Favored' },
    { id: 'verified', label: 'Verified' },
  ];

  return (
    <div className="flex gap-1 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
            activeTab === tab.id
              ? 'bg-main-blue text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

FilterTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default FilterTabs;
