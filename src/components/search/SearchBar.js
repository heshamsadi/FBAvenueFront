import PropTypes from 'prop-types';
import SearchInput from './SearchInput';
import Select from '../common/Select';
import { PROVIDER_TYPES, PROVIDER_STATUS } from '../../lib/constants';

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
}) {
  const typeOptions = [
    { value: PROVIDER_TYPES.HOTEL, label: 'Hotel' },
    { value: PROVIDER_TYPES.PITCH, label: 'Pitch' },
    { value: PROVIDER_TYPES.STADIUM, label: 'Stadium' },
    { value: PROVIDER_TYPES.TRANSPORT, label: 'Transport' },
    { value: PROVIDER_TYPES.LAUNDRY, label: 'Laundry' },
    { value: PROVIDER_TYPES.WATER_BOLT, label: 'Water Bolt' },
  ];

  const statusOptions = [
    { value: PROVIDER_STATUS.ACTIVE, label: 'Active' },
    { value: PROVIDER_STATUS.INACTIVE, label: 'Inactive' },
    { value: PROVIDER_STATUS.DRAFT, label: 'Draft' },
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
};

export default SearchBar;
