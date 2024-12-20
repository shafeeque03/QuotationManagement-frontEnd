"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addClient,
  editQuotation,
  getClients,
  getProAndSer,
  quotationDetails,
} from "../../../api/userApi.js";
import { useSelector } from "react-redux";
import {
  CheckIcon,
  PlusIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Check, X } from 'lucide-react';

import toast from "react-hot-toast";
import useDebounce from "@/hook/useDebounce";
import AddClientModal from "@/components/userComponents/AddClientModal";
import UserMenu from "@/components/userComponents/UserMenu.jsx";
import EditSelectClient from "@/components/userComponents/editQuotation/EditSelectClient.jsx";
import EditProductAddSection from "@/components/userComponents/editQuotation/EditProductAddSection.jsx";
import EditServiceAddSection from "@/components/userComponents/editQuotation/EditServiceAddSection.jsx";
import EditFinalSection from "@/components/userComponents/editQuotation/EditFinalSection.jsx";

const UpdateQuotation = ({ params }) => {
  const { qid } = React.use(params);
  const state = useSelector((state) => state);
  const user = state?.user?.user;
  const adminId = user?.adminIs;
  const router = useRouter();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // State Management
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [expireDate, setExpireDate] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientIs, setClientIs] = useState(null);
  const [clients, setClients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [quotation, setQuotation] = useState(null);
  const [step, setStep] = useState(1); // Multi-step form
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [from, setFrom] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [logo, setLogo] = useState(null);

  const [tax, setTax] = useState(0);
  const [taxName, setTaxName] = useState("");
  const [submited, setSubmited] = useState(false);
  const [subTotal, setSubtotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPrice, setShowPrice] = useState(true);
  const debouncedSearchTerm = useDebounce(searchQuery, 600);
  const [emails, setEmails] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [qtns,clientsRes, proAndSerRes] = await Promise.all([
          quotationDetails(qid),
          getClients(adminId),
          getProAndSer(adminId),
        ]);
        setQuotation(qtns?.data?.quotation);
        setClientId(qtns?.data?.quotation?.client._id);
        setClientIs(qtns?.data?.quotation?.client);
        setSelectedProducts(qtns?.data?.quotation?.products);
        setSelectedServices(qtns?.data?.quotation?.services);
        setExpireDate(qtns?.data?.quotation?.expireDate);
        setTotalAmount(qtns?.data?.quotation?.totalAmount);
        setFrom(qtns?.data?.quotation?.from)
        setTax(qtns?.data?.quotation?.tax);
        setTaxName(qtns?.data?.quotation?.taxName);
        setSubtotal(qtns?.data?.quotation?.subTotal)
        setClients(clientsRes.data.clients || []);
        setAllProducts(proAndSerRes.data.products);
        setAllServices(proAndSerRes.data.services);
      } catch (err) {
        toast.error("Failed to load data");
        console.error(err);
      }
    };

    fetchInitialData();
  }, []);



  // Product Form State
  const [productName, setProductName] = useState("");
  const [ProQuantity, setProQuantity] = useState(1);
  const [ProDescription, setProDescription] = useState("");
  const [ProPrice, setProPrice] = useState(0);

  // Service Form State
  const [serviceName, setServiceName] = useState("");
  const [SerDescription, setSerDescription] = useState("");
  const [SerPrice, setSerPrice] = useState(0);

  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  // Add New Product
  const handleAddProduct = () => {
    if (!productName || !ProDescription || ProQuantity <= 0 || ProPrice <= 0) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    const newProduct = {
      name: productName,
      description:ProDescription,
      quantity:ProQuantity,
      price:ProPrice,
    };

    setSelectedProducts((prev) => [...prev, newProduct]);
    setProductName("");
    setProDescription("");
    setProQuantity(1);
    setProPrice(0);
  };

  const handleAddService = () => {
    if (!serviceName || !SerDescription || SerPrice <= 0) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    const newService = {
      name: serviceName,
      description: SerDescription,
      price: SerPrice,
    };

    setSelectedServices((prev) => [...prev, newService]);
    setServiceName("");
    setSerDescription("");
    setSerPrice(0);
  };

  // Remove Product
  const handleRemoveProduct = (index) => {
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveService = (index) => {
    setSelectedServices((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const productTotal = selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const serviceTotal = selectedServices.reduce(
      (total, service) => total + service.price,
      0
    );
    setTotalAmount(productTotal + serviceTotal);
    setSubtotal(totalAmount + (tax / 100) * totalAmount);
  }, [selectedProducts, selectedServices, totalAmount, tax]);

  const handleAddClient = async () => {
    // Check for blank name or email
    if (!newClient.name.trim() || !newClient.email.trim()) {
      toast.error("Name and Email are required!");
      return;
    }

    try {
      const res = await addClient(newClient, adminId);
      setClients((prev) => [...prev, res.data.client]);
      setClientId(res.data.client._id);
      setClientIs(res.data.client);
      setModalOpen(false);
      toast.success("Client added successfully!");

      // Reset new client form
      setNewClient({
        name: "",
        email: "",
        address: "",
        phone: "",
      });
    } catch (err) {
      toast.error("Failed to add client");
      console.error(err);
    }
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validation checks
    if (selectedProducts.length === 0 && selectedServices.length === 0) {
      return toast.error("Select Product or Service");
    }
    if (emails.length === 0) {
      return toast.error("Please add email");
    }
    if (from.name.trim() === '' || from.email.trim() === '' || from.phone.trim() === '' || from.address.trim() === '') {
      return toast.error("Please add from details");
    }
    
    // Open confirmation modal instead of submitting directly
    setIsConfirmModalOpen(true);
  };

  const handleConfirmedSubmit = async () => {
    setIsConfirmModalOpen(false);
    
    const quotationData = {
      products: selectedProducts.map((p) => ({
        name: p.name,
        description: p.description,
        quantity: p.quantity,
        price: p.price,
      })),
      services: selectedServices.map((s) => ({
        name: s.name,
        description: s.description,
        price: s.price,
      })),
      totalAmount,
      expireDate,
      client: clientId,
      createdBy: user?._id,
      termsAndConditions,
      description,
      title,
      tax,
      taxName,
      subTotal,
      showPrice,
      emails,
      from,
      logo,
    };

    try {
      setSubmited(true);
      const res = await editQuotation(quotationData, qid);
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        router.push(`/quotation-details?qid=${qid}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error.message);
    } finally {
      setSubmited(false);
    }
  };

  const ConfirmationModal = () => {
    if (!isConfirmModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Confirm Quotation Update</h3>
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Are you sure you want to update this quotation? This action will modify the existing quotation details.
          </p>
          
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmedSubmit}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Confirm Update
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    // Filter clients based on the search query
    const filteredClients = clients.filter((client) =>
      client.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Client Selection */}
            <EditSelectClient
              UserIcon={UserIcon}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              clientId={clientId}
              setClientId={setClientId}
              filteredClients={filteredClients}
              setModalOpen={setModalOpen}
              PlusIcon={PlusIcon}
              setStep={setStep}
              setClientIs={setClientIs}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Product Form */}
            <EditProductAddSection
              productName={productName}
              setProductName={setProductName}
              ProDescription={ProDescription}
              setProDescription={setProDescription}
              ProPrice={ProPrice}
              setProPrice={setProPrice}
              ProQuantity={ProQuantity}
              setProQuantity={setProQuantity}
              selectedProducts={selectedProducts}
              setStep={setStep}
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
              allProducts={allProducts}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* File Section */}
            <EditServiceAddSection
              serviceName={serviceName}
              setServiceName={setServiceName}
              SerDescription={SerDescription}
              setSerDescription={setSerDescription}
              SerPrice={SerPrice}
              setSerPrice={setSerPrice}
              selectedServices={selectedServices}
              setStep={setStep}
              handleAddService={handleAddService}
              handleRemoveService={handleRemoveService}
              allServices={allServices}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              For PDF purpose
            </h2>
            {/* Terms and Conditions Section */}
            <div className="mt-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Quotation Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter terms and conditions"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </div>

            {/* Terms and Conditions Section */}
            <div className="mt-4">
              <label
                htmlFor="termsAndConditions"
                className="block text-sm font-medium text-gray-700"
              >
                Terms and Conditions
              </label>
              <textarea
                id="termsAndConditions"
                rows={6}
                value={termsAndConditions}
                onChange={(e) => setTermsAndConditions(e.target.value)}
                placeholder="Enter terms and conditions"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </div>

            {/* Description Section */}
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex mt-3 justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg 
                              disabled:opacity-50 hover:bg-indigo-600 transition"
              >
                Next: Review
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            {/* Final Review Section */}
            <EditFinalSection
              CheckIcon={CheckIcon}
              selectedProducts={selectedProducts}
              selectedServices={selectedServices}
              expireDate={expireDate}
              setExpireDate={setExpireDate}
              today={today}
              totalAmount={totalAmount}
              setStep={setStep}
              clientIs={clientIs}
              tax={tax}
              setTax={setTax}
              subTotal={subTotal}
              taxName={taxName}
              setTaxName={setTaxName}
              showPrice={showPrice}
              setShowPrice={setShowPrice}
              emails={emails}
              setEmails={setEmails}
              submited={submited}
              from={from}
              setFrom={setFrom}
              logo={logo}
              setLogo={setLogo}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Add modal for creating new client
  const renderNewClientModal = () => {
    if (!modalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {/* Addclinet */}
        <AddClientModal
          setModalOpen={setModalOpen}
          XMarkIcon={XMarkIcon}
          newClient={newClient}
          setNewClient={setNewClient}
          handleAddClient={handleAddClient}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserMenu />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-center font-bold text-2xl mb-4">Edit Quotation</h1>
        <form onSubmit={handleFormSubmit} className="max-w-7xl mx-auto">
          <div className="bg-white shadow-2xl rounded-xl p-12 relative">

            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-12">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        transition-all duration-500 border-2
                        ${step > num 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : step === num
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-white border-gray-300 text-gray-500'}
                      `}
                    >
                      {step > num ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="font-semibold">{num}</span>
                      )}
                    </div>
                  </div>
                  {num < 5 && (
                    <div className="w-24 h-1 mx-2">
                      <div className={`
                        h-full rounded-full transition-all duration-500
                        ${step > num 
                          ? 'bg-green-500' 
                          : step === num
                          ? 'bg-indigo-600'
                          : 'bg-gray-200'}
                      `} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Rest of the form content */}
            {renderStep()}
          </div>
        </form>

        {/* Confirmation Modal */}
        <ConfirmationModal />

        {renderNewClientModal()}
      </div>
    </div>
  );
};

export default UpdateQuotation;
