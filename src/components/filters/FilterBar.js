import PropTypes from 'prop-types';
import FilterRadio from './FilterRadio';

/**
 * FilterBar - Map filter bar with radio buttons for provider types
 * @param {Object} props
 * @param {string} props.selectedFilter - Currently selected filter value
 * @param {Function} props.onFilterChange - Filter change handler
 * @returns {JSX.Element}
 */
function FilterBar({ selectedFilter, onFilterChange }) {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pitches', label: 'Pitches' },
    { value: 'stadiums', label: 'Stadiums' },
    { value: 'transports', label: 'Transports' },
    { value: 'laundry', label: 'Laundry' },
    { value: 'water-bolt', label: 'Water Bolt' },
  ];

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">Providers</div>
        <div className="flex items-center gap-6">
          {filters.map((filter) => (
            <FilterRadio
              key={filter.value}
              id={`map-filter-${filter.value}`}
              name="map-filter"
              value={filter.value}
              label={filter.label}
              defaultChecked={filter.value === selectedFilter}
              onChange={onFilterChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

FilterBar.propTypes = {
  selectedFilter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

FilterBar.defaultProps = {
  selectedFilter: 'all',
  onFilterChange: () => {},
};

export default FilterBar;
