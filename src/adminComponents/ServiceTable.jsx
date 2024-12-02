import React from "react";
import DownloadButton from "@/adminComponents/DownloadProAndSer.jsx";

const ServiceTable = ({ filteredServices, openEditModal, currentPage, servicesPerPage }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold text-gray-700">Services</h2>
        <DownloadButton fileName="services" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-200 transition cursor-pointer"
                  onClick={() => openEditModal(service)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1 + (currentPage - 1) * servicesPerPage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${service.price?.toFixed(2) || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.isAvailable ? "Available" : "Not Available"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTable;
