import { useEffect, useRef } from 'react';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { PROVIDER_TYPE_CONFIG } from '../lib/constants';

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
function useMap({ mapRef, center = { lat: 33.5731, lng: -7.5898 }, zoom = 11 }) {
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return undefined;

    // Create map instance
    const map = L.map(mapRef.current).setView([center.lat, center.lng], zoom);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

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
    markersRef.current.forEach((marker) => {
      marker.remove();
    });
    markersRef.current = [];
  };

  // Add markers to map
  const addMarkers = (providers, onMarkerClick) => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    clearMarkers();

    // Add new markers
    providers.forEach((provider) => {
      if (provider.coordinates) {
        const config = PROVIDER_TYPE_CONFIG[provider.type];
        const color = config ? config.color : 'bg-gray-500';
        const icon = config ? config.icon : '📍';

        // Create custom div icon
        const divIcon = L.divIcon({
          html: `<div class="${color} text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                   ${icon}
                 </div>`,
          className: 'custom-div-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([provider.coordinates.lat, provider.coordinates.lng], {
          icon: divIcon,
        }).addTo(mapInstanceRef.current);

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

        markersRef.current.push(marker);
      }
    });
  };

  // Fit bounds to show all markers
  const fitBounds = () => {
    if (mapInstanceRef.current && markersRef.current.length > 0) {
      // eslint-disable-next-line new-cap
      const group = new L.featureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  };

  return {
    panTo,
    addMarkers,
    clearMarkers,
    fitBounds,
  };
}

export default useMap;
