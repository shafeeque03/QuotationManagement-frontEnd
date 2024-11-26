"use client"
import React, { useState, useEffect } from "react";
import { UserMenu } from "../userComponents/UserMenu";
import { getProAndSer } from "../../api/adminApi";
import ProductTable from "../userComponents/ProductTable";
import ServiceTable from "../userComponents/ServiceTable";

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

      <div className="p-4 md:p-12 bg-white min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
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
            <span className="ml-4 text-sm font-medium text-gray-600">
              {view === "services" ? "Services" : "Products"}
            </span>
          </div>

          <input
            type="text"
            placeholder={`Search ${view}`}
            className="border border-white/20 bg-gray-200 text-white rounded-md p-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-cyan-300"
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
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 mb-4">Services</h2>
          <ServiceTable filteredServices={filteredServices}/>
        </div>

        {/* Products Table */}
        <div
          className={`transition-all duration-500 ${
            view === "products" ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300-300 mb-4">Products</h2>
          <ProductTable filteredProducts={filteredProducts}/>
        </div>
      </div>
    </div>
  );
};

export default Page;