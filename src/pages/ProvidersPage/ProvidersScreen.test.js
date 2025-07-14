import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProvidersScreen from './ProvidersScreen';
import useProvidersStore from '../../store/providersSlice';

// Mock the map hook to avoid Leaflet issues in tests
jest.mock('../../hooks/useMap', () => ({
  default: () => ({
    panTo: jest.fn(),
    addMarkers: jest.fn(),
    clearMarkers: jest.fn(),
    fitBounds: jest.fn(),
  }),
}));

describe('ProvidersScreen Integration', () => {
  beforeEach(() => {
    // Reset store state before each test
    useProvidersStore.setState({
      providers: [],
      selectedProviderId: null,
      filterType: 'all',
    });
  });

  it('should render main components', () => {
    render(<ProvidersScreen />);

    // Check header
    expect(screen.getByText('Providers lists')).toBeInTheDocument();

    // Check filter tabs
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('Pitches')).toBeInTheDocument();

    // Check table headers
    expect(screen.getByText('Date Added')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('should initialize with providers', async () => {
    render(<ProvidersScreen />);

    // Wait for providers to be loaded
    await waitFor(() => {
      const { providers } = useProvidersStore.getState();
      expect(providers.length).toBeGreaterThan(0);
    });
  });

  it('should filter providers when clicking filter tabs', async () => {
    render(<ProvidersScreen />);

    // Wait for initial load
    await waitFor(() => {
      expect(useProvidersStore.getState().providers.length).toBeGreaterThan(0);
    });

    // Click Hotels filter
    const hotelsTab = screen.getByRole('button', { name: /Hotels/i });
    fireEvent.click(hotelsTab);

    // Check that filter was applied
    expect(useProvidersStore.getState().filterType).toBe('hotel');
  });

  it('should select provider when clicking table row', async () => {
    render(<ProvidersScreen />);

    // Wait for providers to load
    await waitFor(() => {
      const { providers } = useProvidersStore.getState();
      expect(providers.length).toBeGreaterThan(0);
    });

    // Get first provider row (excluding header)
    const rows = screen.getAllByRole('button', { name: /Select/i });
    if (rows.length > 0) {
      fireEvent.click(rows[0]);

      // Check that provider was selected
      await waitFor(() => {
        expect(useProvidersStore.getState().selectedProviderId).toBeTruthy();
      });
    }
  });

  it('should toggle provider selection', async () => {
    render(<ProvidersScreen />);

    // Initialize with a selected provider
    const { providers } = useProvidersStore.getState();
    if (providers.length > 0) {
      useProvidersStore.setState({ selectedProviderId: providers[0].id });

      // Click the same provider to deselect
      const rows = screen.getAllByRole('button', { name: /Select/i });
      if (rows.length > 0) {
        fireEvent.click(rows[0]);

        // Check that provider was deselected
        await waitFor(() => {
          expect(useProvidersStore.getState().selectedProviderId).toBeNull();
        });
      }
    }
  });
});
