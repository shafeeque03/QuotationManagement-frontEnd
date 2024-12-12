"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAdminProfile,
  updateAdminPassword,
  updateAdminLogo,
} from "@/api/adminApi";
import Sidebar from "@/components/adminComponents/Sidebar";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Lock,
  Save,
  Edit,
  EyeOff,
  EyeIcon,
  ShieldAlert,
  AlertCircle,
  ImagePlus,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { adminLogin } from "@/redux/slice/AdminSlice";
import ProfileDetailsSec from "@/components/adminComponents/ProfileDetailsSec";
import PasswordUpdateSec from "@/components/adminComponents/PasswordUpdateSec";
import ProfileImageSec from "@/components/adminComponents/ProfileImageSec";

const AdminProfilePage = () => {
  const state = useSelector((state) => state);
  const admin = state?.admin?.admin || {};
  const adminId = admin?._id;
  const [buttonName,setButtonName] = useState('Upload Logo')

  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure hydration on the client
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Logo state
  const [logoFile, setLogoFile] = useState(null);
  const adminLogo = admin.logo || null;
  const [previewLogo, setPreviewLogo] = useState(adminLogo || null);
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: admin.name || "",
    email: admin.email || "",
    phone: admin.phone || "",
    address: {
      address1: admin.address?.address1 || "",
      address2: admin.address?.address2 || "",
      pincode: admin.address?.pincode || "",
    },
  });

  const dispatch = useDispatch();

  const handleLogoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload JPEG, PNG, or SVG.");
        return;
      }

      if (file.size > maxSize) {
        toast.error("File size should be less than 5MB.");
        return;
      }

      // Create preview and set file
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewLogo(reader.result);
        setLogoFile({ name: file.name, base64: reader.result });
      };
    }
  };

  const handleLogoUpload = async () => {
    if (!logoFile) {
      toast.error("Please select a logo first");
      return;
    }

    try {
      setButtonName('Uploading..')
      const res = await updateAdminLogo(adminId, logoFile);
      dispatch(adminLogin({ admin: res?.data?.newAdmin }));
      toast.success("Logo updated successfully!");

      // Optionally update the logo URL in state if the API returns it
      if (res?.data?.newAdmin) {
        setPreviewLogo(res?.data?.newAdmin?.logo);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logo upload failed");
    } finally{
      setButtonName('Upload Logo')
    }
  };

  // Remove logo
  const handleRemoveLogo = async () => {
    try {
      await updateAdminLogo(adminId, null);
      setPreviewLogo(null);
      setLogoFile(null);
      toast.success("Logo removed successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logo removal failed");
    }
  };

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Form validation states
  const [profileValidation, setProfileValidation] = useState({
    name: true,
    email: true,
    phone: true,
  });

  const [passwordValidation, setPasswordValidation] = useState({
    newPassword: true,
    confirmPassword: true,
  });

  // Toggle password section
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validation rules
  const passwordRule =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRule = /^[0-9]{5,10}$/;

  // Validate profile form
  const validateProfileForm = () => {
    const validation = {
      name: profileForm.name.trim().length > 0,
      email: emailRule.test(profileForm.email),
      phone: phoneRule.test(profileForm.phone),
    };
    setProfileValidation(validation);
    return Object.values(validation).every(Boolean);
  };

  // Validate password form
  const validatePasswordForm = () => {
    const validation = {
      newPassword: passwordRule.test(passwordForm.newPassword),
      confirmPassword:
        passwordForm.newPassword === passwordForm.confirmPassword &&
        passwordRule.test(passwordForm.newPassword),
    };
    setPasswordValidation(validation);
    return Object.values(validation).every(Boolean);
  };

  // Handle profile form input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setProfileForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setProfileForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle password form input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  // Update profile handler
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!validateProfileForm()) {
      toast.error("Please check your profile information");
      return;
    }

    try {
      const res = await updateAdminProfile(adminId, profileForm);
      dispatch(adminLogin({ admin: res?.data?.user }));
      toast.success(res?.data?.message || "Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    }
  };

  // Update password handler
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      toast.error("Please check your password requirements");
      return;
    }

    try {
      await updateAdminPassword(adminId, {
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });

      // Reset password form after successful update
      setPasswordForm({
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed");
    }
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 space-y-8">
        {!adminLogo ? (
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-xl text-gray-300">Loading user information...</p>
          </div>
        ) : (
          <>
          <ProfileDetailsSec
                User={User}
                profileForm={profileForm}
                handleProfileChange={handleProfileChange}
                profileValidation={profileValidation}
                handleProfileUpdate={handleProfileUpdate}
                AlertCircle={AlertCircle}
                Mail={Mail}
                Phone={Phone}
                MapPin={MapPin}
                Save={Save}
              />
            {/* Logo Upload Section */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Profile Information */}
            <ProfileImageSec
              ImagePlus={ImagePlus}
              previewLogo={previewLogo}
              handleLogoFileChange={handleLogoFileChange}
              handleRemoveLogo={handleRemoveLogo}
              Trash2={Trash2}
              logoFile={logoFile}
              handleLogoUpload={handleLogoUpload}
              Save={Save}
              buttonName={buttonName}
            />
              

              {/* Password Change Section */}
              <PasswordUpdateSec
                Lock={Lock}
                showPasswordSection={showPasswordSection}
                ShieldAlert={ShieldAlert}
                setShowPasswordSection={setShowPasswordSection}
                handlePasswordUpdate={handlePasswordUpdate}
                showPassword={showPassword}
                passwordForm={passwordForm}
                handlePasswordChange={handlePasswordChange}
                passwordValidation={passwordValidation}
                AlertCircle={AlertCircle}
                setShowPassword={setShowPassword}
                EyeOff={EyeOff}
                EyeIcon={EyeIcon}
                Edit={Edit}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProfilePage;
