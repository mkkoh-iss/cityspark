'use client';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PersonCardProps {
  name: string;
  email: string;
  role: string;
  image: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PersonCard: React.FC<PersonCardProps> = ({
  name,
  email,
  role,
  image,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center space-x-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-gray-600">{email}</p>
          <p className="text-gray-500">{role}</p>
        </div>
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-blue-500 hover:text-blue-600"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
