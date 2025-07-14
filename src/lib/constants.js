/**
 * Provider type constants
 */
export const PROVIDER_TYPES = {
  HOTEL: 'hotel',
  PITCH: 'pitch',
  STADIUM: 'stadium',
  TRANSPORT: 'transport',
  LAUNDRY: 'laundry',
  WATER_BOLT: 'water_bolt',
};

/**
 * Provider type configuration with colors and labels
 */
export const PROVIDER_TYPE_CONFIG = {
  [PROVIDER_TYPES.HOTEL]: {
    label: 'Hotel',
    color: 'bg-main-blue',
    icon: '🏨',
  },
  [PROVIDER_TYPES.RESTAURANT]: {
    label: 'Restaurant',
    color: 'bg-green-500',
    icon: '🍽️',
  },
  [PROVIDER_TYPES.ACTIVITY]: {
    label: 'Activity',
    color: 'bg-yellow-500',
    icon: '🏃',
  },
  [PROVIDER_TYPES.TRANSPORT]: {
    label: 'Transport',
    color: 'bg-purple-500',
    icon: '🚗',
  },
  [PROVIDER_TYPES.VENUE]: {
    label: 'Venue',
    color: 'bg-red-500',
    icon: '🏟️',
  },
};

/**
 * Provider status constants
 */
export const PROVIDER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
};

/**
 * Provider status configuration
 */
export const PROVIDER_STATUS_CONFIG = {
  [PROVIDER_STATUS.ACTIVE]: {
    label: 'Active',
    color: 'bg-green-100 text-green-800',
    dotColor: 'bg-green-500',
  },
  [PROVIDER_STATUS.INACTIVE]: {
    label: 'Inactive',
    color: 'bg-red-100 text-red-800',
    dotColor: 'bg-red-500',
  },
  [PROVIDER_STATUS.DRAFT]: {
    label: 'Draft',
    color: 'bg-yellow-100 text-yellow-800',
    dotColor: 'bg-yellow-500',
  },
};
