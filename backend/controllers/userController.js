import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay';
import generateOtp from '../utils/generateOtp.js'
import sendOtpEmail from '../utils/sendOtpEmail.js'

const registerUser = async (req, res, next) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing fields!" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email!" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password!" })
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {

            if (!existingUser.isVerified) {
                const { otp, expiresAt } = generateOtp();
                const otpHash = await bcrypt.hash(otp, 10);


                existingUser.emailOtp = otpHash;
                existingUser.emailOtpExpires = expiresAt;
                await existingUser.save();

                await sendOtpEmail(email, otp, "verification");

                return res.status(200).json({
                    success: true,
                    message: "Account already exists.OTP resent",
                    requireVerification: true
                });
            }
            return res.json({
                success: false,
                message: "User already exists.Please Login"
            })

        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashed = await bcrypt.hash(password, salt);

        // otp generate
        const { otp, expiresAt } = generateOtp()
        const otpHash = await bcrypt.hash(otp, 10)

        const newUser = new userModel({
            name, email, password: hashed,
            emailOtp: otpHash,
            emailOtpExpires: expiresAt,
            isVerified: false
        });
        await newUser.save();
        await sendOtpEmail(email, otp, "verification")
        res.status(201).json({
            success: true,
            message: "OTP sent to email. Please verify to continue."
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false, message: "Invalid email or password"
            })
        }
        if (!user.isVerified) {
            return res.json({
                success: false, message: "Please verify your email first"
            })
        }

        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if (isPassword) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
            return res.json({
                success: true, token
            })
        } else {
            return res.json({
                success: false, message: "Invalid Credentials"
            });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// verifyEmail otp

const verifyEmailOtp = async (req, res) => {
    try {
        const { email, otp } = req.body || {};

        if (!email || !otp) {
            return res.json({
                success: false,
                message: "Email and OTP are required"
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        if (user.isVerified) {
            return res.json({
                success: true,
                message: "Email already verified"
            })
        }

        if (!user.emailOtp || !user.emailOtpExpires) {
            return res.json({
                success: false,
                message: "OTP not found. Please request again."
            })
        }

        if (Date.now() > user.emailOtpExpires) {
            user.emailOtp = '';
            user.emailOtpExpires = null;
            await user.save();
            return res.json({
                success: false,
                message: "OTP expires. Please request new one"
            })
        }

        const isOtpValid = await bcrypt.compare(otp, user.emailOtp)
        if (!isOtpValid) {
            return res.json({
                success: false,
                message: "Invalid OTP"
            })
        }

        user.isVerified = true
        user.emailOtp = ''
        user.emailOtpExpires = null
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Email verification failed"
        })

    }
}

// resend otp for email

const resendEmailOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.isVerified) {
            return res.status(200).json({
                success: true,
                message: "Email already verified",
            });
        }

        const { otp, expiresAt } = generateOtp();
        const salt = await bcrypt.genSalt(10);
        const otpHash = await bcrypt.hash(otp, salt);

        user.emailOtp = otpHash;
        user.emailOtpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        await sendOtpEmail(email, otp, "verification");

        res.status(200).json({
            success: true,
            message: "A new OTP has been sent to your email",
        });

    } catch (error) {
        console.log("Resend OTP error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to resend OTP",
        });
    }
};
///Change password or forget password?

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.json({
                success: false,
                message: "Email is required",
            });
        }
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({
                success: true,
                message: "If the email exists, OTP has been sent"
            })
        }
        const { otp, expiresAt } = generateOtp()
        const otpHash = await bcrypt.hash(otp, 10);

        user.emailOtp = otpHash;
        user.emailOtpExpires = expiresAt;
        await user.save();

        await sendOtpEmail(email, otp, "reset")

        return res.json({
            success: true,
            message: "OTP sends to the email"
        })
    } catch (error) {
        console.error("Forgot password error", error);
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

///VerifyOTP
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.json({
                success: false,
                message: "Email and OTP are required"
            })
        }

        const user = await userModel.findOne({ email })


        if (!user || !user.emailOtp || !user.emailOtpExpires) {
            return res.json({
                success: false,
                message: "Invalid otp or otp expired."
            });
        }

        if (Date.now() > user.emailOtpExpires) {
            user.emailOtp = "",
                user.emailOtpExpires = null,
                await user.save()

            return res.json({
                success: false,
                message: "OTP expired. Please request a new one."
            });
        }
        const isOtpValid = await bcrypt.compare(otp, user.emailOtp)

        if (!isOtpValid) {
            return res.json({
                success: false,
                message: "Invalid OTP"
            })
        }

        return res.json({
            success: true,
            message: "OTP verified. You may reset your password."
        });
    } catch (error) {
        console.error("Verify reset OTP error:", error);
        res.json({
            success: false,
            message: "Something went wrong"
        });
    }
}

//reset the password

const resetPassword = async (req, res) => {
    try {
        const { email,  newPassword } = req.body;
        if (!email || !newPassword) {
            return res.json({
                success: false,
                message: "Email, and new password are required"
            });
        }

        if (newPassword.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        user.emailOtp = "";
        user.emailOtpExpires = null;
        await user.save();

        return res.json({
            success: true,
            message: "Password reset successfully. Please login."
        });
        
    } catch (error) {
        console.error("Reset error:", error);
        res.json({
            success: false,
            message: "Something went wrong"
        });
    }
}


const getProfile = async (req, res, next) => {
    try {
        const userId = req.userId
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const userId = req.userId
        const { name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: "Profile Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const { docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" })
        }
        //checking if the slotes rae availoable
        let slots_booked = docData.slots_booked
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //save new slots in Doctor Data

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment booked' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//api to get user appointmmenst in frontend from backnd
const listAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


//to cancel appoint,mnt

const cancelAppointment = async (req, res) => {
    try {
        // const {userId,appointmentId} = req.body
        const userId = req.userId
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" })
        }

        if (appointmentData.payment) {
            return res.json({
                success: false,
                message: "Paid appointments cannot be cancelled"
            });
        }


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


const paymentRazorpay = async (req, res) => {
    try {

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return res.json({ success: false, message: "Razorpay keys not found" })
        }

        const razorpayInstance = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment cancelled or not found " })
        }

        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }
        const order = await razorpayInstance.orders.create(options)
        res.json({ success: true, order })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

const verifyRazorpay = async (req, res) => {
    try {
        const razorpayInstance = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment successfull" })
        } else {
            res.json({ success: false, message: "Payment failed" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
export {
    registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment,
    cancelAppointment, paymentRazorpay, verifyRazorpay, verifyEmailOtp, resendEmailOtp,
    forgetPassword, verifyOtp, resetPassword
}


