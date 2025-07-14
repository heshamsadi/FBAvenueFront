import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import CampsPage from './pages/CampsPage';
import RequestsPage from './pages/RequestsPage';
import ProjectsPage from './pages/ProjectsPage';
import ClientsPage from './pages/ClientsPage';
import ProvidersPage from './pages/ProvidersPage';
import WeboxPage from './pages/WeboxPage';
import ContactsPage from './pages/ContactsPage';
import DestinationsPage from './pages/DestinationsPage';
import AirportsPage from './pages/AirportsPage';
import EventsPage from './pages/EventsPage';
import TagsIconsPage from './pages/TagsIconsPage';
import UsersPage from './pages/UsersPage';
import ArchivedPage from './pages/ArchivedPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/camps" element={<CampsPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/providers" element={<ProvidersPage />} />
        <Route path="/webox" element={<WeboxPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/airports" element={<AirportsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/tags-icons" element={<TagsIconsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/archived" element={<ArchivedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
