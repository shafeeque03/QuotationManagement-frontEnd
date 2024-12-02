import React from 'react'

const ProductPageModal = ({closeModal,handleFormSubmit,formData,handleInputChange,isEditing,X}) => {
  return (
    <div className="bg-white w-full max-w-md mx-4 p-6 rounded-3xl shadow-xl relative transform transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  {isEditing ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Form Fields */}
                <div>
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter product price"
                    className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter quantity"
                    className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-indigo-300"
                >
                  {isEditing ? "Update Product" : "Add Product"}
                </button>
              </form>
            </div>
  )
}

export default ProductPageModal