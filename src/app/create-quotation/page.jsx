"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProAndSer } from "../../api/adminApi";
import { addClient, addQuotation, getClients } from "../../api/userApi";
import { UserMenu } from "../userComponents/UserMenu";
import { useSelector } from "react-redux";
import { 
  CheckIcon, 
  PlusIcon, 
  XMarkIcon, 
  ShoppingCartIcon, 
  ClipboardDocumentListIcon,
  UserIcon 
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const CreateQuotation = () => {
  const state = useSelector((state) => state);
  const user = state?.user?.user;
  const router = useRouter();
  
  // State Management
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [expireDate, setExpireDate] = useState("");
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1); // Multi-step form
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const today = new Date().toISOString().split("T")[0];

  // Fetch Initial Data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [proAndSerRes, clientsRes] = await Promise.all([
          getProAndSer(),
          getClients()
        ]);
        
        setProducts(proAndSerRes?.data?.products || []);
        setServices(proAndSerRes?.data?.services || []);
        setClients(clientsRes.data.clients || []);
      } catch (err) {
        toast.error("Failed to load data");
        console.error(err);
      }
    };

    fetchInitialData();
  }, []);

  // Calculate Total Amount
  useEffect(() => {
    const productTotal = selectedProducts.reduce(
      (total, product) => total + (product.price * product.quantity), 0
    );
    const serviceTotal = selectedServices.reduce(
      (total, service) => total + service.price, 0
    );
    setTotalAmount(productTotal + serviceTotal);
  }, [selectedProducts, selectedServices]);

  // Handlers
  const handleProductSelection = (product) => {
    setSelectedProducts(prev => 
      prev.some(p => p._id === product._id)
        ? prev.filter(p => p._id !== product._id)
        : [...prev, { ...product, quantity: 1 }]
    );
  };

  const handleServiceSelection = (service) => {
    setSelectedServices(prev => 
      prev.some(s => s._id === service._id)
        ? prev.filter(s => s._id !== service._id)
        : [...prev, service]
    );
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts(prev => 
      prev.map(product => 
        product._id === productId 
          ? { ...product, quantity: Number(quantity) }
          : product
      )
    );
  };

  const handleAddClient = async () => {
    try {
      const res = await addClient(newClient);
      setClients(prev => [...prev, res.data.client]);
      setClientId(res.data.client._id);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(selectedProducts.length==0 && selectedServices.length==0){
       return toast.error('Select Product or Service')
    }
    const quotationData = {
      products: selectedProducts.map(p => ({
        product: p._id,
        quantity: p.quantity,
        price: p.price
      })),
      services: selectedServices.map(s => ({ 
        service: s._id, 
        price: s.price 
      })),
      totalAmount,
      expireDate,
      client: clientId,
      createdBy: user?._id,
    };

    try {
      const res = await addQuotation(quotationData);
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        router.push("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error.message);
    }
  };

  // Multi-step form rendering
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Client Selection */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <UserIcon className="w-6 h-6 mr-2 text-indigo-500" />
                Select Client
              </h2>
              <div className="flex items-center space-x-4">
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="flex-grow px-4 py-2 border rounded-lg"
                >
                  <option value="">Choose a Client</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name} - {client.phone}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition"
                >
                  <PlusIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!clientId}
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg 
                  disabled:opacity-50 hover:bg-indigo-600 transition"
              >
                Next: Select Products
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            {/* Products Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ShoppingCartIcon className="w-6 h-6 mr-2 text-green-500" />
                Select Products
              </h2>
              <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {products.map((product) => (
                  <div 
                    key={product._id}
                    className={`
                      border rounded-lg p-4 cursor-pointer transition
                      ${selectedProducts.some(p => p._id === product._id) 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200'}
                      ${product.quantity <= 0 ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    onClick={() => product.quantity > 0 && handleProductSelection(product)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-500">
                          Price: ₹{product.price} | Stock: {product.quantity}
                        </p>
                      </div>
                      {selectedProducts.some(p => p._id === product._id) && (
                        <input
                          type="number"
                          min="1"
                          max={product.quantity}
                          value={
                            selectedProducts.find(p => p._id === product._id)?.quantity || 1
                          }
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => 
                            handleQuantityChange(product._id, e.target.value)
                          }
                          className="w-16 px-2 py-1 border rounded"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                // disabled={selectedProducts.length === 0}
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg 
                  disabled:opacity-50 hover:bg-indigo-600 transition"
              >
                Next: Select Services
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            {/* Services Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ClipboardDocumentListIcon className="w-6 h-6 mr-2 text-blue-500" />
                Select Services
              </h2>
              <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {services.map((service) => (
                  <div 
                    key={service._id}
                    className={`
                      border rounded-lg p-4 cursor-pointer transition
                      ${selectedServices.some(s => s._id === service._id) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200'}
                      ${!service.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    onClick={() => service.isAvailable && handleServiceSelection(service)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-gray-500">
                          Price: ₹{service.price} | Status: {service.isAvailable ? 'Available' : 'Unavailable'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                // disabled={selectedServices.length === 0}
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg 
                  disabled:opacity-50 hover:bg-indigo-600 transition"
              >
                Next: Review
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            {/* Final Review Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CheckIcon className="w-6 h-6 mr-2 text-green-500" />
                Review Quotation
              </h2>
              
              {/* Selected Products */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Selected Products</h3>
                {selectedProducts.map((product) => (
                  <div key={product._id} className="flex justify-between border-b py-2">
                    <span>{product.name}</span>
                    <span>Qty: {product.quantity} | ₹{product.price * product.quantity}</span>
                  </div>
                ))}
              </div>
              
              {/* Selected Services */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Selected Services</h3>
                {selectedServices.map((service) => (
                  <div key={service._id} className="flex justify-between border-b py-2">
                    <span>{service.name}</span>
                    <span>₹{service.price}</span>
                  </div>
                ))}
              </div>
              
              {/* Expiration Date */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Expiration Date
                </label>
                <input
                  type="date"
                  value={expireDate}
                  onChange={(e) => setExpireDate(e.target.value)}
                  min={today}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              {/* Total Amount */}
              <div className="text-right text-xl font-bold">
                Total Amount: ₹{totalAmount}
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  disabled={!expireDate}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg 
                    disabled:opacity-50 hover:bg-green-600 transition"
                >
                  Create Quotation
                </button>
              </div>
            </div>
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
        <div className="bg-white rounded-lg p-6 w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Client</h2>
            <button 
              onClick={() => setModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newClient.name}
              onChange={(e) => setNewClient(prev => ({...prev, name: e.target.value}))}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={newClient.email}
              onChange={(e) => setNewClient(prev => ({...prev, email: e.target.value}))}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newClient.phone}
              onChange={(e) => setNewClient(prev => ({...prev, phone: e.target.value}))}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Address"
              value={newClient.address}
              onChange={(e) => setNewClient(prev => ({...prev, address: e.target.value}))}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddClient}
                disabled={!newClient.name || !newClient.phone}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg 
                  disabled:opacity-50 hover:bg-indigo-600 transition"
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserMenu />
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg p-8">
            {/* Progress Indicator */}
            <div className="flex justify-between mb-8">
              {[1, 2, 3, 4].map((num) => (
                <div 
                  key={num}
                  className={`
                    w-1/4 h-1 mx-2 rounded-full transition-all
                    ${step >= num ? 'bg-indigo-500' : 'bg-gray-200'}
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