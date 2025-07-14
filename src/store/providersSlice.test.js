import { act, renderHook } from '@testing-library/react';
import useProvidersStore from './providersSlice';
import { PROVIDER_TYPES } from '../lib/constants';

describe('useProvidersStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useProvidersStore.setState({
      providers: [],
      selectedProviderId: null,
      filterType: 'all',
    });
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useProvidersStore());

    expect(result.current.providers).toEqual([]);
    expect(result.current.selectedProviderId).toBeNull();
    expect(result.current.filterType).toBe('all');
  });

  it('should set providers', () => {
    const { result } = renderHook(() => useProvidersStore());
    const mockProviders = [
      { id: 1, name: 'Provider 1', type: PROVIDER_TYPES.HOTEL },
      { id: 2, name: 'Provider 2', type: PROVIDER_TYPES.PITCH },
    ];

    act(() => {
      result.current.setProviders(mockProviders);
    });

    expect(result.current.providers).toEqual(mockProviders);
  });

  it('should set selected provider', () => {
    const { result } = renderHook(() => useProvidersStore());

    act(() => {
      result.current.setSelectedProvider(5);
    });

    expect(result.current.selectedProviderId).toBe(5);
  });

  it('should set filter type', () => {
    const { result } = renderHook(() => useProvidersStore());

    act(() => {
      result.current.setFilterType(PROVIDER_TYPES.HOTEL);
    });

    expect(result.current.filterType).toBe(PROVIDER_TYPES.HOTEL);
  });

  it('should filter providers correctly', () => {
    const { result } = renderHook(() => useProvidersStore());
    const mockProviders = [
      { id: 1, name: 'Hotel 1', type: PROVIDER_TYPES.HOTEL },
      { id: 2, name: 'Pitch 1', type: PROVIDER_TYPES.PITCH },
      { id: 3, name: 'Hotel 2', type: PROVIDER_TYPES.HOTEL },
    ];

    act(() => {
      result.current.setProviders(mockProviders);
      result.current.setFilterType(PROVIDER_TYPES.HOTEL);
    });

    const filtered = result.current.getFilteredProviders();
    expect(filtered).toHaveLength(2);
    expect(filtered.every((p) => p.type === PROVIDER_TYPES.HOTEL)).toBe(true);
  });

  it('should return all providers when filter is "all"', () => {
    const { result } = renderHook(() => useProvidersStore());
    const mockProviders = [
      { id: 1, name: 'Hotel 1', type: PROVIDER_TYPES.HOTEL },
      { id: 2, name: 'Pitch 1', type: PROVIDER_TYPES.PITCH },
      { id: 3, name: 'Stadium 1', type: PROVIDER_TYPES.STADIUM },
    ];

    act(() => {
      result.current.setProviders(mockProviders);
      result.current.setFilterType('all');
    });

    const filtered = result.current.getFilteredProviders();
    expect(filtered).toHaveLength(3);
    expect(filtered).toEqual(mockProviders);
  });

  it('should initialize providers with mock data', () => {
    const { result } = renderHook(() => useProvidersStore());

    act(() => {
      result.current.initializeProviders();
    });

    expect(result.current.providers.length).toBeGreaterThan(0);
    expect(result.current.providers[0]).toHaveProperty('id');
    expect(result.current.providers[0]).toHaveProperty('name');
    expect(result.current.providers[0]).toHaveProperty('type');
  });
});
