import Header from '../../components/header/Header';
import Sidebar from '../../components/layout/Sidebar';
import PageTitle from '../../components/layout/PageTitle';

/**
 * WeboxPage - Main webox page component
 * @returns {JSX.Element}
 */
function WeboxPage() {
  return (
    <div className="h-screen flex ">
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 flex flex-col overflow-hidden">
          <PageTitle title="Webox" />
          <div className="flex-1 p-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Webox</h2>
              <p className="text-gray-600">Webox content will be implemented here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeboxPage;
