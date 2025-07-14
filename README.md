# FootballVenue - Providers Lists

Internal back-office tool for club staff to plan travel logistics. The Providers Lists screen allows employees to browse, filter and manage service providers (hotels, pitches, stadiums, transport, laundry, etc.).

## Tech Stack

- React 18 (JavaScript)
- Create React App
- Tailwind CSS
- React Leaflet
- Zustand (State Management)
- Vitest & React Testing Library

## Project Structure

```
src/
├─ components/   # Reusable, presentation-only components
├─ features/     # Composite screens (MapPanel, ProvidersTable)
├─ hooks/        # Side-effect & data hooks (useProviders, useMap)
├─ store/        # Zustand slices (providersSlice.js)
└─ lib/          # Helpers & constants
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs tests with React Testing Library
- `npm test:vitest` - Runs tests with Vitest
- `npm run eject` - Ejects from Create React App (irreversible)

## Features

- **Map View**: Interactive map showing provider locations using OpenStreetMap
- **Providers Table**: Sortable table with provider details
- **Filter Tabs**: Filter providers by type (Hotels, Pitches, Stadiums, etc.)
- **Selection Sync**: Clicking a row pans the map and highlights the provider
- **Status Badges**: Visual indicators for provider status (Active, Inactive, Draft)
- **Type Badges**: Color-coded badges for different provider types

## Testing

The project includes unit tests for hooks and store slices, plus integration tests for the main screen.

Run tests with:
```bash
npm test:vitest
```

## Code Quality

- ESLint with Airbnb configuration
- PropTypes for component prop validation
- JSDoc comments for functions

## Definition of Done

✓ UI matches the design screenshot  
✓ No ESLint errors  
✓ Unit tests for every custom hook pass  
✓ Lighthouse performance ≥ 90
