import { useState, useMemo } from 'react';
import MapPanel from './MapPanel';
import ProvidersTable from './ProvidersTable';
import useProviders from '../../hooks/useProviders';
import Header from '../../components/header/Header';
import Sidebar from '../../components/layout/Sidebar';
import PageTitle from '../../components/layout/PageTitle';
import SecondaryNavigation from '../../components/navigation/SecondaryNavigation';
import MapControlBar from '../../components/map/MapControlBar';
import { filterProvidersByMapFilter } from '../../lib/utils';

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

  // Map enabled state
  const [mapEnabled, setMapEnabled] = useState(true);

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

  const handleMapToggle = () => {
    setMapEnabled(!mapEnabled);
  };

  const handleMapFilterChange = (e) => {
    setMapFilter(e.target.value);
  };

  const handleSearchFiltersChange = (newFilters) => {
    setSearchFilters(newFilters);
  };

  // Filter providers based on map filter for the map display
  const filteredProvidersForMap = useMemo(() => {
    return filterProvidersByMapFilter(providers, mapFilter);
  }, [providers, mapFilter]);

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
            <div className="h-[700px] px-4">
              <MapPanel
                providers={filteredProvidersForMap}
                selectedProvider={selectedProvider}
                onProviderSelect={selectProvider}
              />
            </div>

            {/* Map control bar */}
            <div className="px-4">
              <MapControlBar
                mapEnabled={mapEnabled}
                onMapToggle={handleMapToggle}
                selectedFilter={mapFilter}
                onFilterChange={handleMapFilterChange}
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
                mapFilter={mapFilter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProvidersScreen;
