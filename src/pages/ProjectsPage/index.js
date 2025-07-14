import Header from '../../components/header/Header';
import Sidebar from '../../components/layout/Sidebar';
import PageTitle from '../../components/layout/PageTitle';

/**
 * ProjectsPage - Main projects page component
 * @returns {JSX.Element}
 */
function ProjectsPage() {
  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 flex flex-col overflow-hidden">
          <PageTitle title="Projects" />
          <div className="flex-1 p-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects</h2>
              <p className="text-gray-600">Projects content will be implemented here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
