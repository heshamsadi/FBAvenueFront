/**
 * SidebarLogo component - displays the logo and brand name in the sidebar
 * @returns {JSX.Element}
 */
function SidebarLogo() {
  return (
    <div className="bg-white text-main-blue px-4 py-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-main-blue rounded-full flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="white" />
          </svg>
        </div>
        <div>
          <div className="font-bold text-sm uppercase">FOOTBALL</div>
          <div className="font-bold text-sm uppercase">VENUE.COM</div>
        </div>
      </div>
    </div>
  );
}

export default SidebarLogo;
