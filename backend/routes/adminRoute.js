import Router from "express";
import { addDoctor, adminDashboard, adminLogin, allDoctors, appointmentCancel, appointmentsAdmin } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";
import { changeAvailability } from "../controllers/doctorController.js";


const adminRouter = Router()    

adminRouter.post('/add-doctor', adminAuth, upload.single('image'), addDoctor);
adminRouter.post('/login', adminLogin);
adminRouter.post('/all-doctors', adminAuth, allDoctors);
adminRouter.post('/change-availability', adminAuth, changeAvailability);
adminRouter.get('/appointments', adminAuth, appointmentsAdmin);
adminRouter.post('/cancel-appointment', adminAuth, appointmentCancel);
adminRouter.get('/dashboard', adminAuth, adminDashboard);

export default adminRouter;