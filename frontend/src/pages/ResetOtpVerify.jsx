import React, { useEffect, useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetOtpVerify = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      toast.error("Session expired. Try again.");
      navigate("/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Enter OTP");

    try {
      setLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/user/verify-otp`, { email, otp });

      if (data.success) {
        toast.success("OTP verified. You can now reset your password.");
        sessionStorage.setItem("otpVerified", "true");
        navigate("/reset-password");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen sm:bg-gradient-to-tr from-pink-200 via-purple-400 to-purple-600">
      <form onSubmit={handleVerify} className="bg-white p-8 border border-purple-500 rounded-xl shadow-2xl w-full max-w-md text-center">
        <ShieldCheck className="mx-auto text-purple-700 mb-4 animate-bounce" size={40} />
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Verification for reset password</h2>
        <p className="mb-4 text-purple-700">We sent an OTP to <b className="text-black">{email}</b></p>
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3 text-gray-300" />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter OTP"
            className="w-full border border-purple-600 rounded-md py-2 pl-10 pr-3 outline-none focus:ring-1 focus:ring-purple-500 text-center"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default ResetOtpVerify;
