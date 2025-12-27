import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate()

  const [searchDoc, setSearchDoc] = useState("")
  const [filterDoctor, setFilterDoctor] = useState([])
  const [selectedSpeciality, setSelectedSpeciality] = useState("")

  const { doctors } = useContext(AppContext)


  // const applyFilter = () => {
  //   if (selectedSpeciality === "") {
  //     setFilterDoctor(doctors)
  //   } else {
  //     setFilterDoctor(doctors.filter(doc => doc.speciality === selectedSpeciality))
  //   }
  // }
  const applyFilter = () => {
    setFilterDoctor(
      doctors.filter(doc =>
        (selectedSpeciality === "" || doc.speciality === selectedSpeciality) &&
        (searchDoc.trim() === "" ||
          doc.name.toLowerCase().includes(searchDoc.toLowerCase()) ||
          doc.speciality.toLowerCase().includes(searchDoc.toLowerCase())
        )
      )
    );
  }
  //here 


  useEffect(() => {
    applyFilter()
  }, [doctors, selectedSpeciality, speciality, searchDoc])


  useEffect(() => {
    if (speciality) {
      setSelectedSpeciality(speciality)
    } else {
      setSelectedSpeciality("")
    }
  }, [speciality])


  return (
    <div className='pb-20'>
      {/* seacrh bar */}
      <div className='flex flex-col md:flex-row gap-4 bg-stone-50 py-6 px-2 rounded-2xl'>
        <input
          type='text'
          placeholder='Search by doctor or speciality'
          className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none 
          focus:ring-2 focus:ring-purple-400'
          onChange={(e) => setSearchDoc(e.target.value)}
          value={searchDoc}
        />
        <select
          value={selectedSpeciality}
          onChange={(e) => {
            const value = e.target.value
            setSelectedSpeciality(value)
            if (value === "") {
              navigate('/doctors')
            } else {
              navigate(`/doctors/${value}`)
            }
          }}
          className='w-full border border-gray-300 rounded-lg px-4 py-2 outline-none 
          focus:ring-2 focus:ring-purple-400 cursor-pointer'>

          <option className='bg-purple-200 text-purple-900' value="">All Specialities</option>
          <option className='bg-purple-200 text-purple-900' value="General Physician">General Physician</option>
          <option className='bg-purple-200 text-purple-900' value="Gynecologist">Gynecologist</option>
          <option className='bg-purple-200 text-purple-900' value="Pediatrician">Pediatricians</option>
          <option className='bg-purple-200 text-purple-900' value="Dermatologist">Dermatologist</option>
          <option className='bg-purple-200 text-purple-900' value="Neurologist">Neurologist</option>
          <option className='bg-purple-200 text-purple-900' value="Gastroenterologist">Gastroenterologist</option>

        </select>
      </div>

      {/* doct lsit */}
      <div className='w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6'>
        {filterDoctor.length > 0 ? (

          filterDoctor.map((item, index) => (
            <div onClick={() => navigate(`/appointments/${item._id}`)} key={index}
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
        ) : (
          <p className='text-center text-purple-700 col-span-full py-10'>No doctors found for {searchDoc}</p>
        )
        }
      </div>



    </div>
  )
}

export default Doctors