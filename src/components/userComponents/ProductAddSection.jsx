import React, { useEffect, useState } from "react";
import useDebounce from "@/hook/useDebounce";

const ProductAddSection = ({
  productName,
  setProductName,
  ProDescription,
  setProDescription,
  ProQuantity,
  setProQuantity,
  ProPrice,
  setProPrice,
  selectedProducts,
  setStep,
  handleAddProduct,
  handleRemoveProduct,
  allProducts,
}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Use debounce to delay filtering
  const debouncedProductName = useDebounce(productName, 300);

  // Filter products based on debounced product name input
  useEffect(() => {
    if (debouncedProductName) {
      const filtered = allProducts.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(debouncedProductName.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Clear suggestions if the input is empty
    }
  }, [debouncedProductName, allProducts]);

  // Set product details when a suggestion is clicked
  const handleSelectProduct = (product) => {
    setProductName(product.name);
    setProDescription(product.description);
    setFilteredProducts([]);
  };

  return (
    <div>
      <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Add Products</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="w-full">
            <label htmlFor="productName" className="block text-sm font-medium mb-2">
              Product Name
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="w-full p-2 border rounded-md"
              />
              {debouncedProductName && filteredProducts.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                  <ul className="divide-y divide-gray-200">
                    {filteredProducts.map((product, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectProduct(product)}
                        className="cursor-pointer p-2 hover:bg-gray-100"
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-gray-500 text-sm">{product.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div className="w-full">
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <input
              id="description"
              type="text"
              value={ProDescription}
              onChange={(e) => setProDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={ProQuantity}
              onChange={(e) => setProQuantity(Number(e.target.value))}
              placeholder="Enter quantity"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={ProPrice}
              onChange={(e) => setProPrice(Number(e.target.value))}
              placeholder="Enter price"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddProduct}
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          Add Product
        </button>
      </div>

      {/* Added Products Table */}
      <div className="space-y-4 bg-white p-4 rounded-lg shadow-md mt-4">
        <h3 className="text-lg font-semibold">Selected Products</h3>
        {selectedProducts.length === 0 ? (
          <p className="text-gray-500">No products added yet.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product, index) => (
                <tr key={index}>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">{product.ProDescription}</td>
                  <td className="border p-2">{product.ProQuantity}</td>
                  <td className="border p-2">{product.ProPrice}</td>
                  <td className="border p-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(index)}
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
          onClick={() => setStep(1)}
          className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setStep(3)}
          className="px-6 py-2 bg-indigo-500 text-white rounded-lg 
                     disabled:opacity-50 hover:bg-indigo-600 transition"
        >
          Next: Select Services
        </button>
      </div>
    </div>
  );
};

export default ProductAddSection;