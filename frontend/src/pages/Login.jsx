import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, UserPlus, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { assets } from '../assets/assets.js'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Sign Up')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  const handleFormSubmit = async (data) => {
    const { name, email, password } = data

    try {
      setLoading(true)

      if (state === 'Sign Up') {
        const { data: res } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

        if (res.success) {
          sessionStorage.setItem('pendingEmail', email)
          toast.success(res.message || "OTP sent to your email")
          navigate('/verify-email')
          reset()
          return
        }

        if (res.requireVerification) {
          sessionStorage.setItem("pendingEmail", email)
          toast.info(res.message || "Please verify your email")
          navigate('/verify-email')
          return
        }

        toast.error(res.message)
      } else {
        const { data: res } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (res.success) {
          localStorage.setItem('token', res.token)
          setToken(res.token)
          reset()
        } else {
          toast.error(res.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    sessionStorage.setItem("forgotFlow", "true")
    navigate("/forgot-password")
  }

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  return (
    <div className='min-h-screen relative flex items-center justify-center md:flex-row md:bg-gray-50'>

      <button
        onClick={handleBack}
        className='absolute top-4 left-4 flex items-center gap-1 text-sm bg-purple-200 rounded-2xl px-2 py-1 text-gray-600 hover:text-purple-700 cursor-pointer'
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className='hidden md:block w-1/2 h-screen'>
        <img
          src={assets.Hospital_family}
          alt="MediFlow"
          className='w-full h-full object-cover'
        />
      </div>

      <div className='w-full md:w-1/2 flex items-center justify-center px-4'>
        <motion.form
          onSubmit={handleSubmit(handleFormSubmit)}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md'
        >
          <div className='bg-white p-8 border border-purple-100 shadow flex flex-col gap-4 rounded-xl'>

            <div>
              <h1 className='text-3xl font-bold text-purple-800'>
                {state === 'Sign Up' ? "Create your account" : "Welcome back"}
              </h1>
              <p className='text-gray-800 mt-1'>
                {state === 'Sign Up'
                  ? "Start your health journey with MediFlow"
                  : "Log in to continue to MediFlow"}
              </p>
            </div>

            {state === 'Sign Up' && (
              <div>
                <label className='text-sm text-gray-600 font-medium'>Full Name</label>
                <div className='relative'>
                  <UserPlus className='absolute top-3 left-3 text-gray-300' />
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder='Enter your name'
                    className='w-full border border-gray-300 rounded-md pl-10 pr-3 py-2.5 outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500'
                    type="text"
                    disabled={loading}
                  />
                </div>
                {errors.name && <p className='text-red-500 text-xs'>{errors.name.message}</p>}
              </div>
            )}

            <div>
              <label className='text-sm text-gray-600 font-medium'>Email</label>
              <div className='relative'>
                <Mail className='absolute top-3 left-3 text-gray-300' />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" }
                  })}
                  placeholder='Enter your email'
                  className='w-full border border-gray-300 rounded-md pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
                  type="email"
                  disabled={loading}
                />
              </div>
              {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}
            </div>

            <div>
              <label className='text-sm text-gray-600 font-medium'>Password</label>
              <div className='relative'>
                <Lock className='absolute top-3 left-3 text-gray-300' />
                <input
                  {...register("password", {
                    required: "Password required",
                    minLength: { value: 8, message: "Minimum 8 characters" }
                  })}
                  placeholder='Enter your password'
                  className='w-full border border-gray-300 rounded-md pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
                  type="password"
                  disabled={loading}
                />
              </div>
              {errors.password && <p className='text-red-500 text-xs'>{errors.password.message}</p>}
            </div>

            {state === 'Login' && (
              <p className='text-sm text-gray-500'>
                Forgot password?{" "}
                <span
                  onClick={handleForgotPassword}
                  className='text-purple-600 cursor-pointer hover:underline'
                >
                  Reset here
                </span>
              </p>
            )}

            <button
              type='submit'
              disabled={loading}
              className={`bg-purple-700 text-white py-2.5 rounded-md transition active:scale-[0.98] ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-800'
              }`}
            >
              {loading
                ? (state === 'Sign Up' ? "Creating your account..." : "Logging you in…")
                : (state === 'Sign Up' ? "Create Account" : "Login")}
            </button>

            <p className='text-sm text-gray-500 text-center'>
              {state === 'Sign Up' ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
                className='text-purple-600 cursor-pointer hover:underline'
              >
                {state === 'Sign Up' ? "Sign in" : "Sign up"}
              </span>
            </p>

          </div>
        </motion.form>
      </div>
    </div>
  )
}

export default Login