import React from "react";

const FinalSection = ({
  CheckIcon,
  selectedProducts,
  selectedServices,
  expireDate,
  setExpireDate,
  today,
  totalAmount,
  setStep,
  clientIs,
  file,
  removeFile,
  tax,
  setTax,
  subTotal,
  taxName,
  setTaxName,
  showPrice,
  setShowPrice
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-gray-200 flex items-center">
        <CheckIcon className="w-8 h-8 mr-3 text-green-500" />
        Review Quotation
      </h2>

      

      {/* Client Details */}
      <div className="mb-6 bg-gray-50 p-5 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Client Information
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-gray-600">Name:</div>
          <div className="font-medium">{clientIs.name}</div>
          <div className="text-gray-600">Email:</div>
          <div className="font-medium">{clientIs.email}</div>
          <div className="text-gray-600">Phone:</div>
          <div className="font-medium">{clientIs.phone}</div>
          <div className="text-gray-600">Address:</div>
          <div className="font-medium">{clientIs.address}</div>
        </div>
      </div>

      {/* Products Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Selected Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-4 text-left">Product Name</th>
                <th className="py-3 px-4 text-center">Description</th>
                <th className="py-3 px-4 text-center">Price</th>
                <th className="py-3 px-4 text-center">Quantity</th>
                <th className="py-3 px-4 text-center">Total</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {selectedProducts.map((product, index) => (
                <tr
                  key={product._id || index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-left">
                    <span className="font-medium">{product.name}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <p className="text-gray-500">
                      {product.ProDescription || "No description"}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {product.ProPrice.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {product.ProQuantity}
                  </td>
                  <td className="py-3 px-4 text-center font-semibold">
                    {(product.ProPrice * product.ProQuantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Services Table */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Selected Services</h3>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-4 text-left">Service Name</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {selectedServices.map((service, index) => (
                <tr
                  key={service._id || index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-left">
                    <span className="font-medium">{service.name}</span>
                  </td>
                  <td className="py-3 px-4 text-left">
                    <p className="text-gray-500">
                      {service.SerDescription || "No description"}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold">
                    {service.SerPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Files Section */}
      <div className="mb-6 bg-gray-50 p-5 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Selected Files</h3>
        {file.length > 0 ? (
          <ul className="space-y-2">
            {file.map((val, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
              >
                <span className="text-sm text-gray-700 truncate max-w-[70%]">
                  {val.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-600 text-sm bg-red-50 px-3 py-1 rounded-full"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 text-center">
            No files selected.
          </p>
        )}
      </div>

      {/* Expiration Date */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-3">
          Expiration Date
        </label>
        <input
          type="date"
          value={expireDate}
          onChange={(e) => setExpireDate(e.target.value)}
          min={today}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Toggle Price Visibility */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-gray-600 font-semibold">Show Prices (PDF Purpose)</span>
        <label
          htmlFor="show-price-toggle"
          className="relative inline-flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            id="show-price-toggle"
            className="sr-only peer"
            checked={showPrice}
            onChange={() => setShowPrice(!showPrice)}
          />
          <div
            className="w-14 h-8 bg-gray-200 rounded-full peer-checked:bg-green-500
            peer-checked:after:translate-x-6 after:content-[''] after:absolute
            after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6
            after:w-6 after:transition-all"
          ></div>
        </label>
      </div>

      {/* Total Summary */}
      <div className="bg-gray-50 p-5 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Total</span>
          <span className="text-xl font-bold">{totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="tax-input" className="text-gray-600">
            Tax Name
          </label>
          <input
            id="tax-name"
            type="text"
            value={taxName}
            onChange={(e) => setTaxName(e.target.value)}
            className="w-24 px-2 py-1 text-right text-xl border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Tax-name"
            inputMode="decimal"
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="tax-input" className="text-gray-600">
            {taxName} - %
          </label>
          <input
            id="tax-input"
            type="number"
            value={tax}
            onChange={(e) => setTax(Number(e.target.value))}
            className="w-24 px-2 py-1 text-right text-xl font-bold border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
            inputMode="decimal"
            max={100}
          />
        </div>
        <div className="flex justify-between items-center border-t pt-2">
          <span className="text-gray-600 font-semibold">Subtotal</span>
          <span className="text-xl font-bold">{subTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => setStep(5)}
          className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition"
        >
          Previous
        </button>
        <button
          type="submit"
          disabled={!expireDate}
          className="px-6 py-3 bg-green-500 text-white rounded-lg 
          disabled:opacity-50 hover:bg-green-600 transition flex items-center"
        >
          Create Quotation
          <CheckIcon className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FinalSection;
