"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Loader2, 
  ServerCrash, 
  Edit,
  Pencil, 
  Key, 
  CheckCircle2, 
  XCircle, 
  EyeIcon, 
  EyeOffIcon,
  Home,
  LockIcon,
  UnlockIcon
} from "lucide-react";
import { getAdminDetails, changeAdminPassword, changAdminBlock } from "@/api/hosterApi";
import toast from "react-hot-toast";
import HosterMenu from "@/components/hosterComponents/HosterMenu";

const AdminDetailPage = ({params}) => {
  const router = useRouter();
  const { adminId } = React.use(params);
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Password Change State
  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Block/Unblock State
  const [isBlockingAdmin, setIsBlockingAdmin] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      if (!adminId) return;
      try {
        setIsLoading(true);
        const response = await getAdminDetails(adminId);
        setAdmin(response?.data?.admin || {});
        setError(null);
      } catch (err) {
        console.error("Failed to fetch admin details:", err);
        setError(err.message || "Failed to load admin details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmin();
  }, [adminId]);

  const passwordRule =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/;

  const handlePasswordChange = async () => {
    // Reset previous states
    setPasswordError('');
    setPasswordChangeSuccess(false);

    // Validation
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (!passwordRule.test(newPassword)) {
      setPasswordError("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
      return;
    }

    try {
      setIsChangingPassword(true);
      const res = await changeAdminPassword(adminId, newPassword);
      if(res.status==200){
        toast.success(res?.data?.message||'Password Changed')
      }
      
      setPasswordChangeSuccess(true);
      setIsPasswordChangeMode(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.message || "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleBlockUnblockAdmin = async () => {
    try {
      setIsBlockingAdmin(true);
      const res = await changAdminBlock(adminId, admin.isBlocked);
      
      if(res.status === 200) {
        // Update local state to reflect the block/unblock status
        setAdmin(prev => ({
          ...prev, 
          isBlocked: !prev.isBlocked
        }));
        
        // Show success toast
        toast.success(
          admin.isBlocked 
            ? 'Admin account has been unblocked' 
            : 'Admin account has been blocked'
        );
      }
    } catch (err) {
      toast.error(err.message || "Failed to change admin account status");
    } finally {
      setIsBlockingAdmin(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-2xl">
          <Loader2 className="mx-auto animate-spin text-blue-500" size={64} />
          <p className="mt-4 text-lg text-gray-600">Loading admin details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-2xl">
          <ServerCrash className="mx-auto text-red-500" size={64} />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Unable to Load Admin Details
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition flex items-center mx-auto gap-2"
          >
            <RefreshCw className="mr-2" /> Try Again
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
        <HosterMenu/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Profile</h1>
            <p className="text-blue-100">Detailed information and management</p>
          </div>
          <button 
            onClick={() => setIsPasswordChangeMode(!isPasswordChangeMode)}
            className="bg-white/20 hover:bg-white/30 transition p-3 rounded-full"
          >
            <Pencil className="text-white" size={24} />
          </button>
        </div>

        {/* Password Change Section */}
        {isPasswordChangeMode && (
          <div className="p-6 bg-blue-50 border-b border-blue-200">
            <div className="max-w-md mx-auto">
              <div className="relative mb-4">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
              <div className="relative mb-4">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {passwordError && (
                <div className="text-red-500 flex items-center gap-2 mb-4">
                  <XCircle className="text-red-500" />
                  {passwordError}
                </div>
              )}
              <button
                onClick={handlePasswordChange}
                disabled={isChangingPassword}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                {isChangingPassword ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" /> Changing Password...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Admin Details */}
        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Edit className="mr-2 text-blue-600" /> Personal Details
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600"><strong>Name:</strong> {admin?.name}</p>
                <p className="text-gray-600"><strong>Email:</strong> {admin?.email}</p>
                <p className="text-gray-600"><strong>Phone:</strong> {admin?.phone}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Home className="mr-2 text-blue-600" /> Address
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">{admin?.address?.address1}</p>
                <p className="text-gray-600">{admin?.address?.address2}</p>
                <p className="text-gray-600">{admin?.address?.pincode}</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CheckCircle2 
              className={`text-${admin?.isBlocked ? 'red' : 'green'}-500`} 
            />
            <span className="font-medium text-gray-700">
              Account Status: {admin?.isBlocked ? "Blocked" : "Active"}
            </span>
          </div>
          <button
            onClick={handleBlockUnblockAdmin}
            disabled={isBlockingAdmin}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition 
              ${admin?.isBlocked 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
              }
            `}
          >
            {isBlockingAdmin ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                {admin?.isBlocked ? 'Unblocking...' : 'Blocking...'}
              </>
            ) : (
              <>
                {admin?.isBlocked ? <UnlockIcon size={20} /> : <LockIcon size={20} />}
                {admin?.isBlocked ? 'Unblock Account' : 'Block Account'}
              </>
            )}
          </button>
        </div>
          

          <div className="flex justify-between space-x-4">
            <button
              onClick={() => router.back()}
              className="flex-1 bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition"
            >
              Back to Admins List
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDetailPage;