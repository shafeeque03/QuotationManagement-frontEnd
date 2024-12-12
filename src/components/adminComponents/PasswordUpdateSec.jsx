import React from "react";

const PasswordUpdateSec = ({
  Lock,
  showPasswordSection,
  ShieldAlert,
  setShowPasswordSection,
  handlePasswordUpdate,
  showPassword,
  passwordForm,
  handlePasswordChange,
  passwordValidation,
  AlertCircle,
  setShowPassword,
  EyeOff,
  EyeIcon,
  Edit
}) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8">
      <div className="flex items-center mb-6">
        <Lock className="w-10 h-10 text-green-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">
          {showPasswordSection ? "Change Password" : "Secure Password"}
        </h2>
      </div>

      {!showPasswordSection ? (
        <div className="text-center">
          <ShieldAlert className="mx-auto w-20 h-20 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-6">
            Protect your account by regularly updating your password.
          </p>
          <button
            onClick={() => setShowPasswordSection(true)}
            className="mx-auto flex items-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
          >
            <Lock className="mr-2 w-5 h-5" />
            Change Password
          </button>
        </div>
      ) : (
        <form onSubmit={handlePasswordUpdate} className="space-y-6">
          {/* New Password Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="flex items-center">
              <Lock className="absolute left-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className={`pl-10 pr-10 w-full border rounded-md py-2 px-3 focus:outline-none 
                        ${
                          passwordValidation.newPassword
                            ? "border-gray-300 focus:ring-2 focus:ring-green-500"
                            : "border-red-500 focus:ring-2 focus:ring-red-500"
                        }`}
                placeholder="Enter new password"
              />
              {!passwordValidation.newPassword && (
                <AlertCircle className="absolute right-10 w-5 h-5 text-red-500" />
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            {!passwordValidation.newPassword && (
              <p className="text-xs text-red-500 mt-1">
                Password must be 8+ chars, include uppercase, lowercase, number,
                and special character.
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="flex items-center">
              <Lock className="absolute left-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className={`pl-10 pr-10 w-full border rounded-md py-2 px-3 focus:outline-none 
                        ${
                          passwordValidation.confirmPassword
                            ? "border-gray-300 focus:ring-2 focus:ring-green-500"
                            : "border-red-500 focus:ring-2 focus:ring-red-500"
                        }`}
                placeholder="Confirm new password"
              />
              {!passwordValidation.confirmPassword && (
                <AlertCircle className="absolute right-10 w-5 h-5 text-red-500" />
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            {!passwordValidation.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                Passwords do not match or do not meet requirements.
              </p>
            )}
          </div>

          {/* Password Update Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setShowPasswordSection(false)}
              className="flex items-center text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 group"
            >
              <Edit className="mr-2 w-5 h-5 group-hover:rotate-6" />
              Change Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PasswordUpdateSec;
