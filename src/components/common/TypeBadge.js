import PropTypes from 'prop-types';
import { PROVIDER_TYPE_CONFIG } from '../../lib/constants';

/**
 * TypeBadge component - displays a colored badge for provider types
 * @param {Object} props
 * @param {string} props.type - Provider type key
 * @returns {JSX.Element}
 */
function TypeBadge({ type }) {
  const config = PROVIDER_TYPE_CONFIG[type];

  if (!config) {
    return null;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${config.color}`}
      aria-label={`Provider type: ${config.label}`}
    >
      {config.label}
    </span>
  );
}

TypeBadge.propTypes = {
  type: PropTypes.string.isRequired,
};

export default TypeBadge;
