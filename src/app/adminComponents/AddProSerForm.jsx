import React from 'react'

const AddProSerForm = ({isModalOpen,closeModal,modalType,setModalType,handleSubmit,formData,handleChange}) => {
  return (
    <div>
    {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 backdrop-blur-lg">
          <div className="bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative border fade-ef">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-lg sm:text-xl text-gray-800 font-semibold mb-4">
              Add New{" "}
              {modalType
                ? modalType.charAt(0).toUpperCase() + modalType.slice(1)
                : ""}
            </h2>

            {/* iPhone style toggle switch */}
            <label
              htmlFor="viewToggle"
              className="flex items-center mb-4 cursor-pointer"
            >
              <div className="w-16 h-8 bg-indigo-700 rounded-full p-1 transition-all duration-300">
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                    modalType === "product"
                      ? "translate-x-8"
                      : "translate-x-0"
                  }`}
                ></div>
              </div>
              <input
                type="checkbox"
                id="viewToggle"
                className="hidden"
                checked={modalType === "product"}
                onChange={() =>
                  setModalType(
                    modalType === "product" ? "service" : "product"
                  )
                }
              />
            </label>

            {/* Form for product */}
            {modalType === "product" && (
              <form onSubmit={handleSubmit} className="fade-ef">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    className="w-full border rounded-md p-2"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="w-full border rounded-md p-2"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    className="w-full border rounded-md p-2"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800"
                >
                  Add Product
                </button>
              </form>
            )}

            {/* Form for service */}
            {modalType === "service" && (
              <form onSubmit={handleSubmit} className="fade-ef">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Service Name
                  </label>
                  <input
                    type="text"
                    name="serviceName"
                    className="w-full border rounded-md p-2"
                    value={formData.serviceName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    name="servicePrice"
                    className="w-full border rounded-md p-2"
                    value={formData.servicePrice}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800"
                >
                  Add Service
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      </div>
  )
}

export default AddProSerForm