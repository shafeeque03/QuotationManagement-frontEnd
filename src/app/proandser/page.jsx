"use client"
import React, { useState, useEffect } from "react";
import { UserMenu } from "../userComponents/UserMenu";
import { getProAndSer } from "../api/adminApi";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [view, setView] = useState("products"); // 'services' or 'products'
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="bg-white">
      <UserMenu />

      <div className="p-4 md:p-12 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-800 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center justify-center space-x-4">
            <label
              htmlFor="viewToggle"
              className="flex items-center cursor-pointer"
            >
              <div className="w-16 h-8 bg-blue-700 rounded-full p-1 transition-all duration-300">
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
            <span className="ml-4 text-sm font-medium text-white">
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

        {/* Services Table */}
        <div
          className={`transition-all duration-500 ${
            view === "services" ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Services</h2>
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
                    <tr key={index} className="bg-white border-b hover:bg-gray-100">
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

        {/* Products Table */}
        <div
          className={`transition-all duration-500 ${
            view === "products" ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Products</h2>
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
                      className="bg-white border-b hover:bg-gray-100"
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
