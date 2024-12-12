import React from "react";

const ServicePageModal = ({
  closeModal,
  handleFormSubmit,
  formData,
  handleInputChange,
  isEditing,
  X,
}) => {
  return (
    <div className="bg-white w-full max-w-md mx-4 p-6 rounded-3xl shadow-xl relative transform transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          {isEditing ? "Edit Service" : "Add New Service"}
        </h2>
        <button
          onClick={closeModal}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="serviceName"
            className="block text-sm font-medium text-gray-700"
          >
            Service Name
          </label>
          <input
            type="text"
            id="serviceName"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleInputChange}
            placeholder="Enter service name"
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
            placeholder="Enter service price"
            className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            required
          />
        </div>

        <div className="flex items-center">
  <label
    htmlFor="isAvailable"
    className="text-sm font-medium mr-3"
  >
    Available
  </label>
  <input
    type="checkbox"
    id="isAvailable"
    name="isAvailable"
    checked={formData.isAvailable}
    onChange={handleInputChange}
    className="toggle-checkbox hidden"
  />
  <div
    onClick={() => handleInputChange({ target: { name: 'isAvailable', value: !formData.isAvailable } })}
    className={`relative cursor-pointer w-12 h-6 bg-gray-200 rounded-full transition-all duration-300 ${
      formData.isAvailable ? "bg-indigo-500" : "bg-gray-300"
    }`}
  >
    <div
      className={`absolute w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
        formData.isAvailable ? "translate-x-6" : "translate-x-0"
      }`}
    ></div>
  </div>
</div>


        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all duration-200"
          >
            {isEditing ? "Update Service" : "Add Service"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServicePageModal;
