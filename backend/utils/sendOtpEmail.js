// utils/sendOtpEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // load environment variables

// create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // use 465 if secure: true
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// verify transporter
transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP Connection Error:", err);
  } else {
    console.log("SMTP Server is ready to send emails");
  }
});

// send OTP email function
const sendOtpEmail = async (to, otp, purpose = "verification") => {
  try {
    const subject =
      purpose === "reset" ? "Password Reset OTP" : "Email Verification OTP";

    const html = `
      <div style="font-family: sans-serif; padding: 10px;">
        <h2>${subject}</h2>
        <p>Your One Time Password (OTP) is:</p>
        <h1 style="color: purple;">${otp}</h1>
        <p>This OTP is valid for <b>10 minutes</b>.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.EMAIL, // sender email
      to, // recipient email
      subject,
      html,
    });

    console.log(`OTP email sent to ${to}`);
    console.log("Message ID:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendOtpEmail;
