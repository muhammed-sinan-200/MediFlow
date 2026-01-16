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
    <div className="flex justify-center items-center min-h-screen sm:bg-gradient-to-tr from-pink-200 via-purple-400 to-purple-600">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-purple-400 shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Forgot Password</h2>
        <p className="text-purple-700 font-base my-2">We’ll send a one-time password (OTP) to your registered email.</p>
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3 text-gray-300" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border rounded-md py-2 pl-10 pr-3 outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition"
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
