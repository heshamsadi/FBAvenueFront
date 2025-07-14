import {
  FiCalendar,
  FiBell,
  FiShoppingCart,
  FiUser,
  FiLogOut,
} from 'react-icons/fi';

/**
 * HeaderNotifications component - displays the notification icons in the header
 * @returns {JSX.Element}
 */
function HeaderNotifications() {
  return (
    <div className="flex items-center gap-2 ml-4">
      {/* Calendar */}
      <button type="button" className="hover:bg-gray-100 p-2 rounded transition-colors text-gray-600 hover:text-gray-900" aria-label="Calendar">
        <FiCalendar size={18} />
      </button>

      {/* Notification */}
      <button type="button" className="hover:bg-gray-100 p-2 rounded transition-colors text-gray-600 hover:text-gray-900 relative" aria-label="Notifications">
        <FiBell size={18} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">
          1
        </span>
      </button>

      {/* Cart */}
      <button type="button" className="hover:bg-gray-100 p-2 rounded transition-colors text-gray-600 hover:text-gray-900" aria-label="Cart">
        <FiShoppingCart size={18} />
      </button>

      {/* User Profile */}
      <button type="button" className="hover:bg-gray-100 p-2 rounded transition-colors text-gray-600 hover:text-gray-900" aria-label="User Profile">
        <FiUser size={18} />
      </button>

      {/* Logout */}
      <button type="button" className="hover:bg-gray-100 p-2 rounded transition-colors text-gray-600 hover:text-gray-900" aria-label="Logout">
        <FiLogOut size={18} />
      </button>
    </div>
  );
}

export default HeaderNotifications;
