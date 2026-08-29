import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { BadgeCheck, Info } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext)

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const navigate = useNavigate()
  const [docDetails, setDocDetails] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [isBooking, setIsBooking] = useState(false)

  const fetchDetails = async () => {
    const docDetails = doctors.find(doc => doc._id === docId)
    setDocDetails(docDetails)
  }

  const availableSlots = async () => {
    setDocSlots([])

    if (!docDetails?.slots_booked) {
      return
    }

    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (i === 0) {
        const now = new Date()
        let nextSlot = new Date(now)
        nextSlot.setSeconds(0, 0)
        nextSlot.setMilliseconds(0)

        const onBoundary = now.getMinutes() % 30 === 0 && now.getSeconds() === 0 && now.getMilliseconds() === 0
        if (!onBoundary) {
          if (now.getMinutes() < 30) {
            nextSlot.setMinutes(30)
          } else {
            nextSlot.setHours(nextSlot.getHours() + 1)
            nextSlot.setMinutes(0)
          }
        }

        const clinicOpen = new Date(today)
        clinicOpen.setHours(10, 0, 0, 0)
        currentDate = nextSlot < clinicOpen ? clinicOpen : nextSlot
      } else {
        currentDate.setHours(10, 0, 0, 0)
      }

      let timeSlots = []


      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = docDetails.slots_booked[slotDate] && docDetails.slots_booked[slotDate].includes(slotTime) ? false : true
        
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

 
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      if (timeSlots.length > 0) {
        setDocSlots(prev => ([...prev, timeSlots]))
      }
    }
  }


  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    const selectedDaySlots = docSlots[slotIndex]
    const selectedSlotDate = selectedDaySlots?.[0]?.datetime

    if (!selectedSlotDate || !slotTime) {
      toast.warn('Please select a date and time slot')
      return
    }

    try {
      setIsBooking(true)
      const date = selectedSlotDate

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)

    } finally {
      setIsBooking(false)
    }
  }



  useEffect(() => {
    fetchDetails()
  }, [doctors, docId])

  useEffect(() => {
    availableSlots()
  }, [docDetails])

  useEffect(() => {
    console.log(docSlots);

  }, [docSlots])

  if (doctors.length === 0) {
    return (
      <div className='flex items-center justify-center min-h-[40vh] text-purple-700 font-medium'>
        Loading doctor details...
      </div>
    )
  }

  if (!docDetails) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[40vh] gap-2 text-center px-4'>
        <p className='text-xl font-semibold text-purple-900'>Doctor not found</p>
        <p className='text-sm text-gray-600'>This doctor does not exist or is no longer available.</p>
        <button
          onClick={() => navigate('/doctors')}
          className='mt-3 px-5 py-2 rounded-full bg-purple-700 text-white text-sm hover:bg-purple-800 cursor-pointer'
        >
          Browse doctors
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className='flex flex-col sm:flex-row border border-purple-500 p-4 rounded-2xl gap-3'>
        <div>
          <img className='border border-purple-300 rounded-lg bg-purple-100 sm:max-w-72' src={docDetails.image} alt="" />
        </div>

        <div className='flex-1 border border-purple-300 p-8 py-7 rounded-2xl'>
          <p className='flex text-2xl font-semibold text-gray-950 gap-2'>{docDetails.name}
            <BadgeCheck className='text-green-600 mt-1' />
          </p>

          <div className='flex items-center gap-2 mt-1.5'>
            <p className='text-gray-800 text-xl'>{docDetails.degree} - {docDetails.speciality}</p>
            <p className='border-none border-purple-600 rounded-3xl text-xs px-2 py-0.5 bg-purple-100 text-purple-500 
            font-semibold'>{docDetails.experience}</p>
          </div>

          <div className='mt-2.5'>
            <p className='flex items-center gap-2 text-md font-medium text-gray-900'>
              About <Info className='text-gray-700 mt-1' size={18} />
            </p>
            <p className='text-sm font-semibold text-gray-600 mt-2'>{docDetails.about}</p>
          </div>
          <p className='text-md text-gray-600 font-semibold mt-3'>Appointment fee: &#8377; <span>{docDetails.fees}</span></p>
        </div>
      </div>

      <div className=' sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-4 mt-4 overflow-x-scroll scrollbar-hide'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => {
                setSlotIndex(index)
                setSlotTime('')
              }} key={index}
                className={`flex gap-2 border rounded-2xl p-2 cursor-pointer hover:border-purple-900 ${slotIndex === index ? 'bg-purple-600 text-white border-2 border-purple-900' : 'border-purple-200'}`}>
                <p>{item[0] && (() => {
                  const slotDay = item[0].datetime
                  const todayDate = new Date()
                  const tomorrowDate = new Date()
                  tomorrowDate.setDate(todayDate.getDate() + 1)

                  const isSameDay = (a, b) =>
                    a.getFullYear() === b.getFullYear() &&
                    a.getMonth() === b.getMonth() &&
                    a.getDate() === b.getDate()

                  if (isSameDay(slotDay, todayDate)) return 'Today'
                  if (isSameDay(slotDay, tomorrowDate)) return 'Tomorrow'
                  return daysOfWeek[slotDay.getDay()]
                })()}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll scrollbar-hide mt-4'>
          {docSlots.length && docSlots[slotIndex]?.map((item, index) => (
            <p onClick={() => setSlotTime(item.time)}
              className={`text-sm font-base shrink-0 px-5
               py-2 border rounded-full cursor-pointer hover:border-purple-900
               ${item.time === slotTime ? 'bg-purple-600 text-white border-2 border-purple-900' : 'border-purple-200'}`} key={index}>
              {item.time}
            </p>
          ))}
        </div>
        <button
          onClick={bookAppointment}
          disabled={isBooking || !docSlots[slotIndex]?.length || !slotTime}
          className='border border-green-500 px-10 py-3 hover:bg-purple-50 hover:border-green-700 text-sm my-6 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Book Appointment
        </button>
      </div>
    </div>
  )
}

export default Appointment
