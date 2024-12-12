import React, { useState } from 'react';
import { X, UserCircle, Mail, Phone, MapPin } from 'lucide-react';

const ClientDetailsModal = ({ user, isOpen, onClose }) => {
  if (!user) return null;

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-96 max-w-md p-6 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <UserCircle className="h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-md font-medium">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-md font-medium">{user.phone}</p>
            </div>
          </div>
          
          {user.address && (
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="text-md font-medium">
                  {user.address}

                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

const ClientListTable = ({ allUsers, isLoading, currentPage, usersPerPage }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center">
                    <p>Loading...</p>
                  </td>
                </tr>
              ) : allUsers.length > 0 ? (
                allUsers.map((user, index) => (
                  <tr
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    key={user._id || index}
                    onClick={() => handleRowClick(user)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {(currentPage - 1) * usersPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.phone}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-4 py-2">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ClientDetailsModal 
        user={selectedUser} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default ClientListTable;