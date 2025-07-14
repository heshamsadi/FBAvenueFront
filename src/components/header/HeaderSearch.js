import { useState } from 'react';

/**
 * HeaderSearch component - displays a search input in the header
 * @returns {JSX.Element}
 */
function HeaderSearch() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search functionality here
    // console.log('Search:', searchValue);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center max-w-[350px] w-full ">
      <div className="relative w-full">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-main-blue focus:border-transparent"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default HeaderSearch;
