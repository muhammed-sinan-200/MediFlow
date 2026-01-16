import React, { useEffect, useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  //  get email from sessionStorage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("pendingEmail");
    if (!storedEmail) {
      toast.error("Verification session expired");
      navigate("/login");
    } else {
      setEmail(storedEmail);
    }
  }, []);

  //  verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length < 5) {
      return toast.error("Enter a valid OTP");
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/user/verify-email-otp",
        { email, otp }
      );

      if (data.success) {
        toast.success("Please login to continue");
        sessionStorage.removeItem("pendingEmail");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  //  rsend OTP
  const resendOtp = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/resend-email-otp",
        { email }
      );
      console.log("Resend response:", data);

      if (data.success) {
        toast.info("OTP resent to your email");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to resend OTP");

    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sm:bg-gradient-to-tr from-pink-200 via-purple-400 to-purple-600 min-h-screen flex items-center justify-center"
    >
      <motion.form
        onSubmit={handleVerify}
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md text-center"
      >
        <div className="flex justify-center mb-4">
          <ShieldCheck size={40} className="text-purple-700 animate-pulse" />
        </div>

        <h2 className="text-2xl font-semibold text-purple-700 mb-2">
          Verify your email
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          We sent an OTP to <br />
          <span className="font-semibold text-purple-600">{email}</span>
        </p>

        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3 text-gray-300" />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter OTP"
            className="w-full border rounded-md py-2 pl-10 pr-3 text-center text-lg tracking-widest focus:ring-1 focus:ring-purple-500 outline-none"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        <p className="text-sm mt-4">
          Didn't receive OTP?{" "}
          <span
            onClick={() => email && resendOtp()}
            className="text-purple-700 underline cursor-pointer"
          >
            Resend
          </span>
        </p>
      </motion.form>
    </motion.div>
  );
};

export default EmailVerify;
