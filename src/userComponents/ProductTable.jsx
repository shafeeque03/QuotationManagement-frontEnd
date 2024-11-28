import React from 'react'

const ProductTable = ({filteredProducts}) => {
  return (
    <div className="relative overflow-x-auto rounded-lg shadow-2xl">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs uppercase bg-gray-400/50">
                <tr>
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <tr 
                      key={index} 
                      className="bg-gray-200 hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{product.name}</td>
                      <td className="px-4 py-3">₹{product.price.toLocaleString()}</td>
                      <td className="px-4 py-3">{product.quantity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-3 text-center text-gray-500"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
  )
}

export default ProductTable