import React from "react";

const ProfileDetailsSec = ({
  User,
  profileForm,
  handleProfileChange,
  profileValidation,
  handleProfileUpdate,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Save,
}) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8">
      <div className="flex items-center mb-6">
        <User className="w-10 h-10 text-blue-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">
          Profile Information
        </h2>
      </div>
      <form onSubmit={handleProfileUpdate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <div className="flex items-center">
              <User className="absolute left-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
                className={`pl-10 w-full border rounded-md py-2 px-3 focus:outline-none 
                        ${
                          profileValidation.name
                            ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                            : "border-red-500 focus:ring-2 focus:ring-red-500"
                        }`}
                placeholder="Enter your name"
              />
              {!profileValidation.name && (
                <AlertCircle className="absolute right-3 w-5 h-5 text-red-500" />
              )}
            </div>
          </div>

          {/* Email Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center">
              <Mail className="absolute left-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                className={`pl-10 w-full border rounded-md py-2 px-3 focus:outline-none 
                        ${
                          profileValidation.email
                            ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                            : "border-red-500 focus:ring-2 focus:ring-red-500"
                        }`}
                placeholder="Enter your email"
              />
              {!profileValidation.email && (
                <AlertCircle className="absolute right-3 w-5 h-5 text-red-500" />
              )}
            </div>
          </div>
        </div>

        {/* Phone Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <div className="flex items-center">
            <Phone className="absolute left-3 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={profileForm.phone}
              onChange={handleProfileChange}
              className={`pl-10 w-full border rounded-md py-2 px-3 focus:outline-none 
                      ${
                        profileValidation.phone
                          ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                          : "border-red-500 focus:ring-2 focus:ring-red-500"
                      }`}
              placeholder="Enter your phone number"
            />
            {!profileValidation.phone && (
              <AlertCircle className="absolute right-3 w-5 h-5 text-red-500" />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1
            </label>
            <div className="flex items-center">
              <MapPin className="absolute left-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="address.address1"
                value={profileForm.address.address1}
                onChange={handleProfileChange}
                className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Street Address"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2
              </label>
              <input
                type="text"
                name="address.address2"
                value={profileForm.address.address2}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Apartment, suite, etc."
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                name="address.pincode"
                value={profileForm.address.pincode}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Pincode"
              />
            </div>
          </div>
        </div>

        {/* Update Profile Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 group"
          >
            <Save className="mr-2 w-5 h-5 group-hover:rotate-6" />
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileDetailsSec;
