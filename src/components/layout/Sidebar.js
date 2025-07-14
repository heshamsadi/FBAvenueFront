import SidebarLogo from './SidebarLogo';
import UserInfo from './UserInfo';
import NavigationMenu from './NavigationMenu';

/**
 * Sidebar component - displays the main application sidebar
 * @returns {JSX.Element}
 */
function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <SidebarLogo />
      <UserInfo
        name="Youssef Hajjoub"
        userRole="Super admin"
        lastConnection="12/04/2025 13:24"
      />
      <NavigationMenu />
    </aside>
  );
}

export default Sidebar;
