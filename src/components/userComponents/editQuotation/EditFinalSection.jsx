import React, { useState,useRef } from "react";

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
  tax,
  setTax,
  subTotal,
  taxName,
  setTaxName,
  showPrice,
  setShowPrice,
  emails,
  setEmails,
  submited,
  from,
  setFrom,
  logo,
  setLogo,
}) => {
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEditingFrom, setIsEditingFrom] = useState(false);
  const fileInputRef = useRef(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleAddEmail = () => {
    if (!newEmail.trim()) {
      setEmailError("Email cannot be empty");
      return;
    }

    if (!validateEmail(newEmail)) {
      setEmailError("Invalid email format");
      return;
    }

    if (emails.includes(newEmail)) {
      setEmailError("Email already added");
      return;
    }

    setEmails([...emails, newEmail]);
    setNewEmail("");
    setEmailError("");
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const handleFromChange = (field, value) => {
    setFrom(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderFromDetails = () => {
    if (isEditingFrom) {
      return (
        <div className="bg-gray-50 p-5 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Edit Sender Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-2">Name</label>
              <input
                type="text"
                value={from.name}
                onChange={(e) => handleFromChange('name', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={from.email}
                onChange={(e) => handleFromChange('email', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Phone</label>
              <input
                type="tel"
                value={from.phone}
                onChange={(e) => handleFromChange('phone', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Your Phone Number"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Address</label>
              <input
                type="text"
                value={from.address}
                onChange={(e) => handleFromChange('address', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Your Address"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-3">
            <button
              type="button"
              onClick={() => setIsEditingFrom(false)}
              className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setIsEditingFrom(false)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Save
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="mb-6 bg-gray-50 p-5 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Sender Information
          </h3>
          <button
            type="button"
            onClick={() => setIsEditingFrom(true)}
            className="text-blue-500 hover:text-blue-600 text-sm bg-blue-50 px-3 py-1 rounded-full"
          >
            Edit
          </button>
        </div>
        {from.name || from.email || from.phone || from.address ? (
          <div className="grid grid-cols-2 gap-3">
            {from.name && (
              <>
                <div className="text-gray-600">Name:</div>
                <div className="font-medium">{from.name}</div>
              </>
            )}
            {from.email && (
              <>
                <div className="text-gray-600">Email:</div>
                <div className="font-medium">{from.email}</div>
              </>
            )}
            {from.phone && (
              <>
                <div className="text-gray-600">Phone:</div>
                <div className="font-medium">{from.phone}</div>
              </>
            )}
            {from.address && (
              <>
                <div className="text-gray-600">Address:</div>
                <div className="font-medium">{from.address}</div>
              </>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center">
            No sender information added.
          </p>
        )}
      </div>
    );
  };


  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, GIF, SVG, WEBP)');
        return;
      }

      // Check file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      // Create a file reader to display the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo({
          file: file,
          preview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderLogoSection = () => {
    return (
      <div className="mb-6 bg-gray-50 p-5 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Company Logo
        </h3>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLogoUpload}
            accept="image/jpeg,image/png,image/gif,image/svg+xml,image/webp"
            className="hidden"
            id="logo-upload"
          />
          <label 
            htmlFor="logo-upload" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
          >
            Upload Logo
          </label>
          
          {logo && (
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 border-2 border-gray-300 rounded-lg overflow-hidden">
                <img 
                  src={logo.preview} 
                  alt="Company Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="text-red-500 hover:text-red-600 text-sm bg-red-50 px-3 py-1 rounded-full"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Accepted formats: JPEG, PNG, GIF, SVG, WEBP (Max 5MB)
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-gray-200 flex items-center">
        <CheckIcon className="w-8 h-8 mr-3 text-green-500" />
        Review Quotation
      </h2>

      {renderLogoSection()}
      {renderFromDetails()}

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

      <div className="mb-6 bg-gray-50 p-5 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          Add Email
        </h3>
        
        {/* Email Input */}
        <div className="flex mb-4">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
              setEmailError("");
            }}
            placeholder="Enter email to send quotation"
            className="flex-grow px-4 py-2 border-2 border-gray-200 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddEmail}
            className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 transition"
          >
            Add Email
          </button>
        </div>

        {/* Email Error Message */}
        {emailError && (
          <p className="text-red-500 text-sm mb-4">{emailError}</p>
        )}

        {/* Added Emails List */}
        {emails.length > 0 ? (
          <div className="space-y-2">
            <h4 className="text-md font-medium mb-2">Quotation will be sent to:</h4>
            <ul className="space-y-2">
              {emails.map((email, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                >
                  <span className="text-sm text-gray-700 flex-grow">{email}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(email)}
                    className="text-red-500 hover:text-red-600 text-sm bg-red-50 px-3 py-1 rounded-full"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center">
            No emails added for sending quotation.
          </p>
        )}
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
                      {product.description || "No description"}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {product.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {product.quantity}
                  </td>
                  <td className="py-3 px-4 text-center font-semibold">
                    {(product.price * product.quantity).toFixed(2)}
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
                      {service.description || "No description"}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold">
                    {service.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          onClick={() => setStep(4)}
          className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition"
        >
          Previous
        </button>
        <button
          type="submit"
          disabled={!expireDate||submited}
          className="px-6 py-3 bg-green-500 text-white rounded-lg 
          disabled:opacity-50 hover:bg-green-600 transition flex items-center"
        >
          {submited?'Creating..':'Submit'}
          <CheckIcon className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FinalSection;
