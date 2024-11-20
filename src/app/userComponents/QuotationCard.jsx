import React from 'react'

const QuotationCard = () => {
    const getStatusStyle = (status) => {
        if (status === "Approved") return "bg-green-500/20 text-green-600";
        if (status === "Rejected") return "bg-red-500/20 text-red-600";
        return "bg-yellow-500/20 text-yellow-600";
      };
  return (
    <div>
        <div
              key={1}
              className="bg-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 p-6"
            >
              <p className="text-gray-500 text-sm">No: 1</p>
              <h2 className="text-lg font-bold text-gray-800 mt-2">
                Quotation #85858
              </h2>
              <p className="text-gray-700 mt-1">
                <span className="font-medium">Expiry Date:</span>{" "}
                31-03-2003
              </p>
              <div
                className={`inline-block mt-3 px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                    'Approved'
                )}`}
              >
                Approved
              </div>
            </div>
    </div>
  )
}

export default QuotationCard