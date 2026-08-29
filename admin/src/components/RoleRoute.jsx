import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

export const AdminRoute = ({ children }) => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  if (aToken) return children
  if (dToken) return <Navigate to="/doctor-dashboard" replace />
  return <Navigate to="/" replace />
}

export const DoctorRoute = ({ children }) => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  if (dToken) return children
  if (aToken) return <Navigate to="/admin-dashboard" replace />
  return <Navigate to="/" replace />
}
