import React from 'react';
import { Link } from 'react-router-dom';

const EventsPage: React.FC = () => {
  // Mock events data
  const events = [
    {
      id: 1,
      title: 'Community Cleanup',
      description: 'Join us for a community cleanup event',
      date: '2024-04-01',
      location: 'Central Park',
    },
    {
      id: 2,
      title: 'Tech Meetup',
      description: 'Monthly tech meetup for developers',
      date: '2024-04-15',
      location: 'Innovation Hub',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <Link
          to="/content/events/create"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Create Event
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="text-sm text-gray-500">
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
            </div>
            <Link
              to={`/content/events/register?id=${event.id}`}
              className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Register
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage; 