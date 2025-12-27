import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
//admin adding doctors
const addDoctor = async (req, res, next) => {
     
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        // console.log({ name, email, password, speciality, degree, experience, about, fees, address },imageFile);


        if (!name, !email, !password, !speciality, !degree, !experience, !about, !fees, !address) {
            return res.status(400).json({success:false, message: "Fields missing" })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({success:false, message: "Invalid email format" })
        }
        if (password.length < 8) {
            return res.status(400).json({success:false, message: "Enter a strong password" })
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

        return res.status(200).json({
            success: true,
            message: "Doctor added to list",
            data: newDoctor
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
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
            res.status(200).json({success:true,token})   
        }else{
            res.status(400).json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export { addDoctor, adminLogin }