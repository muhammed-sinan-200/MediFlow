import Router from 'express'
import {
    registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment,
    cancelAppointment, paymentRazorpay, verifyRazorpay, verifyEmailOtp, resendEmailOtp,
    verifyOtp,
    resetPassword,
    forgetPassword
} from '../controllers/userController.js'
import userAuth from '../middlewares/userAuth.js'
import upload from '../middlewares/multer.js'
const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
// email verification
userRouter.post('/verify-email-otp', verifyEmailOtp)
userRouter.post('/resend-email-otp', resendEmailOtp)
// forgot password
userRouter.post('/forgot-password', forgetPassword)
userRouter.post('/verify-otp', verifyOtp)
userRouter.post("/reset-password", resetPassword);

userRouter.get('/get-profile', userAuth, getProfile)
userRouter.post('/update-profile', upload.single('image'), userAuth, updateProfile)
userRouter.post('/book-appointment', userAuth, bookAppointment)
userRouter.get('/appointments', userAuth, listAppointment)
userRouter.post('/cancel-appointment', userAuth, cancelAppointment)
userRouter.post('/payment-razorpay', userAuth, paymentRazorpay)
userRouter.post('/verifyRazorpay', userAuth, verifyRazorpay)
export default userRouter
