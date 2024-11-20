"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../adminComponents/Sidebar.jsx";
import { addProduct, addService, getProAndSer } from "../../api/adminApi.js";
import toast from "react-hot-toast";
import EditProSer from "@/app/adminComponents/EditProSer.jsx";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("service");
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openEditModal = (item) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedItem(null);
    setEditModalOpen(false);
  };

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    quantity: "",
    serviceName: "",
    servicePrice: "",
  });

  const [view, setView] = useState("products"); // 'services' or 'products'
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    getProAndSer().then((res) => {
      const fetchedServices = res?.data?.services || [];
      const fetchedProducts = res?.data?.products || [];
      setServices(fetchedServices);
      setFilteredServices(fetchedServices);
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    });
  }, []);

  useEffect(() => {
    if (view === "services") {
      setFilteredServices(
        services.filter((service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else if (view === "products") {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, services, products, view]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "product") {
        const res = await addProduct(formData);
        if (res.status === 200) {
          toast.success(res?.data?.message);
          setProducts((prev) => [...prev, res?.data?.product]);
        }
      } else if (modalType === "service") {
        const res = await addService(formData);
        if (res.status === 200) {
          toast.success(res?.data?.message);
          setServices((prev) => [...prev, res?.data?.service]);
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error occurred while adding!");
      console.log(error.message);
    }
  };
  const updateItem = (updatedItem) => {
    console.log(updatedItem,"909090909090")
    if (updatedItem.quantity !== undefined) {
      // It's a product
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedItem._id ? updatedItem : product
        )
      );
    } else {
      // It's a service
      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === updatedItem._id ? updatedItem : service
        )
      );
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 bg-slate-200 w-full min-h-screen p-4 md:p-12 text-black">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl text-red-700">Product/Service</h1>
          <button
            type="button"
            onClick={openModal}
            className="text-gray-600 bg-gray-200 border border-gray-400 hover:bg-red-700 hover:border-none hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center hover:scale-110 transform transition duration-700"
          >
            Add New Product/Service
          </button>
        </div>
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
                <div className="w-16 h-8 bg-red-700 rounded-full p-1 transition-all duration-300">
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
                    className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800"
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
                    className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800"
                  >
                    Add Service
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editModalOpen && selectedItem && (
          <EditProSer
            selectedItem={selectedItem}
            closeModal={closeEditModal}
            updateItem={updateItem}
          />
        )}

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center justify-center space-x-4">
            <label
              htmlFor="viewToggle"
              className="flex items-center cursor-pointer"
            >
              <div className="w-16 h-8 bg-red-700 rounded-full p-1 transition-all duration-300">
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                    view === "services" ? "translate-x-8" : "translate-x-0"
                  }`}
                ></div>
              </div>
              <input
                type="checkbox"
                id="viewToggle"
                className="hidden"
                checked={view === "services"}
                onChange={() =>
                  setView(view === "services" ? "products" : "services")
                }
              />
            </label>
            <span className="ml-4 text-sm font-medium">
              {view === "services" ? "Services" : "Products"}
            </span>
          </div>

          <input
            type="text"
            placeholder={`Search ${view}`}
            className="border rounded-md p-2 w-full max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div
          className={`transition-all duration-500 ${
            view === "services"
              ? "opacity-100"
              : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Services</h2>
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
  {filteredServices.length > 0 ? (
    filteredServices.map((service, index) => (
      <tr
        key={index}
        className="bg-white border-b cursor-pointer hover:bg-gray-100"
        onClick={() => openEditModal(service)}
      >
        <td className="px-4 py-2">{index + 1}</td>
        <td className="px-4 py-2">{service.name}</td>
        <td className="px-4 py-2">{service.price}</td>
        <td className="px-4 py-2">
          {service.isAvailable ? "Available" : "Not Available"}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="4"
        className="px-4 py-2 text-center text-gray-500"
      >
        No services found.
      </td>
    </tr>
  )}
</tbody>

            </table>
          </div>
        </div>

        <div
          className={`transition-all duration-500 ${
            view === "products"
              ? "opacity-100"
              : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Products</h2>
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product, index) => (
      <tr
        key={index}
        className="bg-white border-b cursor-pointer hover:bg-gray-100"
        onClick={() => openEditModal(product)}
      >
        <td className="px-4 py-2">{index + 1}</td>
        <td className="px-4 py-2">{product.name}</td>
        <td className="px-4 py-2">{product.price}</td>
        <td className="px-4 py-2">{product.quantity}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="4"
        className="px-4 py-2 text-center text-gray-500"
      >
        No products found.
      </td>
    </tr>
  )}
</tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
