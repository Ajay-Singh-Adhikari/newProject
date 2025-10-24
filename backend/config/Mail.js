import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = async (to, otp) => {
  await transporter.sendMail({
    from: `${process.env.EMAIL}`,
    to,
    subject: "Password Reset OTP - Be Social",
    html: `<p>Your OTP for password reset is: <b>${otp}</b>. This OTP is valid for 5 minutes.</p>`,
  });
};


export default sendMail;
