import  Router  from "express";
import {addDoctor,adminLogin}  from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";


const adminRouter = Router()

adminRouter.post('/add-doctor',adminAuth,upload.single('image'),addDoctor);
adminRouter.post('/login',adminLogin); 

export default adminRouter;