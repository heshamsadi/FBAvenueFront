import PropTypes from 'prop-types';
import SearchInput from './SearchInput';
import Select from '../common/Select';
import Button from '../common/Button';

/**
 * SearchBar - Table search bar with filters and search inputs
 * @param {Object} props
 * @param {string} props.typeFilter - Selected type filter
 * @param {string} props.nameSearch - Name search value
 * @param {string} props.locationSearch - Location search value
 * @param {string} props.statusFilter - Selected status filter
 * @param {Function} props.onTypeFilterChange - Type filter change handler
 * @param {Function} props.onNameSearchChange - Name search change handler
 * @param {Function} props.onLocationSearchChange - Location search change handler
 * @param {Function} props.onStatusFilterChange - Status filter change handler
 * @param {Function} props.onFavoredClick - Favored filter click handler
 * @returns {JSX.Element}
 */
function SearchBar({
  typeFilter,
  nameSearch,
  locationSearch,
  statusFilter,
  onTypeFilterChange,
  onNameSearchChange,
  onLocationSearchChange,
  onStatusFilterChange,
  onFavoredClick,
}) {
  const typeOptions = [
    { value: 'hotel', label: 'Hotel' },
    { value: 'pitch', label: 'Pitch' },
    { value: 'stadium', label: 'Stadium' },
    { value: 'logistic', label: 'Logistic' },
    { value: 'airport', label: 'Airport' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'draft', label: 'Draft' },
  ];

  return (
    <div className="p-4 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Select
            options={typeOptions}
            placeholder="Search by type"
            value={typeFilter}
            onChange={onTypeFilterChange}
          />
        </div>

        <div className="flex-1">
          <SearchInput
            placeholder="Search by name"
            value={nameSearch}
            onChange={onNameSearchChange}
            showIcon
          />
        </div>

        <div className="flex-1">
          <SearchInput
            placeholder="Search by Country / City"
            value={locationSearch}
            onChange={onLocationSearchChange}
            showIcon
          />
        </div>

        <div className="flex-1">
          <Select
            options={statusOptions}
            placeholder="Active / Inactive / Draft"
            value={statusFilter}
            onChange={onStatusFilterChange}
          />
        </div>

        <Button variant="primary" size="sm" onClick={onFavoredClick}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Filtered by favored
        </Button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  typeFilter: PropTypes.string,
  nameSearch: PropTypes.string,
  locationSearch: PropTypes.string,
  statusFilter: PropTypes.string,
  onTypeFilterChange: PropTypes.func,
  onNameSearchChange: PropTypes.func,
  onLocationSearchChange: PropTypes.func,
  onStatusFilterChange: PropTypes.func,
  onFavoredClick: PropTypes.func,
};

SearchBar.defaultProps = {
  typeFilter: '',
  nameSearch: '',
  locationSearch: '',
  statusFilter: '',
  onTypeFilterChange: () => {},
  onNameSearchChange: () => {},
  onLocationSearchChange: () => {},
  onStatusFilterChange: () => {},
  onFavoredClick: () => {},
};

export default SearchBar;
