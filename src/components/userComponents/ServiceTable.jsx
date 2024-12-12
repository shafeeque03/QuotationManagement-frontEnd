import React from 'react'

const ServiceGrid = ({filteredServices, currentPage, servicesPerPage}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredServices.map((service, index) => {
            const globalIndex = index + 1 + (currentPage - 1) * servicesPerPage;
            return (
              <div 
                key={index} 
                className={`
                  bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out 
                  transform hover:-translate-y-1 p-4 relative overflow-hidden
                  ${!service.isAvailable ? 'opacity-50' : ''}
                `}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500 font-medium">#{globalIndex}</span>
                  <div className="flex items-center space-x-2">
                    {service.isAvailable ? (
                      <span 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                        bg-green-100 text-green-800"
                      >
                        Available
                      </span>
                    ) : (
                      <span 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                        bg-red-100 text-red-800"
                      >
                        Unavailable
                      </span>
                    )}
                    <span className="text-green-600 font-bold text-lg">₹{service.price.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-gray-900 font-semibold text-base">
                  {service.name}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 bg-gray-50 rounded-lg py-12">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-gray-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <p className="text-gray-500 text-lg">No services found</p>
        </div>
      )}
    </div>
  )
}

export default ServiceGrid