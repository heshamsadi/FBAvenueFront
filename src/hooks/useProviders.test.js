import { act, renderHook } from '@testing-library/react';
import useProviders from './useProviders';
import useProvidersStore from '../store/providersSlice';
import { PROVIDER_TYPES } from '../lib/constants';

// Mock the store
jest.mock('../store/providersSlice');

describe('useProviders', () => {
  const mockProviders = [
    { id: 1, name: 'Hotel 1', type: PROVIDER_TYPES.HOTEL },
    { id: 2, name: 'Pitch 1', type: PROVIDER_TYPES.PITCH },
    { id: 3, name: 'Hotel 2', type: PROVIDER_TYPES.HOTEL },
    { id: 4, name: 'Stadium 1', type: PROVIDER_TYPES.STADIUM },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Setup default mock implementation
    useProvidersStore.mockReturnValue({
      providers: mockProviders,
      selectedProviderId: null,
      filterType: 'all',
      setSelectedProvider: jest.fn(),
      setFilterType: jest.fn(),
      getFilteredProviders: jest.fn(() => mockProviders),
      initializeProviders: jest.fn(),
    });
  });

  it('should initialize providers on mount', () => {
    const initializeProviders = jest.fn();
    useProvidersStore.mockReturnValue({
      ...useProvidersStore(),
      initializeProviders,
    });

    renderHook(() => useProviders());

    expect(initializeProviders).toHaveBeenCalledTimes(1);
  });

  it('should return filtered providers', () => {
    const { result } = renderHook(() => useProviders());

    expect(result.current.providers).toEqual(mockProviders);
  });

  it('should calculate provider counts correctly', () => {
    const { result } = renderHook(() => useProviders());

    expect(result.current.providerCounts).toEqual({
      [PROVIDER_TYPES.HOTEL]: 2,
      [PROVIDER_TYPES.PITCH]: 1,
      [PROVIDER_TYPES.STADIUM]: 1,
    });
  });

  it('should find selected provider', () => {
    useProvidersStore.mockReturnValue({
      ...useProvidersStore(),
      selectedProviderId: 2,
      providers: mockProviders,
    });

    const { result } = renderHook(() => useProviders());

    expect(result.current.selectedProvider).toEqual(mockProviders[1]);
  });

  it('should handle provider selection toggle', () => {
    const setSelectedProvider = jest.fn();
    useProvidersStore.mockReturnValue({
      ...useProvidersStore(),
      selectedProviderId: 2,
      setSelectedProvider,
    });

    const { result } = renderHook(() => useProviders());

    act(() => {
      result.current.selectProvider(2);
    });

    expect(setSelectedProvider).toHaveBeenCalledWith(null);

    act(() => {
      result.current.selectProvider(3);
    });

    expect(setSelectedProvider).toHaveBeenCalledWith(3);
  });

  it('should expose filter type and setter', () => {
    const setFilterType = jest.fn();
    useProvidersStore.mockReturnValue({
      ...useProvidersStore(),
      filterType: PROVIDER_TYPES.HOTEL,
      setFilterType,
    });

    const { result } = renderHook(() => useProviders());

    expect(result.current.filterType).toBe(PROVIDER_TYPES.HOTEL);

    act(() => {
      result.current.setFilterType(PROVIDER_TYPES.PITCH);
    });

    expect(setFilterType).toHaveBeenCalledWith(PROVIDER_TYPES.PITCH);
  });
});
