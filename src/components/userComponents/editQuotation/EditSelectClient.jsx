import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import useDebounce from '@/hook/useDebounce';

const EditSelectClient = ({UserIcon, clientId, setClientId, filteredClients, setModalOpen, PlusIcon, setStep,setClientIs}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selectRef = useRef(null);

  // Use the debounce hook with a 300ms delay
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter clients based on debounced search query
  const displayedClients = filteredClients.filter(client => 
    client.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClientSelect = (client) => {
    setClientId(client._id);
    setClientIs(client)
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div ref={selectRef} className="relative">
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <UserIcon className="w-6 h-6 mr-2 text-indigo-500" />
          Select Client
        </h2>
        <div className="flex items-center space-x-4">
          <div 
            onClick={() => setIsOpen(!isOpen)} 
            className="flex-grow px-4 py-2 border rounded-lg cursor-pointer flex items-center justify-between"
          >
            {clientId 
              ? (() => {
                  const selectedClient = filteredClients.find(c => c._id === clientId);
                  return selectedClient ? (
                    <div className="flex flex-col">
                      <span className="font-medium">{selectedClient.name}</span>
                      <span className="text-sm text-gray-500">{selectedClient.email}</span>
                    </div>
                  ) : 'Select Client'
                })()
              : 'Select Client'}
            <ChevronDown 
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </div>
          
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 border rounded-lg shadow-lg bg-white">
            <div className="p-2">
              <input
                type="text"
                placeholder="Search Client"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg mb-2"
              />
            </div>
            <ul className="max-h-60 overflow-y-auto">
              {displayedClients.length > 0 ? (
                displayedClients.map((client) => (
                  <li 
                    key={client._id} 
                    onClick={() => handleClientSelect(client)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{client.name}</span>
                      <span className="text-sm text-gray-500">{client.email}</span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-500">No clients found</li>
              )}
            </ul>
          </div>
        )}
      </div>
      <div className="text-center mt-3">
        <button
          type="button"
          onClick={() => setStep(2)}
          disabled={!clientId}
          className="px-6 py-2 bg-indigo-500 text-white rounded-lg 
            disabled:opacity-50 hover:bg-indigo-600 transition"
        >
          Next: Select Products
        </button>
      </div>
    </div>
  )
}

export default EditSelectClient