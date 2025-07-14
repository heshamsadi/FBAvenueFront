import Header from '../../components/header/Header';
import Sidebar from '../../components/layout/Sidebar';
import PageTitle from '../../components/layout/PageTitle';

/**
 * AirportsPage - Main airports page component
 * @returns {JSX.Element}
 */
function AirportsPage() {
  return (
    <div className="h-screen flex ">
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 flex flex-col overflow-hidden">
          <PageTitle title="Airports" />
          <div className="flex-1 p-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Airports</h2>
              <p className="text-gray-600">Airports content will be implemented here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirportsPage;
