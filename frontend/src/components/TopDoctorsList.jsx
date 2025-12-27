import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctorsList = () => {

    const {doctors} = useContext(AppContext)
    const navigate = useNavigate()
    return (
        <div className='flex flex-col items-center gap-4 py-10 mt-20'>
            <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-800 to-indigo-600 sm:text-4xl'>
                Our Top Doctors
            </h1>
            <h1 className='text-2xl font-semibold text-transparent bg-clip-text bg-linear-to-r
            from-purple-800 to-indigo-600 sm:text-4xl'>
                Expert Care. Trusted Doctors. Exceptional Outcomes.
            </h1>
            <p className='text-gray-600 font-base text-md'>
                Choose your doctor and book consultations with experienced specialists dedicated to your well-being.
            </p>
            <div className='w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6'>
                {
                    doctors.slice(0, 8).map((item, index) => (
                        <div onClick={()=>navigate(`/appointments/${item._id}`)} key={index}
                            className='border border-purple-300 rounded-2xl overflow-hidden
                                     hover:border-purple-400 cursor-pointer hover:-translate-y-2 
                                     transition-all duration-300 group'
                        >
                            <img src={item.image} alt="" className='group-hover:bg-purple-100' />
                            <div className='p-4'>
                                <div className='flex items-center text-center gap-2 text-green-300 text-sm'>
                                    <p className='rounded-full bg-green-300 w-2 h-2'></p><p>Available</p>
                                </div>
                                <p className='text-purple-950 text-lg font-medium'>{item.name}</p>
                                <p className='text-purple-500 text-sm font-semibold'>{item.speciality}</p>
                            </div>
                        </div>

                    ))
                }
            </div>
            <button onClick={()=>{navigate('/doctors') ;scrollTo(0,0)}}
                    className='
                    relative overflow-hidden
                    border p-2 mt-8 
                  border-purple-500 rounded-full cursor-pointer text-purple-600  
                    before:absolute before:inset-0 before:bg-purple-950 transition-colors
                    before:scale-x-0 before:origin-left before:transition-transform 
                    hover:before:scale-x-100 before:duration-300 hover:text-purple-100'
            ><span className='relative z-20'>View all doctors</span></button>
        </div>
    )
}

export default TopDoctorsList