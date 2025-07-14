import { useState } from 'react';
import MapPanel from './MapPanel';
import ProvidersTable from './ProvidersTable';
import useProviders from '../../hooks/useProviders';
import Header from '../../components/header/Header';
import Sidebar from '../../components/layout/Sidebar';
import PageTitle from '../../components/layout/PageTitle';

/**
 * ProvidersScreen - Main screen component for the Providers Lists feature
 * @returns {JSX.Element}
 */
function ProvidersScreen() {
  const {
    providers,
    selectedProvider,
    selectedProviderId,
    selectProvider,
  } = useProviders();

  // Map filter state
  const [mapFilter, setMapFilter] = useState('all');

  // Search filters state
  const [searchFilters, setSearchFilters] = useState({
    type: '',
    name: '',
    location: '',
    status: '',
    favored: false,
  });

  const handleMapFilterChange = (e) => {
    setMapFilter(e.target.value);
  };

  const handleSearchFiltersChange = (newFilters) => {
    setSearchFilters(newFilters);
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 flex flex-col overflow-hidden">
          <PageTitle title="Providers lists" />

          {/* Map and table stacked view */}
          <div className="flex-1 flex flex-col bg-gray-100">
            {/* Map panel */}
            <div className="flex-1 p-3">
              <MapPanel
                providers={providers}
                selectedProvider={selectedProvider}
                onProviderSelect={selectProvider}
                mapFilter={mapFilter}
                onMapFilterChange={handleMapFilterChange}
              />
            </div>

            {/* Table panel */}
            <div className="flex-1 p-3 overflow-hidden">
              <ProvidersTable
                providers={providers}
                selectedProviderId={selectedProviderId}
                onProviderSelect={selectProvider}
                searchFilters={searchFilters}
                onSearchFiltersChange={handleSearchFiltersChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProvidersScreen;
