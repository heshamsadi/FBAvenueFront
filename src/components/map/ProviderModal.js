import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FiX, FiStar, FiMapPin, FiPhone, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import { PROVIDER_TYPE_CONFIG, PROVIDER_STATUS_CONFIG } from '../../lib/constants';

/**
 * ProviderModal component - displays provider details in a modal on the map
 * @param {Object} props
 * @param {Object} props.provider - Provider data
 * @param {Function} props.onClose - Function to close the modal
 * @param {Object} props.mapRef - Reference to map container for positioning
 * @returns {JSX.Element}
 */
function ProviderModal({ provider, onClose, mapRef }) {
  const [modalPosition, setModalPosition] = useState({});

  // Calculate modal position based on provider coordinates
  const calculateModalPosition = () => {
    if (!mapRef?.current || !provider.coordinates) {
      return {}; // Return empty object to use CSS positioning
    }

    try {
      const mapContainer = mapRef.current;
      // eslint-disable-next-line no-underscore-dangle
      const mapInstance = mapContainer._leaflet_map;
      
      if (!mapInstance) {
        return {};
      }

      // Convert lat/lng to pixel coordinates on the map
      const point = mapInstance.latLngToContainerPoint([
        provider.coordinates.lat,
        provider.coordinates.lng,
      ]);

      // Modal dimensions (approximate)
      const modalWidth = 320; // w-80 = 20rem = 320px
      const modalHeight = 400; // Approximate height

      // Get map container dimensions
      const mapWidth = mapContainer.offsetWidth;
      const mapHeight = mapContainer.offsetHeight;

      // Calculate position with smart positioning to avoid going off-screen
      let left = point.x + 20; // 20px offset from marker
      let top = point.y - modalHeight / 2; // Center vertically relative to marker

      // Adjust if modal would go off the right edge
      if (left + modalWidth > mapWidth) {
        left = point.x - modalWidth - 20; // Show on left side of marker
      }

      // Adjust if modal would go off the top edge
      if (top < 10) {
        top = 10;
      }

      // Adjust if modal would go off the bottom edge
      if (top + modalHeight > mapHeight - 10) {
        top = mapHeight - modalHeight - 10;
      }

      // Adjust if modal would go off the left edge (after left-side adjustment)
      if (left < 10) {
        left = 10;
      }

      return {
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        zIndex: 9999,
      };
    } catch (error) {
      console.warn('Error calculating modal position:', error);
      return {}; // Return empty object to use CSS positioning
    }
  };

  // Update modal position when provider changes
  useEffect(() => {
    if (provider) {
      const position = calculateModalPosition();
      setModalPosition(position);
    }
  }, [provider, mapRef]);

  // Early return after all hooks
  if (!provider) return null;

  const modalStyle = modalPosition;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-500 bg-green-50';
      case 'draft':
        return 'text-yellow-500 bg-yellow-50';
      case 'inactive':
        return 'text-red-500 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusDotColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'draft':
        return 'bg-yellow-500';
      case 'inactive':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getEyeIcon = (viewStatus, statusColor) => {
    if (viewStatus === 'public') {
      return <FiEye className={`w-4 h-4 ${statusColor}`} />;
    }
    if (viewStatus === 'private') {
      return <FiEyeOff className={`w-4 h-4 ${statusColor}`} />;
    }
    return <FiEye className={`w-4 h-4 ${statusColor}`} />;
  };

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      stars.push(
        <FiStar
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />,
      );
    }
    return stars;
  };

  const typeConfig = PROVIDER_TYPE_CONFIG[provider.type];
  const statusConfig = PROVIDER_STATUS_CONFIG[provider.status];

  return (
    <div 
      className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 w-80 z-[9999]"
      style={modalStyle}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            {typeConfig?.icon && <typeConfig.icon className="w-5 h-5 text-gray-600" />}
            <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
          </div>
          {provider.favorites && (
            <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Status and Type */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(provider.status)}`}>
              <span className={`w-2 h-2 ${getStatusDotColor(provider.status)} rounded-full mr-1`} />
              {statusConfig?.label || provider.status}
            </span>
            <span className="text-sm text-gray-500">{typeConfig?.label || provider.type}</span>
          </div>
          {getEyeIcon(provider.views, getStatusColor(provider.status).split(' ')[0])}
        </div>

        {/* Rating for Hotels */}
        {provider.type === 'hotel' && provider.rating && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Rating:</span>
            <div className="flex items-center">
              {renderRating(provider.rating)}
              <span className="ml-1 text-sm text-gray-500">
                (
                {provider.rating}
                /5)
              </span>
            </div>
          </div>
        )}

        {/* Location */}
        <div className="flex items-start space-x-2">
          <FiMapPin className="w-4 h-4 text-gray-500 mt-0.5" />
          <div className="text-sm text-gray-600">
            <div>{provider.country}</div>
            <div>{provider.city}</div>
            {provider.address && <div className="text-gray-500">{provider.address}</div>}
          </div>
        </div>

        {/* Contact Info */}
        {(provider.phone || provider.email) && (
          <div className="space-y-2">
            {provider.phone && (
              <div className="flex items-center space-x-2">
                <FiPhone className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{provider.phone}</span>
              </div>
            )}
            {provider.email && (
              <div className="flex items-center space-x-2">
                <FiMail className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{provider.email}</span>
              </div>
            )}
          </div>
        )}

        {/* Additional Details */}
        {provider.type === 'pitch' && provider.pitchType && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Pitch Type:</span>
            {' '}
            {provider.pitchType}
          </div>
        )}

        {provider.type === 'stadium' && provider.capacity && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Capacity:</span>
            {' '}
            {provider.capacity.toLocaleString()}
          </div>
        )}

        {provider.type === 'transport' && provider.transportType && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Transport Type:</span>
            {' '}
            {provider.transportType}
          </div>
        )}

        {provider.description && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Description:</span>
            <div className="mt-1">{provider.description}</div>
          </div>
        )}
      </div>
    </div>
  );
}

ProviderModal.propTypes = {
  provider: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    favorites: PropTypes.bool.isRequired,
    views: PropTypes.string.isRequired,
    rating: PropTypes.number,
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    pitchType: PropTypes.string,
    capacity: PropTypes.number,
    transportType: PropTypes.string,
    description: PropTypes.string,
    coordinates: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  mapRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};

ProviderModal.defaultProps = {
  provider: null,
  mapRef: null,
};

export default ProviderModal; 