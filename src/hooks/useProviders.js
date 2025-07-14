import { useMemo } from 'react';
import useProvidersStore from '../store/providersSlice';

/**
 * useProviders hook - manages provider data fetching and filtering
 * @returns {Object} Provider data and actions
 */
function useProviders() {
  const {
    providers,
    selectedProviderId,
    filterType,
    setSelectedProvider,
    setFilterType,
    getFilteredProviders,
  } = useProvidersStore();

  // Note: Providers are now initialized directly in the store, 
  // so no need for useEffect initialization

  // Get filtered providers
  const filteredProviders = useMemo(
    () => getFilteredProviders(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getFilteredProviders],
  );

  // Get selected provider object
  const selectedProvider = useMemo(
    () => providers.find((p) => p.id === selectedProviderId),
    [providers, selectedProviderId],
  );

  // Calculate provider counts by type
  const providerCounts = useMemo(() => {
    const counts = {};
    providers.forEach((provider) => {
      counts[provider.type] = (counts[provider.type] || 0) + 1;
    });
    return counts;
  }, [providers]);

  // Action to select a provider
  const selectProvider = (providerId) => {
    setSelectedProvider(providerId === selectedProviderId ? null : providerId);
  };

  return {
    // Data
    providers: filteredProviders,
    selectedProvider,
    selectedProviderId,
    filterType,
    providerCounts,

    // Actions
    selectProvider,
    setFilterType,
  };
}

export default useProviders;
