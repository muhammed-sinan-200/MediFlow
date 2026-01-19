import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtpEmail = async (to, otp, purpose = "verification") => {
  try {
    const subject =
      purpose === "reset"
        ? "Password reset OTP"
        : "Email verification OTP";

    await resend.emails.send({
      from: "MediFlow <onboarding@resend.dev>",
      to,
      subject,
      html: `
        <div>
          <h2>${subject}</h2>
          <p>Your One Time Password for email verification is:</p>
          <h1>${otp}</h1>
          <p>This OTP is valid for <b>10 minutes</b>.</p>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("Resend error message:", error.message);
    console.error("Full error:", error);
    throw error;
  }
};

export default sendOtpEmail;
