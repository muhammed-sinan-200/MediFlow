import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'


const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          sessionStorage.setItem('aToken', data.token)
          setAToken(data.token);
        } else {
          toast.error(data.message, {
            theme: "dark"
          })
        }

      } else {
        const {data} = await axios.post(backendUrl + '/api/doctor/login',{email,password})
        if (data.success) {
          sessionStorage.setItem('dToken', data.token)
          setDToken(data.token);
          console.log(data.token);
          
        } else {
          toast.error(data.message, {
            theme: "dark"
          })
        }
      }
    } catch (error) {

    }
  }

  return (
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center'>

      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96
       border rounded-2xl text-purple-700 text-sm shadow-xl'>

        <p className='text-2xl font-semibold m-auto'><span>{state}</span> Login</p>

        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded border-purple-300 w-full p-2 mt-1 focus:ring-1
           focus:ring-purple-400 outline-none' type="email" required />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded border-purple-300 w-full p-2 mt-1 focus:ring-1 
          focus:ring-purple-400 outline-none' type="password" required />
        </div>

        <button className='border bg-purple-400 text-white w-full py-2 rounded-md text-base cursor-pointer
         hover:bg-purple-500 transition-all'>Login </button>
        {
          state === 'Admin' ?
            <p>Doctor Login ?<span onClick={() => setState('Doctor')} className='ml-1 underline cursor-pointer'>Click here</span></p> :
            <p>Admin Login ?<span onClick={() => setState('Admin')} className='ml-1  underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login