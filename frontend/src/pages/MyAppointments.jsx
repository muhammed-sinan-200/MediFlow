import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Check, X } from 'lucide-react'
import { motion, spring } from 'framer-motion'


const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const navigate = useNavigate()
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const canceAppointment = async (appointmentId) => {
    try {

      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment payment",
      description: "Appointment payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)

        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])
  return (
    <motion.div initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className=' bg-white/60 backdrop-blur-md 
                rounded-2xl p-8 shadow-md 
                flex flex-col  gap-6 text-sm'>
      <p className='sm:md text-xl border-b bg-gradient-to-r 
              from-purple-600 to-purple-900 
              bg-clip-text text-transparent font-medium pb-3 mt-12'>
        My Appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-b-gray-200' key={index}>
            <div>
              <img className='w-32 bg-purple-200' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1'>
              <p className='font-semibold text-gray-800'>{item.docData.name}</p>
              <p className='text-gray-500 font-medium text-sm'>{item.docData.speciality}</p>
              <p className='text-gray-600 font-semibold text-sm mt-2'>Address:</p>
              <p className='text-xs text-gray-600'>{item.docData.address.line1}</p>
              <p className='text-xs text-gray-600'>{item.docData.address.line2}</p>
              <p className='font-light'><span className='font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && !item.isComplete && <button className='sm:min-w-44 py-2 px-6 rounded text-center text-sm  bg-stone-100 text-purple-500 cursor-not-allowed'>Paid</button>}
              {!item.cancelled && !item.payment && !item.isComplete && <button onClick={() => appointmentRazorpay(item._id)} className='bg-purple-700 text-center text-white border px-4 py-1 cursor-pointer sm:min-w-48 rounded hover:bg-purple-900  transition-all duration-200'>Pay Online</button>}
              {!item.cancelled && !item.isComplete && !item.payment && <button onClick={() => canceAppointment(item._id)} className='text-center text-purple-500 border px-4 py-1 cursor-pointer sm:min-w-48 rounded hover:bg-red-700 hover:text-white  transition-all duration-200'>Cancel Appointment</button>}
              {item.cancelled && !item.isComplete && <button className='sm:m-w-48 py-2 px-2 border border-red-500 rounded text-red-500 flex items-center justify-center gap-2'>Appointment cancelled <X size={18} /></button>}

              {
                item.isComplete && <button className='sm:min-w-48 py-2 border border-green-300 rounded 
                    text-green-600 flex items-center justify-center gap-2'>Completed <Check size={18} /></button>
              }
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default MyAppointments