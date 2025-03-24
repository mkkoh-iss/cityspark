import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to CitySpark</h1>
      <p className="text-xl mb-8">Discover and create amazing events in your city</p>
      <div className="space-x-4">
        <Link
          to="/content/events"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Browse Events
        </Link>
        <Link
          to="/content/events/create"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Create Event
        </Link>
      </div>
    </div>
  );
};

export default HomePage; 