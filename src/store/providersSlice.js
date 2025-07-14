import { create } from 'zustand';
import { generateMockProviders } from '../lib/mockData';

/**
 * Providers store slice using Zustand
 * @typedef {Object} ProvidersState
 * @property {Array} providers - List of all providers
 * @property {string|null} selectedProviderId - Currently selected provider ID
 * @property {string} filterType - Active filter type ('all' or specific provider type)
 * @property {Function} setProviders - Set providers list
 * @property {Function} setSelectedProvider - Set selected provider
 * @property {Function} setFilterType - Set filter type
 * @property {Function} getFilteredProviders - Get filtered providers based on current filter
 */
const useProvidersStore = create((set, get) => ({
  // State
  providers: [],
  selectedProviderId: null,
  filterType: 'all',

  // Actions
  setProviders: (providers) => set({ providers }),

  setSelectedProvider: (providerId) => set({ selectedProviderId: providerId }),

  setFilterType: (filterType) => set({ filterType }),

  // Computed/derived state
  getFilteredProviders: () => {
    const { providers, filterType } = get();
    if (filterType === 'all') {
      return providers;
    }
    return providers.filter((provider) => provider.type === filterType);
  },

  // Initialize with mock data
  initializeProviders: () => {
    const mockProviders = generateMockProviders();
    set({ providers: mockProviders });
  },

  // Update provider favorites
  updateProviderFavorites: (providerId, isFavorited) => {
    const { providers } = get();
    const updatedProviders = providers.map((provider) => {
      if (provider.id === providerId) {
        return { ...provider, favorites: isFavorited };
      }
      return provider;
    });
    set({ providers: updatedProviders });
  },
}));

export default useProvidersStore;
