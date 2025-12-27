import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityList = () => {

    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-10 mt-20'>
            <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-800 to-indigo-600 sm:text-4xl'>
                Our Top Specialities
            </h1>
            <p className='text-gray-600 font-base text-md'>
                Choose your specialty and connect with experienced specialists for personalized healthcare tailored to your needs.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-5 w-full max-w-6xl auto-rows-fr'>


                {specialityData.map((item, index) =>{  
                    
                    const Icon = item.icon
                    return (    
                    <Link
                        onClick={() => scrollTo(0, 0)}
                        key={index}
                        to={`/doctors/${item.speciality}`}
                        className='
                                group 
                                relative 
                                shadow-md
                                flex 
                                flex-col 
                                items-center 
                                cursor-pointer 
                                px-5 pt-5 pb-6 
                                rounded-xl
                                hover:-translate-y-4.5 
                                bg-white
                                hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50
                                transition-all duration-500'
                                >

                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-indigo-500 to-purple-600 rounded-tl-full rounded-tr-full group-hover:opacity-0 opacity-100 transition-all duration-500">
                    </div>
                    <div className='bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-2xl'>
                        <Icon className='group-hover:text-purple-800 w-8 h-8' />
                    </div>
                    <p className='group-hover:text-purple-700 text-2xl font-medium '>
                    {item.speciality}
                    </p>
                    <p className='text-md leading-relaxed text-center mt-3 text-stone-500'>{item.description}
                    </p>
                    </Link>
                )
            })}
            </div>
        </div>
    )
}

export default SpecialityList