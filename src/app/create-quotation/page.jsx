"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addClient,
  addQuotation,
  getClients,
  getProAndSer,
} from "../../api/userApi";
import { UserMenu } from "../../components/userComponents/UserMenu";
import { useSelector } from "react-redux";
import {
  CheckIcon,
  PlusIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import toast from "react-hot-toast";
import useDebounce from "@/hook/useDebounce";
import SelectClient from "@/components/userComponents/SelectClient";
import SelectFileSection from "@/components/userComponents/SelectFileSection";
import FinalSection from "@/components/userComponents/FinalSection";
import AddClientModal from "@/components/userComponents/AddClientModal";
import ProductAddSection from "@/components/userComponents/ProductAddSection";
import ServiceAddSection from "@/components/userComponents/ServiceAddSection";

const CreateQuotation = () => {
  const state = useSelector((state) => state);
  const user = state?.user?.user;
  const adminId = user?.adminIs;
  const router = useRouter();

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
  const [step, setStep] = useState(1); // Multi-step form
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [tax,setTax] = useState(0);
  const [taxName,setTaxName] = useState("")
  const [subTotal,setSubtotal] = useState(0)
  const [searchQuery, setSearchQuery] = useState("");
  const [showPrice, setShowPrice] = useState(true)
  const debouncedSearchTerm = useDebounce(searchQuery, 600);
  const [emails,setEmails] = useState([])

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [clientsRes, proAndSerRes] = await Promise.all([
          getClients(adminId),
          getProAndSer(adminId),
        ]);
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
  const [submited,setSubmited] = useState(false)

  // Service Form State
  const [serviceName, setServiceName] = useState("");
  const [SerDescription, setSerDescription] = useState("");
  const [SerPrice, setSerPrice] = useState(0);

  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("")


  // Add New Product
  const handleAddProduct = () => {
    if (!productName || !ProDescription || ProQuantity <= 0 || ProPrice <= 0) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    const newProduct = {
      name: productName,
      ProDescription,
      ProQuantity,
      ProPrice,
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
      SerDescription,
      SerPrice,
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
      (total, product) => total + product.ProPrice * product.ProQuantity,
      0
    );
    const serviceTotal = selectedServices.reduce(
      (total, service) => total + service.SerPrice,
      0
    );
    setTotalAmount(productTotal + serviceTotal);
    setSubtotal(totalAmount+(tax/100)* totalAmount)
  }, [selectedProducts, selectedServices,totalAmount,tax]);

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
      setClientIs(res.data.client)
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

  const [file, setFile] = useState([]);
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Check if the total number of files exceeds the limit
    if (file.length + selectedFiles.length > 5) {
      toast.error("You can upload a maximum of 5 files.");
      return;
    }

    // Convert files to Base64 and update state
    setFilesToBase(selectedFiles);
  };

  const removeFile = (index) => {
    setFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const setFilesToBase = (files) => {
    files.forEach((fileItem) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileItem);

      reader.onloadend = () => {
        setFile((prev) => [
          ...prev,
          { name: fileItem.name, base64: reader.result },
        ]);
      };
    });
  };

  const handleSubmit = async (e) => {
    setSubmited(true)
    e.preventDefault();
    if (selectedProducts.length == 0 && selectedServices.length == 0) {
      return toast.error("Select Product or Service");
    }
    if(emails.length==0){
      return toast.error("Please add email");
    }
    const quotationData = {
      products: selectedProducts.map((p) => ({
        name: p.name,
        description: p.ProDescription,
        quantity: p.ProQuantity,
        price: p.ProPrice,
      })),
      services: selectedServices.map((s) => ({
        name: s.name,
        description: s.SerDescription,
        price: s.SerPrice,
      })),
      totalAmount,
      expireDate,
      client: clientId,
      createdBy: user?._id,
      file,
      termsAndConditions,
      description,
      title,
      tax,
      taxName,
      subTotal,
      showPrice,
      emails
    };

    try {
      const res = await addQuotation(quotationData, adminId);
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        // router.push("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error.message);
    } finally {
      setSubmited(false)
    }
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
            <SelectClient
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
            <ProductAddSection
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
            <ServiceAddSection
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
            {/* File Section */}
            <SelectFileSection
              CheckIcon={CheckIcon}
              handleFileChange={handleFileChange}
              file={file}
              setStep={setStep}
              removeFile={removeFile}
            />
          </div>
        );

      case 5:
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
                onClick={() => setStep(4)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setStep(6)}
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg 
                              disabled:opacity-50 hover:bg-indigo-600 transition"
              >
                Next: Review
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            {/* Final Review Section */}
            <FinalSection
              CheckIcon={CheckIcon}
              selectedProducts={selectedProducts}
              selectedServices={selectedServices}
              expireDate={expireDate}
              setExpireDate={setExpireDate}
              today={today}
              totalAmount={totalAmount}
              setStep={setStep}
              clientIs={clientIs}
              file={file}
              removeFile={removeFile}
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
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          <div className="bg-white shadow-2xl rounded-xl p-12">
            {/* Progress Indicator */}
            <div className="flex justify-between mb-12">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={num}
                  className={`
                w-1/4 h-2 mx-3 rounded-full transition-all
                ${step >= num ? "bg-indigo-600" : "bg-gray-200"}
              `}
                />
              ))}
            </div>

            {/* Render current step */}
            {renderStep()}
          </div>
        </form>

        {/* New Client Modal */}
        {renderNewClientModal()}
      </div>
    </div>
  );
};

export default CreateQuotation;
