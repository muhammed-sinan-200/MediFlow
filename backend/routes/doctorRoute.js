import Router from "express";
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorList, doctorProfile, loginDoctor, updateDoctorProfile } from "../controllers/doctorController.js";
import doctorAuth from "../middlewares/doctorAuth.js";

const doctorRouter = Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', doctorAuth, appointmentsDoctor)
doctorRouter.post('/complete-appointment', doctorAuth, appointmentComplete)
doctorRouter.post('/cancel-appointment', doctorAuth, appointmentCancel)
doctorRouter.get('/dashboard', doctorAuth, doctorDashboard)
doctorRouter.get('/profile', doctorAuth, doctorProfile)
doctorRouter.post('/update-profile', doctorAuth, updateDoctorProfile)

export default doctorRouter 