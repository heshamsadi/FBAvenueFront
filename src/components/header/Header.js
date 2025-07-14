import HeaderBreadcrumb from './HeaderBreadcrumb';
import HeaderSearch from './HeaderSearch';
import HeaderNotifications from './HeaderNotifications';

/**
 * Header component - displays the main application header
 * @returns {JSX.Element}
 */
function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-2">
        <nav className="flex items-center justify-between">
          <HeaderSearch />
          <div className="flex items-center gap-6">
            <HeaderBreadcrumb />
            <HeaderNotifications />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
