import PropTypes from 'prop-types';
import { FiLayers, FiPlusCircle } from 'react-icons/fi';

/**
 * CategoryFilterBar - Filter bar with category buttons for provider types
 * @param {Object} props
 * @param {string} props.selectedCategory - Currently selected category
 * @param {Function} props.onCategoryChange - Category change handler
 * @param {boolean} props.favoredFilter - Whether favored filter is active
 * @param {Function} props.onFavoredFilterToggle - Favored filter toggle handler
 * @returns {JSX.Element}
 */
function CategoryFilterBar({
  selectedCategory,
  onCategoryChange,
  favoredFilter,
  onFavoredFilterToggle,
}) {
  const initialButtons = [
    { 
      id: 'stack', 
      icon: <FiLayers size={16} />,
      isSquare: true,
    },
    { 
      id: 'add', 
      icon: <FiPlusCircle size={16} />,
      isSquare: true,
    },
  ];

  const categories = [
    { 
      id: 'hotels', 
      label: 'Hotels', 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    { 
      id: 'pitches', 
      label: 'Pitches', 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    { 
      id: 'stadiums', 
      label: 'Stadiums', 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    { 
      id: 'ice-batch', 
      label: 'Ice batch', 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId);
  };

  const handleRemoveCategory = (categoryId, event) => {
    event.stopPropagation();
    // Handle category removal (deselect)
    onCategoryChange('');
  };

  const renderButton = (item, isAlwaysSelected = false) => {
    const isSelected = isAlwaysSelected || selectedCategory === item.id;
    
    // Square icon-only button for initial buttons
    if (item.isSquare) {
      return (
        <button
          key={item.id}
          type="button"
          onClick={() => handleCategoryClick(item.id)}
          className={`flex items-center justify-center w-8 h-8 rounded transition-colors ${
            isSelected
              ? 'bg-main-blue text-white hover:bg-dark-blue'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          {item.icon}
        </button>
      );
    }

    // Regular button with three sections for category buttons
    return (
      <div
        key={item.id}
        className={`flex items-center rounded overflow-hidden text-sm font-medium transition-colors ${
          isSelected
            ? 'bg-main-blue text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {/* Left section with icon */}
        <button
          type="button"
          onClick={() => handleCategoryClick(item.id)}
          className={`flex items-center justify-center w-8 h-8 ${
            isSelected
              ? 'bg-dark-blue text-white'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {item.icon}
        </button>

        {/* Middle section with title */}
        <button
          type="button"
          onClick={() => handleCategoryClick(item.id)}
          className="flex-1 px-3 py-2 text-left"
        >
          {item.label}
        </button>

        {/* Right section with X icon */}
        <button
          type="button"
          onClick={(e) => handleRemoveCategory(item.id, e)}
          aria-label={`Remove ${item.label} filter`}
          className={`flex items-center justify-center w-4 h-4 mr-1 rounded-full transition-colors ${
            isSelected
              ? 'hover:scale-[1.02] bg-white text-main-blue'
              : 'hover:bg-gray-300 text-gray-500'
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center gap-1">
        {/* Initial buttons - square icon-only buttons */}
        {initialButtons.map((button) => renderButton(button, true))}
        
        {/* Category filter buttons */}
        {categories.map((category) => renderButton(category, false))}
        
        {/* Filtered by favored button on the right */}
        <div className="ml-auto">
          <div className={`flex items-center rounded overflow-hidden text-sm font-medium transition-colors ${
            favoredFilter
              ? 'bg-main-blue text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          >
            {/* Left section with icon */}
            <button
              type="button"
              onClick={onFavoredFilterToggle}
              className={`flex items-center justify-center w-8 h-8 ${
                favoredFilter
                  ? 'bg-dark-blue text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
              aria-label="Filter by favored"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={favoredFilter ? 'yellow' : 'none'} xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="yellow" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Middle section with title */}
            <button
              type="button"
              onClick={onFavoredFilterToggle}
              className="flex-1 px-3 py-2 text-left"
            >
              Filtered by favored
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CategoryFilterBar.propTypes = {
  selectedCategory: PropTypes.string,
  onCategoryChange: PropTypes.func.isRequired,
  favoredFilter: PropTypes.bool,
  onFavoredFilterToggle: PropTypes.func.isRequired,
};

CategoryFilterBar.defaultProps = {
  selectedCategory: '',
  favoredFilter: false,
};

export default CategoryFilterBar; 