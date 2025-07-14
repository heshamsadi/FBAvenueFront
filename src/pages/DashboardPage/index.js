import Header from '../../components/header/Header';
import Sidebar from '../../components/layout/Sidebar';
import PageTitle from '../../components/layout/PageTitle';
import SecondaryNavigation from '../../components/navigation/SecondaryNavigation';

/**
 * DashboardPage - Main dashboard page component
 * @returns {JSX.Element}
 */
function DashboardPage() {
  return (
    <div className="h-screen flex ">
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <SecondaryNavigation />

        <div className="flex-1 flex flex-col overflow-hidden">
          <PageTitle title="Dashboard" />

          {/* Page content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome to Dashboard</h2>
              <p className="text-gray-600">This is the main dashboard page.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
