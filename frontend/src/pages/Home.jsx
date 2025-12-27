import React from 'react'
import Header from '../components/Header'
import SpecialityList from '../components/SpecialityList'
import TopDoctorsList from '../components/TopDoctorsList'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityList/>
      <TopDoctorsList/>
    </div>
  )
}

export default Home