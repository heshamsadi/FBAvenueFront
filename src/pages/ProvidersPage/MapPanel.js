import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMap from '../../hooks/useMap';
import FilterBar from '../../components/filters/FilterBar';
import MapControls from '../../components/map/MapControls';
import MapEnabledButton from '../../components/map/MapEnabledButton';

/**
 * MapPanel feature - displays a map with provider markers
 * @param {Object} props
 * @param {Array} props.providers - List of providers to display on map
 * @param {Object|null} props.selectedProvider - Currently selected provider
 * @param {Function} props.onProviderSelect - Provider selection handler
 * @param {string} props.mapFilter - Current map filter selection
 * @param {Function} props.onMapFilterChange - Map filter change handler
 * @returns {JSX.Element}
 */
function MapPanel({ providers, selectedProvider, onProviderSelect, mapFilter, onMapFilterChange }) {
  const mapRef = useRef(null);
  const { panTo, addMarkers, zoomIn, zoomOut } = useMap({ mapRef });

  // Update markers when providers change
  useEffect(() => {
    if (providers) {
      addMarkers(providers, (provider) => {
        onProviderSelect(provider.id);
      });
    }
  }, [providers, addMarkers, onProviderSelect]);

  // Pan to selected provider
  useEffect(() => {
    if (selectedProvider && selectedProvider.coordinates) {
      panTo(selectedProvider.coordinates, 15);
    }
  }, [selectedProvider, panTo]);

  const handleZoomIn = () => {
    if (zoomIn) {
      zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (zoomOut) {
      zoomOut();
    }
  };

  return (
    <div className="relative h-full bg-white rounded-md  overflow-hidden flex flex-col">
      {/* Map container - adjusted height to account for filter bar */}
      <div className="flex-1 relative">
        <div ref={mapRef} className="h-full w-full" />

        <MapEnabledButton />
        <MapControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </div>

      {/* Filter tabs bar - now using FilterBar component */}
      <FilterBar
        selectedFilter={mapFilter}
        onFilterChange={onMapFilterChange}
      />
    </div>
  );
}

MapPanel.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    coordinates: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  })).isRequired,
  selectedProvider: PropTypes.shape({
    id: PropTypes.number.isRequired,
    coordinates: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  }),
  onProviderSelect: PropTypes.func.isRequired,
  mapFilter: PropTypes.string,
  onMapFilterChange: PropTypes.func,
};

MapPanel.defaultProps = {
  selectedProvider: null,
  mapFilter: 'all',
  onMapFilterChange: () => {},
};

export default MapPanel;
