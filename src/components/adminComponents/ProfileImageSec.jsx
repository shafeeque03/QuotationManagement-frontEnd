import React from "react";

const ProfileImageSec = ({
  ImagePlus,
  previewLogo = null, // Default to null for SSR consistency,
  handleLogoFileChange,
  handleRemoveLogo,
  Trash2,
  logoFile,
  handleLogoUpload,
  Save,
  buttonName
}) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8">
      <div className="flex items-center mb-6">
        <ImagePlus className="w-10 h-10 text-purple-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">Organization Logo</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        {/* Logo Preview */}
        <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          {previewLogo ? (
            <img
              src={previewLogo}
              alt="Admin Logo"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          ) : (
            <p className="text-gray-400 text-center">No logo uploaded</p>
          )}
        </div>

        {/* File Input and Actions */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <label className="block">
              <span className="cursor-pointer flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                <ImagePlus className="mr-2 w-5 h-5" />
                Choose Logo
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/svg+xml"
                  className="hidden"
                  onChange={handleLogoFileChange}
                />
              </span>
            </label>

            {previewLogo && (
              <button
                onClick={handleRemoveLogo}
                className="flex items-center text-red-600 hover:text-red-800 transition duration-300"
              >
                <Trash2 className="mr-2 w-5 h-5" />
                Remove
              </button>
            )}
          </div>

          {logoFile && (
            <button
              onClick={handleLogoUpload}
              className="flex items-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
            >
              <Save className="mr-2 w-5 h-5" />
              {buttonName}
            </button>
          )}

          <p className="text-xs text-gray-500 mt-2">
            Accepted formats: JPEG, PNG, SVG (Max 5MB)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageSec;
