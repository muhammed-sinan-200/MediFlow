import nodemailer from 'nodemailer'
const sendOtpEmail = async (to, Otp, purpose = "verification") => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },

        })

        const subject =
            purpose === "reset" ?
                "Password reset OTP" :
                "Email verification OTP";

        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            html: ` <div> 
            <h2>${subject}</h2>
            <p>Your One Time Password for email verification is:</p>
            <h1>${Otp}</h1>
            <p>This OTP is valid for <b>10 minutes</b>.</p>
            </div>`,
        }
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Nodemailer error message:", error.message);
        console.error("Full error:", error);
        throw error; // don't hide it
    }
}



export default sendOtpEmail;