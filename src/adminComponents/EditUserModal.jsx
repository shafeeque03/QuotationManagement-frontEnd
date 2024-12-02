import { updatePassword, updateUser } from '@/api/adminApi';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Lock, User, Mail, Edit2 } from 'lucide-react';

const EditUserModal = ({ user, onClose, onUpdate  }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    loginId: user.loginId,
    isBlocked: user.is_blocked,
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggleBlocked = () => {
    setFormData((prev) => ({ ...prev, isBlocked: !prev.isBlocked }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(user._id, formData);
      toast.success(res?.data?.message||'User details updated successfully!');
      onUpdate(res?.data?.user); 
      onClose();
    } catch (error) {
      toast.error('Failed to update user details!');
    }
  };

  const passwordRule =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/;

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New password and confirm password do not match!');
      return;
    }

    if (!passwordRule.test(passwordData.newPassword)) {
      toast.error(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
      );
      return;
    }

    try {
      await updatePassword(user._id, passwordData);
      toast.success('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowPasswordSection(false);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <Edit2 className="mr-3 w-6 h-6" />
            Edit User Profile
          </h3>
        </div>

        <form onSubmit={handleSubmitDetails} className="p-6 space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter full name"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Login ID
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="loginId"
                value={formData.loginId}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter login ID"
              />
            </div>
          </div>

          <div className="relative flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Is Blocked
            </label>
            <button
              type="button"
              onClick={handleToggleBlocked}
              className={`w-14 h-8 rounded-full relative ${
                formData.isBlocked ? 'bg-red-500' : 'bg-gray-300'
              } transition`}
            >
              <span
                className={`block w-6 h-6 bg-white rounded-full shadow absolute top-1 transition ${
                  formData.isBlocked ? 'right-1' : 'left-1'
                }`}
              ></span>
            </button>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Details
            </button>
          </div>
        </form>

        <div className="px-6 pb-4">
          <button
            onClick={() => setShowPasswordSection(!showPasswordSection)}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <Lock className="mr-2 w-5 h-5" />
            {showPasswordSection ? 'Hide Password Section' : 'Update Password'}
          </button>
        </div>

        {showPasswordSection && (
          <form onSubmit={handlePasswordSubmit} className="p-6 pt-0 space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowPasswordSection(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Update Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUserModal;
