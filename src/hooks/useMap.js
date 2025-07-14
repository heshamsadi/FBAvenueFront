import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { PROVIDER_TYPE_CONFIG } from '../lib/constants';

// Map marker symbols (simple text/symbols for Leaflet HTML)
const MARKER_SYMBOLS = {
  hotel: '🏨',
  pitch: '⚽',
  stadium: '🏟️',
  transport: '🚗',
  laundry: '🧺',
  water_bolt: '💧',
};

// Fix Leaflet default marker icon issue
// eslint-disable-next-line no-underscore-dangle
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/**
 * useMap hook - manages Leaflet map instance and operations
 * @param {Object} options
 * @param {React.RefObject} options.mapRef - Reference to map container element
 * @param {Object} options.center - Initial map center { lat, lng }
 * @param {number} options.zoom - Initial zoom level
 * @returns {Object} Map actions and state
 */
function useMap({ mapRef, center = { lat: 33.5731, lng: -7.5898 }, zoom = 12 }) {
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const markerClusterGroupRef = useRef(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return undefined;

    // Create map instance
    const map = L.map(mapRef.current).setView([center.lat, center.lng], zoom);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Create marker cluster group
    markerClusterGroupRef.current = L.markerClusterGroup({
      chunkedLoading: true,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
    });
    
    map.addLayer(markerClusterGroupRef.current);

    mapInstanceRef.current = map;

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapRef, center.lat, center.lng, zoom]);

  // Pan to location
  const panTo = (coordinates, zoomLevel = 15) => {
    if (mapInstanceRef.current && coordinates) {
      mapInstanceRef.current.setView([coordinates.lat, coordinates.lng], zoomLevel);
    }
  };

  // Clear all markers
  const clearMarkers = () => {
    if (markerClusterGroupRef.current) {
      markerClusterGroupRef.current.clearLayers();
    }
    markersRef.current = [];
  };

  // Add markers to map
  const addMarkers = (providers, onMarkerClick, selectedProviderId = null) => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    clearMarkers();

    // Add new markers
    providers.forEach((provider) => {
      if (provider.coordinates) {
        const config = PROVIDER_TYPE_CONFIG[provider.type];
        const color = config ? config.color : 'bg-gray-500';
        const icon = MARKER_SYMBOLS[provider.type] || '📍';
        
        // Add selected state styling
        const isSelected = selectedProviderId === provider.id;
        const markerClass = isSelected 
          ? `${color} text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-xl ring-4 ring-yellow-400 ring-opacity-75`
          : `${color} text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg`;

        // Create custom div icon
        const divIcon = L.divIcon({
          html: `<div class="${markerClass}">
                   ${icon}
                 </div>`,
          className: 'custom-div-icon',
          iconSize: isSelected ? [40, 40] : [32, 32],
          iconAnchor: isSelected ? [20, 20] : [16, 16],
        });

        const marker = L.marker([provider.coordinates.lat, provider.coordinates.lng], {
          icon: divIcon,
        });

        // Add popup
        marker.bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold">${provider.name}</h3>
            <p class="text-sm text-gray-600">${provider.workspace}, ${provider.city}</p>
          </div>
        `);

        // Add click handler
        if (onMarkerClick) {
          marker.on('click', () => onMarkerClick(provider));
        }

        // Add marker to cluster group instead of directly to map
        if (markerClusterGroupRef.current) {
          markerClusterGroupRef.current.addLayer(marker);
        }

        markersRef.current.push(marker);
      }
    });
  };

  // Fit bounds to show all markers
  const fitBounds = () => {
    if (mapInstanceRef.current && markerClusterGroupRef.current && markersRef.current.length > 0) {
      mapInstanceRef.current.fitBounds(markerClusterGroupRef.current.getBounds().pad(0.1));
    }
  };

  // Zoom functions
  const zoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const zoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  return {
    panTo,
    addMarkers,
    clearMarkers,
    fitBounds,
    zoomIn,
    zoomOut,
  };
}

export default useMap;
