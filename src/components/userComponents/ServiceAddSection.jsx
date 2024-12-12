import React, { useState, useEffect } from "react";
import useDebounce from "@/hook/useDebounce";

const ServiceAddSection = ({
  serviceName,
  setServiceName,
  SerDescription,
  setSerDescription,
  SerPrice,
  setSerPrice,
  selectedServices,
  setStep,
  handleAddService,
  handleRemoveService,
  allServices,
}) => {
  const [suggestedServices, setSuggestedServices] = useState([]); // Suggested services list
  const debouncedServiceName = useDebounce(serviceName.trim(), 300);

  // Filter suggestions while typing
  useEffect(() => {
    if (debouncedServiceName) {
      const suggestions = allServices.filter((service) =>
        service.name.toLowerCase().includes(debouncedServiceName.toLowerCase())
      );
      setSuggestedServices(suggestions);
    } else {
      setSuggestedServices([]);
    }
  }, [debouncedServiceName, allServices]);

  const handleSelectSuggestion = (service) => {
    setServiceName(service.name);
    setSerDescription(service.description);
    setSerPrice(service.price || 0);
    setSuggestedServices([]); // Clear suggestions
  };

  return (
    <div>
      {/* Add Services Section */}
      <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Add Service</h3>
        <div className="grid grid-cols-1 gap-4">
          {/* Service Name */}
          <div>
            <label htmlFor="serviceName" className="block text-sm font-medium">
              Service Name
            </label>
            <input
              type="text"
              id="serviceName"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="Enter service name"
              className="w-full p-2 border rounded-md"
            />
            {suggestedServices.length > 0 && (
              <div className="mt-2 max-h-40 overflow-y-auto bg-white border rounded-md shadow-lg">
                <ul className="space-y-1">
                  {suggestedServices.map((service, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectSuggestion(service)}
                      className="cursor-pointer p-2 hover:bg-gray-200"
                    >
                      {service.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Service Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={SerDescription}
              onChange={(e) => setSerDescription(e.target.value)}
              placeholder="Enter service description"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Service Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={SerPrice}
              onChange={(e) => setSerPrice(Number(e.target.value))}
              placeholder="Enter service price"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddService}
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          Add Service
        </button>
      </div>

      {/* Selected Services Table */}
      <div className="space-y-4 bg-white p-4 rounded-lg shadow-md mt-4">
        <h3 className="text-lg font-semibold">Selected Services</h3>
        {selectedServices.length === 0 ? (
          <p className="text-gray-500">No services added yet.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedServices.map((service, index) => (
                <tr key={index}>
                  <td className="border p-2">{service.name}</td>
                  <td className="border p-2">{service.SerDescription}</td>
                  <td className="border p-2">{service.SerPrice}</td>
                  <td className="border p-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveService(index)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex mt-3 justify-between">
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
          className="px-6 py-2 bg-indigo-500 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-600 transition"
        >
          Next: File Upload
        </button>
      </div>
    </div>
  );
};

export default ServiceAddSection;
