import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'
//admin adding doctors
const addDoctor = async (req, res, next) => {
     
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        // console.log({ name, email, password, speciality, degree, experience, about, fees, address },imageFile);


        if (!name, !email, !password, !speciality, !degree, !experience, !about, !fees, !address) {
            return res.json({success:false, message: "Fields missing" })
        }

        if (!validator.isEmail(email)) {
            return res.json({success:false, message: "Invalid email format" })
        }
        if (password.length < 8) {
            return res.json({success:false, message: "Enter a strong password" })
        }

        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashed = bcrypt.hashSync(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        //Doctors data stores in
        const doctorData = {
            name,
            email,
            password: hashed,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save()

        return res.json({
            success: true,
            message: "Doctor added to list",
            data: newDoctor
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }

}
//login of admin
const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET_KEY)
            res.json({success:true,token})   
        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//Get all doctors 

const allDoctors = async (req,res,next)=>{
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
//apppointment lsit
const appointmentsAdmin = async (req,res)=>{
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//apointmnet cancel

const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

      

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //returning doc slotes after cancelling

        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: "Appointment cancelled" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
} 


//dashboard for admin
const adminDashboard = async (req,res)=>{
    try {
        const doctors =await doctorModel.find({})
        const users =await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData ={
            doctors:doctors.length,
            patients:users.length,
            appointments:appointments.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}
export { addDoctor, adminLogin, allDoctors, appointmentsAdmin ,appointmentCancel ,adminDashboard}