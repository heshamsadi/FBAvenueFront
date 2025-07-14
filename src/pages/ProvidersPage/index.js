import { useState } from 'react';
import MapPanel from './MapPanel';
import ProvidersTable from './ProvidersTable';
import useProviders from '../../hooks/useProviders';
import Header from '../../components/header/Header';
import Sidebar from '../../components/layout/Sidebar';
import PageTitle from '../../components/layout/PageTitle';
import SecondaryNavigation from '../../components/navigation/SecondaryNavigation';

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
    <div className="h-screen flex ">
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Header />
        <SecondaryNavigation />

        <div className="flex-1 overflow-y-auto">
          <PageTitle title="Providers lists" />

          {/* Map and table stacked view */}
          <div className=" pb-6">
            {/* Map panel */}
            <div className="h-[700px] p-3">
              <MapPanel
                providers={providers}
                selectedProvider={selectedProvider}
                onProviderSelect={selectProvider}
                mapFilter={mapFilter}
                onMapFilterChange={handleMapFilterChange}
              />
            </div>

            {/* Table panel */}
            <div className="min-h-[500px] p-3">
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
