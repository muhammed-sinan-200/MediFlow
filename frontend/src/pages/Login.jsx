import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Sign Up')

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }

  } = useForm()

  const handleFormSubmit = async (e) => {

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          sessionStorage.setItem('pendingEmail', email)
          toast.success(data.message || "OTP sent to your email")
          navigate('/verify-email')
          return

        }
        if (data.requireVerification) {
          sessionStorage.setItem("pendingEmail", email)

          toast.info(data.message || "Please verify your email")
          navigate('/verify-email')
          return;
        }
        toast.error(data.message)


      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleForgotPassword = () => {
    sessionStorage.setItem("forgotFlow", "true");
    navigate("/forgot-password")
  }


  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])


  return (
    <motion.div initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='sm:bg-gradient-to-tr from-pink-200 via-purple-400 to-purple-600  min-h-screen rounded  flex items-center justify-center'>
      <motion.form initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        onSubmit={handleSubmit(handleFormSubmit)} className='w-full flex justify-center'>
        <motion.div key={state}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='flex flex-col items-start gap-3 m-auto p-8 w-full max-w-md border rounded-xl text-sm text-purple-500 shadow-2xl bg-white'>
          <p className='text-3xl text-purple-700 font-semibold'>{state === 'Sign Up' ? "Let's get you started" : "Welcome back"}</p>
          <p className=''>Please {state === 'Sign Up' ? "sign up" : "log in"} to book an appointment</p>
          {
            state === 'Sign Up' && (
              <>
                It only takes a few seconds.
              </>
            )
          }
          {state === 'Sign Up' &&
            <div className='w-full'>
              <p className='text-purple-600 font-semibold'>Full name</p>
              <div className='relative'>
                <UserPlus className='absolute top-2.5 left-2 text-gray-300 ' />
              </div>
              <input {...register("name", {
                required: "Name is required"
              })}
                placeholder='Your Name' className='text-black text-base border rounded border-purple-400 w-full pl-10 pr-3 py-2 mt-1 focus:ring-1 focus:ring-purple-400 focus:shadow-md outline-none' type="text" onChange={(e) => setName(e.target.value)} value={name} />
              {errors.name &&
                <p className='text-red-500 text-xs'>{errors.name.message}</p>
              }
            </div>


          }
          <div className='w-full'>
            <p className='text-purple-600 font-semibold'>Email</p>
            <div className='relative'>
              <Mail className='absolute top-2.5 left-2 text-gray-300 ' />
            </div>
            <input {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email"
              }
            })}
              placeholder='Your Email' className='text-black text-base border rounded border-purple-300 w-full pl-10 pr-3 py-2 mt-1 focus:ring-1 focus:ring-purple-400 outline-none' type="email" onChange={(e) => setEmail(e.target.value)} value={email} />

            {errors.email &&
              <p className='text-red-500 text-xs'>{errors.email.message}</p>
            }
          </div>
          <div className='w-full'>
            <p className='text-purple-600 font-semibold'>Password</p>
            <div className='relative'>
              <Lock className='absolute top-2.5 left-2 text-gray-300 ' />
            </div>
            <input {...register("password", {
              required: "Password required",
              minLength: { value: 6, message: "Minimum 6 characters" }
            })}
              placeholder='Your Password' className='text-black text-base border rounded border-purple-300 w-full pl-10 pr-3 py-2 mt-1 focus:ring-1 focus:ring-purple-400 outline-none' type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            {errors.password &&
              <p className='text-red-500 text-xs'>{errors.password.message}</p>
            }
          </div>
          {
            state === 'Sign Up' ?
              <p></p> : <p className='text-purple-500'>Forgot password? <span onClick={handleForgotPassword} className='underline cursor-pointer text-purple-700'>click here</span></p>

          }
          <button type='submit' className='mt-2 border bg-purple-700 text-white w-full py-2 rounded-md text-base cursor-pointer hover:bg-purple-800 active:scale-[0.98]'>
            {state === 'Sign Up' ? "Create Account" : "Login"}
          </button>
          {state === 'Sign Up' ?
            <p>Already have an account? <span onClick={() => setState('Login')} className='text-purple-700 underline cursor-pointer'>Sign in</span></p> : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-purple-700 underline cursor-pointer'>Sign up</span></p>
          }
        </motion.div>
      </motion.form>
    </motion.div>
  )
}

export default Login