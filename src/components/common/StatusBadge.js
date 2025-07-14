import PropTypes from 'prop-types';
import { PROVIDER_STATUS_CONFIG } from '../../lib/constants';

/**
 * StatusBadge component - displays a colored badge with dot for provider status
 * @param {Object} props
 * @param {string} props.status - Provider status key
 * @returns {JSX.Element}
 */
function StatusBadge({ status }) {
  const config = PROVIDER_STATUS_CONFIG[status];

  if (!config) {
    return null;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}
      aria-label={`Status: ${config.label}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusBadge;
