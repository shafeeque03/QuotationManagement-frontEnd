"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../../adminComponents/Sidebar.jsx";
import { addProduct, addService, getProAndSer } from "../../../api/adminApi.js";
import toast from "react-hot-toast";
import EditProSer from "@/adminComponents/EditProSer.jsx";
import ProductTable from "@/adminComponents/ProductTable.jsx";
import AddProSerForm from "@/adminComponents/AddProSerForm.jsx";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("service");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
  });

  const [view, setView] = useState("products");
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
      const fetchedProducts = res?.data?.products || [];
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    });
  }, []);

  useEffect(() => {

      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    
  }, [searchQuery, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        const res = await addProduct(formData);
        if (res.status === 200) {
          toast.success(res?.data?.message);
          setProducts((prev) => [...prev, res?.data?.product]);
        }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error occurred while adding!");
      console.log(error.message);
    }
  };

  const updateItem = (updatedItem) => {

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedItem._id ? updatedItem : product
        )
      );

  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-slate-200 w-full min-h-screen p-4 md:p-12 text-black">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Product/Service
          </h1>
          <button
            type="button"
            onClick={openModal}
            className="text-gray-600 bg-gray-200 border border-gray-400 hover:bg-indigo-700 hover:border-none hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center hover:scale-110 transform transition duration-700"
          >
            Add New Product/Service
          </button>
        </div>

        {/* Form Modal */}
        <AddProSerForm
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          modalType={modalType}
          setModalType={setModalType}
          handleSubmit={handleSubmit}
          formData={formData}
          handleChange={handleChange}
        />

        {/* Edit Modal */}
        {editModalOpen && selectedItem && (
          <EditProSer
            selectedItem={selectedItem}
            closeModal={closeEditModal}
            updateItem={updateItem}
          />
        )}

        {/* Toggle and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">


          <input
            type="text"
            placeholder={`Search ${view}`}
            className="border rounded-md p-2 w-full max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tables */}
        <div className="overflow-x-auto">
          <ProductTable
            view={view}
            products={products}
            filteredProducts={filteredProducts}
            openEditModal={openEditModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
