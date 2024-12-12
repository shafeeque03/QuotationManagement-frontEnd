import React from 'react'

const AddClientModal = ({setModalOpen,XMarkIcon,newClient,setNewClient,handleAddClient}) => {
  return (
    <div>
        <div className="bg-white rounded-lg p-6 w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Client</h2>
            <button
              onClick={() => setModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newClient.name}
              onChange={(e) =>
                setNewClient((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Emaild"
              value={newClient.email}
              onChange={(e) =>
                setNewClient((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Phone"
              value={newClient.phone}
              onChange={(e) =>
                setNewClient((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Address"
              value={newClient.address}
              onChange={(e) =>
                setNewClient((prev) => ({ ...prev, address: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddClient}
                disabled={!newClient.name || !newClient.phone}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg 
                  disabled:opacity-50 hover:bg-indigo-600 transition"
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AddClientModal