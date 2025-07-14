import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import ProviderRow from '../../components/table/ProviderRow';
import SearchBar from '../../components/search/SearchBar';
import CategoryFilterBar from '../../components/filters/CategoryFilterBar';
import TableHeader from '../../components/table/TableHeader';
import TablePagination from '../../components/table/TablePagination';
import EmptyState from '../../components/table/EmptyState';
import { filterProviders, filterProvidersByCategory, filterProvidersByMapFilter, sortProviders, paginateProviders } from '../../lib/utils';

/**
 * ProvidersTable feature - displays providers in a table format
 * @param {Object} props
 * @param {Array} props.providers - List of providers to display
 * @param {number|null} props.selectedProviderId - Currently selected provider ID
 * @param {Function} props.onProviderSelect - Provider selection handler
 * @param {Object} props.searchFilters - Search filter values
 * @param {Function} props.onSearchFiltersChange - Search filters change handler
 * @param {string} props.mapFilter - Map filter value
 * @returns {JSX.Element}
 */
function ProvidersTable({
  providers,
  selectedProviderId,
  onProviderSelect,
  searchFilters,
  onSearchFiltersChange,
  mapFilter,
}) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [favoredFilter, setFavoredFilter] = useState(false);
  const [selectedProviderIds, setSelectedProviderIds] = useState(new Set());
  const [lastSelectedProviderId, setLastSelectedProviderId] = useState(null);
  
  const itemsPerPage = 10;

  // Apply all filters and sorting
  const processedProviders = useMemo(() => {
    // Start with all providers
    let filtered = [...providers];
    
    // Apply map filter first
    filtered = filterProvidersByMapFilter(filtered, mapFilter);
    
    // Apply search filters
    const searchFilterObj = {
      ...searchFilters,
      favored: favoredFilter,
    };
    filtered = filterProviders(filtered, searchFilterObj);
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filterProvidersByCategory(filtered, selectedCategory);
    }
    
    // Apply sorting
    if (sortField) {
      filtered = sortProviders(filtered, sortField, sortDirection);
    }
    
    return filtered;
  }, [
    providers,
    searchFilters,
    selectedCategory,
    sortField,
    sortDirection,
    favoredFilter,
    mapFilter,
  ]);

  // Apply pagination
  const paginationResult = useMemo(
    () => paginateProviders(processedProviders, currentPage, itemsPerPage),
    [processedProviders, currentPage, itemsPerPage],
  );

  const handleFilterChange = (field, value) => {
    onSearchFiltersChange({
      ...searchFilters,
      [field]: value,
    });
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
    // Reset to first page when category changes
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Allow page changes while preserving selection
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  const handleFavoredFilterToggle = () => {
    setFavoredFilter(!favoredFilter);
    // Reset to first page when favored filter changes
    setCurrentPage(1);
  };

  const handleBulkSelect = (isChecked) => {
    if (isChecked) {
      // Select all visible providers
      const visibleProviderIds = new Set(paginationResult.data.map((p) => p.id));
      setSelectedProviderIds(visibleProviderIds);
    } else {
      // Deselect all
      setSelectedProviderIds(new Set());
    }
  };

  const handleProviderSelect = (providerId) => {
    const newSelected = new Set(selectedProviderIds);
    if (newSelected.has(providerId)) {
      newSelected.delete(providerId);
    } else {
      newSelected.add(providerId);
    }
    setSelectedProviderIds(newSelected);
  };

  const handleRowNameClick = (providerId) => {
    // When provider name is clicked, select for map sync
    onProviderSelect(providerId);
  };

  // Effect to handle map provider selection - switch to page if selected provider is not visible
  // Only auto-switch when selection actually changes, not during manual pagination
  React.useEffect(() => {
    if (selectedProviderId && selectedProviderId !== lastSelectedProviderId) {
      setLastSelectedProviderId(selectedProviderId);
      
      // Check if provider is visible on current page
      const isProviderVisible = paginationResult.data.some((p) => p.id === selectedProviderId);
      if (!isProviderVisible && processedProviders.length > 0) {
        const providerIndex = processedProviders.findIndex((p) => p.id === selectedProviderId);
        if (providerIndex !== -1) {
          const targetPage = Math.floor(providerIndex / itemsPerPage) + 1;
          setCurrentPage(targetPage);
        }
      }
    }
  }, [selectedProviderId, lastSelectedProviderId, processedProviders, paginationResult.data, itemsPerPage]);

  // Reset lastSelectedProviderId when selectedProviderId becomes null
  React.useEffect(() => {
    if (!selectedProviderId) {
      setLastSelectedProviderId(null);
    }
  }, [selectedProviderId]);

  const areAllVisibleSelected = paginationResult.data.length > 0 
    && paginationResult.data.every((provider) => selectedProviderIds.has(provider.id));

  const areSomeVisibleSelected = paginationResult.data.some((provider) => selectedProviderIds.has(provider.id));

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
      />

      {/* Category filter bar */}
      <CategoryFilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        favoredFilter={favoredFilter}
        onFavoredFilterToggle={handleFavoredFilterToggle}
      />

      <div className="flex-1 overflow-auto">
        <table className="min-w-full">
          <TableHeader 
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            areAllVisibleSelected={areAllVisibleSelected}
            areSomeVisibleSelected={areSomeVisibleSelected}
            onBulkSelect={handleBulkSelect}
          />
          <tbody className="bg-white divide-y divide-gray-100">
            {paginationResult.data.length === 0 ? (
              <EmptyState message="No providers found" colSpan={12} />
            ) : (
              paginationResult.data.map((provider) => (
                <ProviderRow
                  key={provider.id}
                  provider={provider}
                  isSelected={provider.id === selectedProviderId}
                  isBulkSelected={selectedProviderIds.has(provider.id)}
                  onSelect={handleProviderSelect}
                  onRowNameClick={handleRowNameClick}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table footer with pagination */}
      {paginationResult.totalPages > 1 && (
        <TablePagination
          currentPage={paginationResult.currentPage}
          totalPages={paginationResult.totalPages}
          onPageChange={handlePageChange}
        />
      )}
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
  mapFilter: PropTypes.string,
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
  mapFilter: '',
};

export default ProvidersTable;
