"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../../adminComponents/Sidebar.jsx";
import Pagination from "../../../commonComponents/Pagination.jsx";
import ServiceTable from "@/adminComponents/ServiceTable.jsx";
import { addService, editService, getServices } from "@/api/adminApi.js";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useDebounce from "@/hook/useDebounce.jsx";
import ServicePageModal from "@/adminComponents/ServicePageModal.jsx";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    serviceName: "",
    price: "",
    isAvailable: true, // New field added
  });

  const state = useSelector((state) => state);
  const admin = state?.admin?.admin;
  const adminId = admin?._id;
  const servicesPerPage = 5;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setFormData({ id: "", serviceName: "", price: "", isAvailable: true });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const fetchServices = async (
    page = 1,
    limit = servicesPerPage,
    searchQuery = ""
  ) => {
    setIsLoading(true);
    try {
      const data = await getServices(adminId, page, limit, searchQuery);
      setAllServices(data.services);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error in fetchServices:", err.message);
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
    fetchServices(currentPage, servicesPerPage, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isEditing) {
        res = await editService(formData.id, formData, adminId);
        if (res.status === 200) {
          toast.success(res?.data?.message);

          const updatedService = res.data.service;

          setAllServices((prevServices) =>
            prevServices.map((service) =>
              service._id === updatedService._id ? updatedService : service
            )
          );
        }
      } else {
        res = await addService(formData, adminId);
        if (res.status === 201) {
          toast.success(res?.data?.message);

          const newService = res.data.service;

          setAllServices((prevServices) => [newService, ...prevServices]);
        }
      }

      setIsModalOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (isEditing ? "Error updating service" : "Error adding service")
      );
      console.error(error.message);
    }
  };

  const handleEditService = (service) => {
    setFormData({
      id: service._id,
      serviceName: service.name,
      price: service.price,
      isAvailable: service.isAvailable, // Map existing status
    });
    setIsEditing(true);
    openModal();
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Service Management
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search service..."
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
              Add New Service
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <ServicePageModal
              closeModal={closeModal}
              handleFormSubmit={handleFormSubmit}
              formData={formData}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              X={X}
            />
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <Loader2 className="animate-spin h-10 w-10 text-indigo-600" />
          </div>
        ) : (
          <ServiceTable
            filteredServices={allServices}
            openEditModal={handleEditService}
            currentPage={currentPage}
            servicesPerPage={servicesPerPage}
          />
        )}

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
