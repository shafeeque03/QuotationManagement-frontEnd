import React, { useState } from "react";
import { editProduct, editService } from "../../api/adminApi";
import toast from "react-hot-toast";

const EditProSer = ({ selectedItem, closeModal, updateItem  }) => {
  const [formData, setFormData] = useState({
    name: selectedItem?.name || "",
    price: selectedItem?.price || "",
    quantity: selectedItem?.hasOwnProperty("quantity") ? selectedItem.quantity : "", // Only for products
    isAvailable: selectedItem?.hasOwnProperty("isAvailable") ? selectedItem.isAvailable : false, // Only for services
  });
  
  const isProduct = selectedItem?.hasOwnProperty("quantity"); // Explicitly check for the 'quantity' field
  // Check if selectedItem is a product

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleAvailability = () => {
    setFormData((prevData) => ({
      ...prevData,
      isAvailable: !prevData.isAvailable,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isProduct) {
        const res = await editProduct(selectedItem._id, formData);
        if (res.status === 200) {
          toast.success(res.data?.message);
          updateItem(res.data.product);
          closeModal();
        }
      } else {
        const res = await editService(selectedItem._id, formData);
        if (res.status === 200) {
          toast.success(res.data?.message);
          updateItem(res.data.service);
          closeModal();
        }
      }
    } catch (error) {
      toast.error("Error occurred while updating!");
      console.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 backdrop-blur-lg">
      <div className="bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative">
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

        <h2 className="text-lg sm:text-xl text-indigo-700 font-semibold mb-4">
          Edit {isProduct ? "Product" : "Service"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {isProduct ? "Product Name" : "Service Name"}
            </label>
            <input
              type="text"
              name="name"
              className="w-full border rounded-md p-2"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price Field */}
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

          {/* Quantity Field for Products */}
          {isProduct && (
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
          )}

          {/* Toggle Availability for Services */}
          {!isProduct && (
            <div className="mb-4 flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-4">
                Availability
              </label>
              <div
                onClick={toggleAvailability}
                className={`relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full ${
                  formData.isAvailable ? "bg-green-500" : "bg-gray-400"
                } transition-colors duration-200`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                    formData.isAvailable ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </div>
              <span className="ml-4 text-sm">
                {formData.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProSer;
