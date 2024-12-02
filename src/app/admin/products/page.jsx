"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../../adminComponents/Sidebar.jsx";
import Pagination from "../../../commonComponents/Pagination.jsx";
import ProductTable from "@/adminComponents/ProductTable.jsx";
import { addProduct, editProduct, getProducts } from "@/api/adminApi.js";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useDebounce from "@/hook/useDebounce.jsx";
import ProductPageModal from "@/adminComponents/ProductPageModal.jsx";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    price: "",
    quantity: "",
  });

  const state = useSelector((state) => state);
  const admin = state?.admin?.admin;
  const adminId = admin?._id;
  const productsPerPage = 2;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setFormData({ id: "", productName: "", price: "", quantity: "" });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const fetchProducts = async (
    page = 1,
    limit = productsPerPage,
    searchQuery = ""
  ) => {
    setIsLoading(true);
    try {
      const data = await getProducts(adminId, page, limit, searchQuery);
      setAllProducts(data.products);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error in fetchProducts:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (searchQuery === "") {
      setCurrentPage(1);
    } else {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchProducts(currentPage, productsPerPage, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery,productsPerPage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isEditing) {
        res = await editProduct(formData.id, formData, adminId);
        if (res.status === 200) {
          toast.success(res?.data?.message);

          const updatedProduct = res.data.product;

          setAllProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === updatedProduct._id ? updatedProduct : product
            )
          );
        }
      } else {
        res = await addProduct(formData, adminId);
        if (res.status === 201) {
          toast.success(res?.data?.message);

          const newProduct = res.data.product;

          setAllProducts((prevProducts) => [newProduct, ...prevProducts]);
        }
      }

      setIsModalOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (isEditing ? "Error updating product" : "Error adding product")
      );
      console.error(error.message);
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      id: product._id,
      productName: product.name,
      price: product.price,
      quantity: product.quantity,
    });
    setIsEditing(true);
    openModal();
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Product Management
          </h1>
        </div>

        {/* Search & Add Button */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-5 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              onClick={openModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-indigo-200"
            >
              Add New Product
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <ProductPageModal
              closeModal={closeModal}
              handleFormSubmit={handleFormSubmit}
              formData={formData}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              X={X}
            />
          </div>
        )}

        {/* Table */}
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <Loader2 className="animate-spin h-10 w-10 text-indigo-600" />
          </div>
        ) : (
          <ProductTable
            filteredProducts={allProducts}
            openEditModal={handleEditProduct}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
          />
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Page;
