import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    const otpVerified = sessionStorage.getItem("otpVerified");
    if (!storedEmail || otpVerified !== "true") {
      toast.error("Please verify OTP.");
      navigate("/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return toast.error("All fields are required");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");

    try {
      setLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, { email, newPassword });

      if (data.success) {
        toast.success(data.message);
        sessionStorage.removeItem("resetEmail");
        sessionStorage.removeItem("otpVerified");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen sm:bg-gradient-to-tr from-pink-200 via-purple-400 to-purple-600">
      <form onSubmit={handleSubmit} className="bg-white p-8 border border-purple-500 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-purple-700 mb-1">Set Your New Password</h2>
        <p className="text-sm text-purple-500 mb-6">
          Choose a strong password you haven’t used before.
        </p>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-4 border border-purple-600 rounded-md py-2 px-3 outline-none focus:ring-1 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 border border-purple-600 rounded-md py-2 px-3 outline-none focus:ring-1 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
