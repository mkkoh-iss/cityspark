import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import EventsPage from './pages/Events';
import CreateEventPage from './pages/CreateEvent';
import RegisterEventPage from './pages/RegisterEvent';
import PersonPage from './pages/Person';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/content/events" element={<EventsPage />} />
          <Route path="/content/events/create" element={<CreateEventPage />} />
          <Route path="/content/events/register" element={<RegisterEventPage />} />
          <Route path="/content/person" element={<PersonPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App; 