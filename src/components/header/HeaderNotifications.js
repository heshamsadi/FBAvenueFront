/**
 * HeaderNotifications component - displays the notification icons in the header
 * @returns {JSX.Element}
 */
function HeaderNotifications() {
  return (
    <div className="flex items-center gap-2 ml-4">
      <button type="button" className="hover:bg-gray-100 p-2 rounded transition-colors text-gray-600 hover:text-gray-900" aria-label="Information">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5 22 22 17.5 22 12S17.5 2 12 2 2 6.5 2 12 6.5 22 12 22Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M12 8V16" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6H12.01" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      <button type="button" className="hover:bg-gray-100 p-2 rounded transition-colors text-gray-600 hover:text-gray-900 relative" aria-label="Notifications">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8A6 6 0 0 0 6 8C6 11 4 12 4 12H20S18 11 18 8Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M13.73 21A2 2 0 0 1 10.27 21" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">
          1
        </span>
      </button>

      <button type="button" className="hover:bg-gray-100 p-2 rounded transition-colors text-gray-600 hover:text-gray-900" aria-label="Messages">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15A2 2 0 0 1 19 17H7L4 20V5A2 2 0 0 1 6 3H19A2 2 0 0 1 21 5Z" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>

      <button type="button" className="hover:bg-gray-100 p-2 rounded transition-colors text-gray-600 hover:text-gray-900" aria-label="User Profile">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21V19C20 16.79 18.21 15 16 15H8C5.79 15 4 16.79 4 19V21" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>

      <button type="button" className="hover:bg-gray-100 p-2 rounded transition-colors text-gray-600 hover:text-gray-900" aria-label="Settings">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M12 1V3" stroke="currentColor" strokeWidth="2" />
          <path d="M12 21V23" stroke="currentColor" strokeWidth="2" />
          <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" />
          <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" />
          <path d="M1 12H3" stroke="currentColor" strokeWidth="2" />
          <path d="M21 12H23" stroke="currentColor" strokeWidth="2" />
          <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" />
          <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}

export default HeaderNotifications;
