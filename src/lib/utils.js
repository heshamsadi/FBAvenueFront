/**
 * Filter providers based on search criteria
 * @param {Array} providers - Array of provider objects
 * @param {Object} filters - Filter criteria
 * @param {string} filters.type - Provider type filter
 * @param {string} filters.name - Name search filter
 * @param {string} filters.location - Location search filter (country/city)
 * @param {string} filters.status - Status filter
 * @param {boolean} filters.favored - Show only favorited providers
 * @returns {Array} Filtered providers
 */
export const filterProviders = (providers, filters) => {
  if (!providers || providers.length === 0) return [];
  
  return providers.filter((provider) => {
    // Type filter
    if (filters.type && provider.type !== filters.type) {
      return false;
    }
    
    // Name search filter
    if (filters.name && !provider.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }
    
    // Location search filter (searches both country and city)
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      const matchesCountry = provider.country.toLowerCase().includes(locationLower);
      const matchesCity = provider.city.toLowerCase().includes(locationLower);
      const matchesContinent = provider.continent.toLowerCase().includes(locationLower);
      
      if (!matchesCountry && !matchesCity && !matchesContinent) {
        return false;
      }
    }
    
    // Status filter
    if (filters.status && provider.status !== filters.status) {
      return false;
    }
    
    // Favored filter
    if (filters.favored && provider.favorites !== true) {
      return false;
    }
    
    return true;
  });
};

/**
 * Filter providers by category type
 * @param {Array} providers - Array of provider objects
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered providers
 */
export const filterProvidersByCategory = (providers, category) => {
  if (!providers || providers.length === 0 || !category) return providers;
  
  const categoryMap = {
    hotels: 'hotel',
    pitches: 'pitch',
    stadiums: 'stadium',
    'ice-batch': 'water_bolt',
  };
  
  const providerType = categoryMap[category];
  if (!providerType) return providers;
  
  return providers.filter((provider) => provider.type === providerType);
};

/**
 * Filter providers by map filter value
 * @param {Array} providers - Array of provider objects
 * @param {string} mapFilter - Map filter value
 * @returns {Array} Filtered providers
 */
export const filterProvidersByMapFilter = (providers, mapFilter) => {
  if (!providers || providers.length === 0 || !mapFilter || mapFilter === 'all') return providers;
  
  const mapFilterMap = {
    pitches: 'pitch',
    stadiums: 'stadium',
    transports: 'transport',
    laundry: 'laundry',
    'water-bolt': 'water_bolt',
  };
  
  const providerType = mapFilterMap[mapFilter];
  if (!providerType) return providers;
  
  return providers.filter((provider) => provider.type === providerType);
};

/**
 * Sort providers by a specific field
 * @param {Array} providers - Array of provider objects
 * @param {string} field - Field to sort by
 * @param {string} direction - Sort direction ('asc' or 'desc')
 * @returns {Array} Sorted providers
 */
export const sortProviders = (providers, field, direction = 'asc') => {
  if (!providers || providers.length === 0) return [];
  
  return [...providers].sort((a, b) => {
    let aValue = a[field];
    let bValue = b[field];
    
    // Handle views field special sorting (visible > invisible > closed)
    if (field === 'views') {
      const viewOrder = { visible: 3, invisible: 2, closed: 1 };
      aValue = viewOrder[aValue] || 0;
      bValue = viewOrder[bValue] || 0;
    } else if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    // Handle date sorting
    if (field === 'dateAdded') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    let comparison = 0;
    if (aValue < bValue) {
      comparison = -1;
    } else if (aValue > bValue) {
      comparison = 1;
    }
    
    return direction === 'desc' ? comparison * -1 : comparison;
  });
};

/**
 * Paginate providers array
 * @param {Array} providers - Array of provider objects
 * @param {number} page - Current page number (1-based)
 * @param {number} itemsPerPage - Number of items per page
 * @returns {Object} Pagination result with data and metadata
 */
export const paginateProviders = (providers, page = 1, itemsPerPage = 10) => {
  if (!providers || providers.length === 0) {
    return {
      data: [],
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      itemsPerPage,
    };
  }
  
  const totalItems = providers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const data = providers.slice(startIndex, endIndex);
  
  return {
    data,
    currentPage: page,
    totalPages,
    totalItems,
    itemsPerPage,
  };
}; 