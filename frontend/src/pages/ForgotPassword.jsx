import React, { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    try {
      setLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });

      if (data.success) {
        toast.success(data.message);
        sessionStorage.removeItem("forgotFlow");
        sessionStorage.setItem("resetEmail", email);
        navigate("/verify-reset-otp");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const allowed = sessionStorage.getItem("forgotFlow")
    if (!allowed) {
      toast.error("Invalid access");
      navigate('/login')
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-10 w-full max-w-md border border-purple-100"
      >
        <h2 className="text-3xl font-semibold text-purple-700 mb-2">
          Forgot Password
        </h2>

        <p className="text-gray-500 mb-6">
          Enter your email and we’ll send you an OTP to reset your password.
        </p>

        <div className="relative mb-5">
          <Mail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

      </form>

    </div>
  );
};

export default ForgotPassword;
