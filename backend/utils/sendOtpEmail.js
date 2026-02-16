import nodemailer from "nodemailer";

const sendOtpEmail = async (to, otp, purpose = "verification") => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, 
      auth: {
        user: process.env.EMAIL,            
        pass: process.env.EMAIL_PASSWORD 
      },
    });

    // Verify transporter connection
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error("Transporter verify failed:", error);
          reject(error);
        } else {
          console.log("Transporter ready:", success);
          resolve(success);
        }
      });
    });

    const subject =
      purpose === "reset" ? "Password reset OTP" : "Email verification OTP";

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      html: `
        <div>
          <h2>${subject}</h2>
          <p>Your One Time Password is:</p>
          <h1>${otp}</h1>
          <p>This OTP is valid for <b>10 minutes</b>.</p>
        </div>
      `,
    };

    // Send email
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("SendMail error:", err);
          reject(err);
        } else {
          console.log("Email sent:", info.response);
          resolve(info);
        }
      });
    });

    return true;
  } catch (error) {
    console.error("sendOtpEmail error:", error);
    throw error;
  }
};

export default sendOtpEmail;
