import React from "react";
import DownloadButton from "@/components/adminComponents/DownloadProAndSer.jsx";

const ProductTable = ({ filteredProducts, currentPage, productsPerPage }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-x-auto">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold text-gray-700">Products</h2>
        <DownloadButton fileName="products" />
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                No
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product.id || index}
                  className="hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-16">
                    {index + 1 + (currentPage - 1) * productsPerPage}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 w-1/4">
                    <div className="break-words max-w-[200px]">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="break-words">
                      {product.description}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-4 text-center text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;