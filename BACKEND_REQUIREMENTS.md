# Backend Requirements - Football Venue Provider System

## Data Structure Required

```javascript
// Provider Object
{
  id: 1,
  name: "Hayat Regency",
  type: "hotel", // hotel, pitch, stadium, transport, laundry, water_bolt
  country: "Morocco",
  city: "Casablanca",
  status: "active", // active, inactive, draft
  favorites: false,
  coordinates: {
    lat: 33.5731,
    lng: -7.5898
  },
  
  // Optional fields
  rating: 4, // 1-5 stars for hotels
  address: "123 Mohammed V Boulevard",
  phone: "+212 522 48 12 34",
  email: "info@hayatregency.ma",
  description: "Hotel description...",
  workspace: 101,
  dateAdded: "12/02/2025",
  views: "visible" // visible, invisible, closed
}
```

## Required API Endpoints

### 1. Get All Providers
```
GET /api/providers
Query params: page, limit, search, type, status, favorites
```

**Response:**
```json
{
  "success": true,
  "data": {
    "providers": [Provider...],
    "pagination": {
      "total": 45,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
}
```

### 2. Create Provider
```
POST /api/providers
```

**Request Body:**
```json
{
  "name": "Hotel Atlas",
  "type": "hotel",
  "country": "Morocco",
  "city": "Casablanca",
  "coordinates": { "lat": 33.5731, "lng": -7.5898 },
  "status": "active",
  "phone": "+212 522 123 456",
  "email": "info@hotel.com"
}
```

### 3. Update Provider
```
PUT /api/providers/{id}
```

### 4. Delete Provider
```
DELETE /api/providers/{id}
```

### 5. Update Favorites
```
PATCH /api/providers/{id}/favorites
```

**Request Body:**
```json
{
  "favorites": true
}
```

### 6. Bulk Operations
```
PATCH /api/providers/bulk
```

**Request Body:**
```json
{
  "ids": [1, 2, 3],
  "data": { "status": "inactive" }
}
```

## Search & Filter Requirements

The frontend needs to search across:
- Provider name
- City/Country
- Filter by type (hotel, pitch, stadium, etc.)
- Filter by status (active, inactive, draft)
- Filter by favorites (true/false)

## Sample Data

See `src/lib/mockData.js` in the frontend code for 30+ sample providers with realistic data.

## Error Response Format

```json
{
  "success": false,
  "error": {
    "message": "Provider not found",
    "code": "NOT_FOUND"
  }
}
```

## Database Fields

**Required:**
- id, name, type, country, city, status, coordinates (lat/lng), favorites

**Optional:**
- rating, address, phone, email, description, workspace, dateAdded, views

## Frontend Integration Points

- Frontend uses Zustand for state management
- All API calls will be in `src/services/api.js`
- Data operations are centralized in `src/store/providersSlice.js`
- UI components expect the exact data structure shown above

## Notes

- Coordinates are required for map functionality
- Provider types are: hotel, pitch, stadium, transport, laundry, water_bolt
- Status values are: active, inactive, draft
- Rating is 1-5 stars (only for hotels)
- Favorites is a boolean field 