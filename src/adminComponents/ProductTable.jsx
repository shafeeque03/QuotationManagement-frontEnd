import React from 'react'
import DownloadButton from "@/adminComponents/DownloadProAndSer.jsx";

const ProductTable = ({view, products, filteredProducts,openEditModal}) => {
  return (
    <div
          className={`transition-all duration-500 ${
            view === "products"
              ? "opacity-100"
              : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <div className="flex justify-between">

          <h2 className="text-xl font-semibold text-gray-700 mb-4">Products</h2>
          <DownloadButton data={products} fileName="products" />

          </div>
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b cursor-pointer hover:bg-gray-100"
                      onClick={() => openEditModal(product)}
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">{product.price}</td>
                      <td className="px-4 py-2">{product.quantity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default ProductTable