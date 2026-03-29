import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'
import { ShieldCheck, Stethoscope, Mail, LockKeyhole } from 'lucide-react'
import { useForm } from 'react-hook-form'

const Login = () => {
  const [state, setState] = useState('Admin')

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  })

  useEffect(() => {
    reset({
      email: '',
      password: '',
    })
  }, [state, reset])

  const onSubmit = async (formData) => {
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', {
          email: formData.email,
          password: formData.password,
        })

        if (data.success) {
          sessionStorage.setItem('aToken', data.token)
          setAToken(data.token)
        } else {
          toast.error(data.message, {
            theme: 'dark',
          })
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', {
          email: formData.email,
          password: formData.password,
        })

        if (data.success) {
          sessionStorage.setItem('dToken', data.token)
          setDToken(data.token)
          console.log(data.token)
        } else {
          toast.error(data.message, {
            theme: 'dark',
          })
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.', {
        theme: 'dark',
      })
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-100 px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center'>
        <div className='grid w-full overflow-hidden rounded border border-purple-100 bg-white shadow-[0_20px_60px_rgba(88,28,135,0.12)] lg:grid-cols-2'>


          <div className='hidden lg:flex items-center justify-center bg-gradient-to-br from-purple-100 via-violet-200 to-fuchsia-100 p-8 xl:p-10 text-purple-900'>
            <div className='text-center max-w-md'>
              <div className='inline-flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 text-sm font-medium backdrop-blur-sm justify-center'>
                {state === 'Admin' ? (
                  <>
                    <ShieldCheck size={16} />
                    Admin Access
                  </>
                ) : (
                  <>
                    <Stethoscope size={16} />
                    Doctor Access
                  </>
                )}
              </div>

              <h1 className='mt-6 text-3xl xl:text-4xl font-bold leading-tight'>
                Welcome back to MediFlow
              </h1>

              <p className='mt-4 text-sm xl:text-base text-purple-800 leading-7'>
                Securely sign in to manage appointments, access dashboards, and
                keep your healthcare workflow smooth and organized.
              </p>
            </div>
          </div>



          <div className='flex items-center justify-center p-5 sm:p-8 lg:p-10'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md'>
              <div className='mb-6 lg:hidden text-center'>
                <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-700'>
                  {state === 'Admin' ? (
                    <ShieldCheck size={28} />
                  ) : (
                    <Stethoscope size={28} />
                  )}
                </div>

                <h1 className='mt-4 text-2xl font-bold text-slate-900'>
                  Welcome to MediFlow
                </h1>
                <p className='mt-2 text-sm text-slate-500'>
                  Sign in to continue to your dashboard
                </p>
              </div>

              <div className='rounded border border-slate-200 bg-white p-5 sm:p-7 shadow-sm'>
                <div className='flex items-center justify-center gap-2 mb-6'>
                  <button
                    type='button'
                    onClick={() => setState('Admin')}
                    className={`flex-1 rounded px-4 py-2.5 text-sm font-medium transition ${
                      state === 'Admin'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Admin
                  </button>

                  <button
                    type='button'
                    onClick={() => setState('Doctor')}
                    className={`flex-1 rounded px-4 py-2.5 text-sm font-medium transition ${
                      state === 'Doctor'
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Doctor
                  </button>
                </div>

                <div className='mb-6 text-center'>
                  <p className='text-2xl font-semibold text-slate-900'>
                    {state} Login
                  </p>
                  <p className='mt-1 text-sm text-slate-500'>
                    Enter your credentials to access your panel
                  </p>
                </div>

                <div className='space-y-4'>
                  <div className='w-full'>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      Email
                    </label>
                    <div className='relative'>
                      <Mail
                        size={18}
                        className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
                      />
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Enter a valid email address',
                          },
                        })}
                        className={`w-full rounded border bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:ring-2 ${
                          errors.email
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                            : 'border-purple-200 focus:border-purple-400 focus:ring-purple-100'
                        }`}
                        type='email'
                        placeholder='Enter your email'
                      />
                    </div>
                    {errors.email && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className='w-full'>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      Password
                    </label>
                    <div className='relative'>
                      <LockKeyhole
                        size={18}
                        className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
                      />
                      <input
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                          },
                        })}
                        className={`w-full rounded border bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:ring-2 ${
                          errors.password
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                            : 'border-purple-200 focus:border-purple-400 focus:ring-purple-100'
                        }`}
                        type='password'
                        placeholder='Enter your password'
                      />
                    </div>
                    {errors.password && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='mt-6 w-full rounded bg-purple-600 py-3 text-base font-medium text-white cursor-pointer transition hover:bg-purple-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70'
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>

                <p className='mt-5 text-center text-sm text-slate-600'>
                  {state === 'Admin' ? 'Doctor Login ?' : 'Admin Login ?'}
                  <span
                    onClick={() =>
                      setState(state === 'Admin' ? 'Doctor' : 'Admin')
                    }
                    className='ml-1 font-medium text-purple-700 underline cursor-pointer hover:text-purple-800'
                  >
                    Click here
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login