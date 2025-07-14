import PropTypes from 'prop-types';
import FilterRadio from '../filters/FilterRadio';

/**
 * MapControlBar - Control bar below the map with map enabled button and filter tabs
 * @param {Object} props
 * @param {Function} props.onMapToggle - Map toggle handler
 * @param {string} props.selectedFilter - Currently selected filter value
 * @param {Function} props.onFilterChange - Filter change handler
 * @returns {JSX.Element}
 */
function MapControlBar({ onMapToggle, selectedFilter, onFilterChange }) {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pitches', label: 'Pitches' },
    { value: 'stadiums', label: 'Stadiums' },
    { value: 'transports', label: 'Transports' },
    { value: 'laundry', label: 'Laundry' },
    { value: 'water-bolt', label: 'Water Bolt' },
  ];

  return (
    <div className="bg-white bg-lite-blue">
      <div className="flex items-center justify-start bg-lite-blue">
        {/* Map enabled button - styled like header navigation buttons */}
        <div className="flex items-center rounded overflow-hidden text-sm my-[5px] mx-[25px] font-medium transition-colors bg-main-blue text-white hover:bg-dark-blue">
          {/* Left darker section with icon */}
          <button
            type="button"
            onClick={onMapToggle}
            className="flex items-center justify-center w-8 h-8 bg-dark-blue text-white"
            aria-label="Toggle map"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </button>

          {/* Right section with title */}
          <button
            type="button"
            onClick={onMapToggle}
            className="flex-1 px-3 py-2 text-left"
          >
            Map Enabled
          </button>
        </div>

        {/* Filter tabs on the right */}
        <div className="flex items-center gap-6">
          <div className="text-xl font-medium text-gray-700">Providers</div>
          {filters.map((filter) => (
            <FilterRadio
              key={filter.value}
              id={`map-filter-${filter.value}`}
              name="map-filter"
              value={filter.value}
              label={filter.label}
              checked={filter.value === selectedFilter}
              onChange={onFilterChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

MapControlBar.propTypes = {
  onMapToggle: PropTypes.func,
  selectedFilter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

MapControlBar.defaultProps = {
  onMapToggle: () => {},
  selectedFilter: 'all',
  onFilterChange: () => {},
};

export default MapControlBar;