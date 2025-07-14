import { useState } from 'react';

/**
 * SecondaryNavigation component - displays the secondary navigation tabs below the header
 * @returns {JSX.Element}
 */
function SecondaryNavigation() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'create-pitch',
      label: 'Create pitch',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      ),
    },
    {
      id: 'create-hotel',
      label: 'Create hotel',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      ),
    },
    {
      id: 'quotation',
      label: 'Quotation',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" fill="none" />
          <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" />
          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 'private-link',
      label: 'Private link',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleRemoveTab = (tabId, event) => {
    event.stopPropagation();
    // Handle tab removal logic here
    // eslint-disable-next-line no-console
    console.log('Remove tab:', tabId);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-2">
        <div className="flex items-center gap-1">
          {navigationItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center rounded overflow-hidden text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-main-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {/* Left darker section with icon */}
              <button
                type="button"
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center justify-center w-8 h-8 ${
                  activeTab === item.id
                    ? 'bg-dark-blue text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {item.icon}
              </button>

              {/* Middle section with title */}
              <button
                type="button"
                onClick={() => handleTabClick(item.id)}
                className="flex-1 px-3 py-2 text-left"
              >
                {item.label}
              </button>

              {/* Right section with X icon */}
              <button
                type="button"
                onClick={(e) => handleRemoveTab(item.id, e)}
                aria-label={`Remove ${item.label} tab`}
                className={`flex items-center justify-center w-6 h-6 mr-1 rounded-full transition-colors ${
                  activeTab === item.id
                    ? 'hover:bg-blue-500 text-white'
                    : 'hover:bg-gray-300 text-gray-500'
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SecondaryNavigation;
