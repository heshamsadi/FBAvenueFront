import PropTypes from 'prop-types';
import { useState } from 'react';
import { FiStar, FiMail, FiEye, FiEyeOff, FiMinus } from 'react-icons/fi';
import { PROVIDER_TYPE_CONFIG, PROVIDER_STATUS_CONFIG } from '../../lib/constants';
import useProvidersStore from '../../store/providersSlice';

/**
 * ProviderRow component - displays a single provider row in the table
 * @param {Object} props
 * @param {Object} props.provider - Provider data
 * @param {boolean} props.isSelected - Whether the row is selected for map sync
 * @param {boolean} props.isBulkSelected - Whether the row is selected for bulk operations
 * @param {Function} props.onSelect - Function to handle provider selection
 * @returns {JSX.Element}
 */
function ProviderRow({ provider, isSelected, isBulkSelected, onSelect }) {
  const [isFavorited, setIsFavorited] = useState(provider.favorites);
  const { updateProviderFavorites } = useProvidersStore();
  
  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    const newFavoriteState = !isFavorited;
    setIsFavorited(newFavoriteState);
    // Update provider data in the store
    updateProviderFavorites(provider.id, newFavoriteState);
  };

  const handleCheckAction = (e) => {
    e.stopPropagation();
    // Handle check action - show provider details/edit form
    alert(`Provider Details for ${provider.name}\n\nID: ${provider.id}\nType: ${provider.type}\nCountry: ${provider.country}\nCity: ${provider.city}\nStatus: ${provider.status}\n\nThis would open a details/edit modal in a real app.`);
  };

  const handleNameClick = (e) => {
    e.stopPropagation();
    // Handle name click - show provider details
    alert(`Provider Details for ${provider.name}\n\nID: ${provider.id}\nType: ${provider.type}\nCountry: ${provider.country}\nCity: ${provider.city}\nStatus: ${provider.status}\n\nThis would open a details page in a real app.`);
  };

  // Get status color for dots and eye icons
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'draft':
        return 'text-yellow-500';
      case 'inactive':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  // Get status dot color
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

  // Get eye icon based on view status
  const getEyeIcon = (viewStatus, statusColor) => {
    switch (viewStatus) {
      case 'visible':
        return <FiEye className={`w-4 h-4 ${statusColor}`} />;
      case 'invisible':
        return <FiEyeOff className={`w-4 h-4 ${statusColor}`} />;
      case 'closed':
        return <FiMinus className={`w-4 h-4 ${statusColor}`} />;
      default:
        return <FiEye className={`w-4 h-4 ${statusColor}`} />;
    }
  };

  const statusColor = getStatusColor(provider.status);
  const statusDotColor = getStatusDotColor(provider.status);

  return (
    <tr
      onClick={() => onSelect(provider.id)}
      className={`hover:bg-gray-50 cursor-pointer transition-colors text-sm ${isSelected ? 'bg-blue-50' : ''}`}
    >
      {/* Selected */}
      <td className="px-3 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isBulkSelected}
            onChange={() => onSelect(provider.id)}
            onClick={(e) => e.stopPropagation()}
            className="h-4 w-4 text-main-blue focus:ring-main-blue border-gray-300 rounded"
            aria-label={`Select ${provider.name}`}
          />
        </div>
      </td>

      {/* Date Added */}
      <td className="px-3 py-4 border-b border-gray-200">
        <span className="text-gray-700">{provider.dateAdded}</span>
      </td>

      {/* Type */}
      <td className="px-3 py-4 border-b border-gray-200">
        <span className="text-gray-700">
          {PROVIDER_TYPE_CONFIG[provider.type]?.label || provider.type}
        </span>
      </td>

      {/* Name */}
      <td className="px-3 py-4 border-b border-gray-200">
        <button
          type="button"
          onClick={handleNameClick}
          className="font-medium text-gray-900 hover:text-main-blue hover:underline transition-colors"
        >
          {provider.name}
        </button>
      </td>

      {/* Continent */}
      <td className="px-3 py-4 border-b border-gray-200">
        <span className="text-gray-700">{provider.continent || '-'}</span>
      </td>

      {/* Country */}
      <td className="px-3 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-gray-700">{provider.country}</span>
        </div>
      </td>

      {/* City */}
      <td className="px-3 py-4 border-b border-gray-200">
        <span className="text-gray-700">{provider.city}</span>
      </td>

      {/* Workspace */}
      <td className="px-3 py-4 border-b border-gray-200">
        <span className="text-gray-700">{provider.workspace}</span>
      </td>

      {/* Status */}
      <td className="px-3 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusDotColor}`} />
          <span className="text-gray-700">
            {PROVIDER_STATUS_CONFIG[provider.status]?.label || provider.status}
          </span>
        </div>
      </td>

      {/* Views */}
      <td className="px-3 py-4 border-b border-gray-200">
        <div className="flex items-center justify-center">
          {getEyeIcon(provider.views, statusColor)}
        </div>
      </td>

      {/* Favorites */}
      <td className="px-3 py-4 border-b border-gray-200">
        <button
          type="button"
          onClick={handleFavoriteToggle}
          className="hover:opacity-80 transition-opacity"
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiStar 
            className={`w-4 h-4 ${isFavorited ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
            fill={isFavorited ? 'currentColor' : 'none'}
          />
        </button>
      </td>

      {/* Actions */}
      <td className="px-3 py-4 border-b border-gray-200">
        <div className="flex items-center rounded overflow-hidden text-sm font-medium transition-colors bg-main-blue text-white hover:bg-dark-blue w-[100px]">
          {/* Left darker section with icon */}
          <button
            type="button"
            onClick={handleCheckAction}
            className="flex items-center justify-center w-8 h-8 bg-dark-blue text-white"
            aria-label="Check provider"
          >
            <FiMail size={16} />
          </button>

          {/* Right section with title */}
          <button
            type="button"
            onClick={handleCheckAction}
            className="flex-1 px-3 py-2 text-left"
          >
            Check
          </button>
        </div>
      </td>
    </tr>
  );
}

ProviderRow.propTypes = {
  provider: PropTypes.shape({
    id: PropTypes.number.isRequired,
    dateAdded: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    continent: PropTypes.string,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    workspace: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired,
    favorites: PropTypes.bool.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  isBulkSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ProviderRow;
