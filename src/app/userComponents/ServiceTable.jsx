import React from 'react'

const ServiceTable = ({filteredServices}) => {
    const getStatusStyle = (status) => {
        if (status === "Available") return "bg-green-500/20 text-green-600";
        return "bg-red-500/20 text-red-600";
      };
  return (
    <div className="relative overflow-x-auto rounded-lg shadow-2xl">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs uppercase bg-gray-400/50">
                <tr>
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.length > 0 ? (
                  filteredServices.map((service, index) => (
                    <tr 
                      key={index} 
                      className="bg-gray-200 hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{service.name}</td>
                      <td className="px-4 py-3">₹{service.price.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(service.isAvailable ? "Available" : "Not Available")}`}>
                          {service.isAvailable ? "Available" : "Not Available"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-3 text-center text-gray-500"
                    >
                      No services found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
  )
}

export default ServiceTable