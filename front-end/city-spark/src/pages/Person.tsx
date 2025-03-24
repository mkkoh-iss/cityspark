import React from 'react';
import { Link } from 'react-router-dom';

const PersonPage: React.FC = () => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    registeredEvents: [
      {
        id: 1,
        title: 'Community Cleanup',
        date: '2024-04-01',
        status: 'Registered',
      },
      {
        id: 2,
        title: 'Tech Meetup',
        date: '2024-04-15',
        status: 'Pending',
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-lg">{user.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-lg">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Registered Events</h3>
        <div className="space-y-4">
          {user.registeredEvents.map(event => (
            <div
              key={event.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h4 className="text-lg font-semibold">{event.title}</h4>
                <p className="text-gray-600">Date: {event.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    event.status === 'Registered'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {event.status}
                </span>
                <Link
                  to={`/content/events?id=${event.id}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonPage; 