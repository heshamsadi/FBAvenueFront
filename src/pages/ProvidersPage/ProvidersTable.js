import PropTypes from 'prop-types';
import ProviderRow from '../../components/table/ProviderRow';
import SearchBar from '../../components/search/SearchBar';
import TableHeader from '../../components/table/TableHeader';
import TablePagination from '../../components/table/TablePagination';
import EmptyState from '../../components/table/EmptyState';

/**
 * ProvidersTable feature - displays providers in a table format
 * @param {Object} props
 * @param {Array} props.providers - List of providers to display
 * @param {number|null} props.selectedProviderId - Currently selected provider ID
 * @param {Function} props.onProviderSelect - Provider selection handler
 * @param {Object} props.searchFilters - Search filter values
 * @param {Function} props.onSearchFiltersChange - Search filters change handler
 * @returns {JSX.Element}
 */
function ProvidersTable({
  providers,
  selectedProviderId,
  onProviderSelect,
  searchFilters,
  onSearchFiltersChange,
}) {
  const handleFilterChange = (field, value) => {
    onSearchFiltersChange({
      ...searchFilters,
      [field]: value,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const handlePageChange = (_page) => {
    // TODO: Implement pagination logic
    // onPageChange(page);
  };

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden h-full flex flex-col">
      {/* Search bar - now using SearchBar component */}
      <SearchBar
        typeFilter={searchFilters.type}
        nameSearch={searchFilters.name}
        locationSearch={searchFilters.location}
        statusFilter={searchFilters.status}
        onTypeFilterChange={(e) => handleFilterChange('type', e.target.value)}
        onNameSearchChange={(e) => handleFilterChange('name', e.target.value)}
        onLocationSearchChange={(e) => handleFilterChange('location', e.target.value)}
        onStatusFilterChange={(e) => handleFilterChange('status', e.target.value)}
        onFavoredClick={() => handleFilterChange('favored', !searchFilters.favored)}
      />

      <div className="flex-1 overflow-auto">
        <table className="min-w-full">
          <TableHeader />
          <tbody className="bg-white divide-y divide-gray-100">
            {providers.length === 0 ? (
              <EmptyState message="No providers found" colSpan={12} />
            ) : (
              providers.map((provider) => (
                <ProviderRow
                  key={provider.id}
                  provider={provider}
                  isSelected={provider.id === selectedProviderId}
                  onSelect={onProviderSelect}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table footer with pagination */}
      <TablePagination
        currentPage={1}
        totalPages={4}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

ProvidersTable.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  selectedProviderId: PropTypes.number,
  onProviderSelect: PropTypes.func.isRequired,
  searchFilters: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string,
    favored: PropTypes.bool,
  }),
  onSearchFiltersChange: PropTypes.func,
};

ProvidersTable.defaultProps = {
  selectedProviderId: null,
  searchFilters: {
    type: '',
    name: '',
    location: '',
    status: '',
    favored: false,
  },
  onSearchFiltersChange: () => {},
};

export default ProvidersTable;
