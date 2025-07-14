import PropTypes from 'prop-types';
import TypeBadge from '../common/TypeBadge';
import StatusBadge from '../common/StatusBadge';

/**
 * ProviderRow component - displays a single provider row in the table
 * @param {Object} props
 * @param {Object} props.provider - Provider data
 * @param {boolean} props.isSelected - Whether the row is selected
 * @param {Function} props.onProviderSelect - Function to handle provider selection
 * @returns {JSX.Element}
 */
function ProviderRow({ provider, isSelected, onProviderSelect }) {
  return (
    <tr
      onClick={() => onProviderSelect(provider)}
      className={`hover:bg-gray-50 cursor-pointer transition-colors text-sm ${isSelected ? 'bg-blue-50' : ''}`}
    >
      <td className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onProviderSelect(provider)}
            onClick={(e) => e.stopPropagation()}
            className="h-4 w-4 text-main-blue focus:ring-main-blue border-gray-300 rounded"
          />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="font-medium text-gray-900">{provider.name}</span>
              <span className="text-gray-500">
                (
                {provider.id}
                )
              </span>
            </div>
            <TypeBadge type={provider.type} />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-gray-700">{provider.location}</span>
        </div>
      </td>
      <td className="px-6 py-4 border-b border-gray-200">
        <StatusBadge status={provider.status} />
      </td>
      <td className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">{provider.contact}</span>
        </div>
      </td>
      <td className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">{provider.services}</span>
        </div>
      </td>
      <td className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">{provider.capacity}</span>
        </div>
      </td>
      <td className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1 bg-main-blue text-white text-xs font-medium rounded hover:bg-dark-blue transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Handle edit action
            }}
          >
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
}

ProviderRow.propTypes = {
  provider: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    services: PropTypes.string.isRequired,
    capacity: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onProviderSelect: PropTypes.func.isRequired,
};

export default ProviderRow;
