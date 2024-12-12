import React from 'react'

const ProductGrid = ({filteredProducts, currentPage, productsPerPage}) => {
  const getQuantityStyles = (quantity) => {
    if (quantity > 10) return 'bg-green-100 text-green-800';
    if (quantity > 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product, index) => {
            const globalIndex = index + 1 + (currentPage - 1) * productsPerPage;
            return (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 p-4 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-medium">#{globalIndex}</span>
                  <span className="text-green-600 font-bold text-lg">₹{product.price.toLocaleString()}</span>
                </div>
                <div className="text-gray-900 font-semibold text-base mb-2">
                  {product.name}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Quantity</span>
                  <span 
                    className={`
                      px-3 py-1 rounded-full text-xs font-bold
                      ${getQuantityStyles(product.quantity)}
                    `}
                  >
                    {product.quantity}
                  </span>
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
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}
    </div>
  )
}

export default ProductGrid