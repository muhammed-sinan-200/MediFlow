import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { BadgeCheck, Info } from 'lucide-react'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors } = useContext(AppContext)

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const [docDetails, setDocDetails] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDetails = async () => {
    const docDetails = doctors.find(doc => doc._id === docId)
    setDocDetails(docDetails)
  }

  const availableSlots = async () => {
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []


      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
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

  return docDetails && (
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
              <div onClick={() => setSlotIndex(index)} key={index}
                className={`flex gap-2 border rounded-2xl p-2 cursor-pointer hover:border-purple-900 ${slotIndex === index ? 'bg-purple-600 text-white border-2 border-purple-900' : 'border-purple-200'}`}>
                <p>{item[0] && (index === 0 ? 'Today' : index === 1 ? 'Tommorrow' : daysOfWeek[item[0].datetime.getDay()])}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll scrollbar-hide mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)}
              className={`text-sm font-base shrink-0 px-5
               py-2 border rounded-full cursor-pointer hover:border-purple-900
               ${item.time === slotTime ? 'bg-purple-600 text-white border-2 border-purple-900' : 'border-purple-200'}`} key={index}>
              {item.time}
            </p>
          ))}
        </div>
        <button className='border border-green-500 px-10 py-3 hover:bg-purple-50 hover:border-green-700 text-sm my-6 rounded-full cursor-pointer '>
          Book Appointment
        </button>
      </div>
    </div>
  )
}

export default Appointment