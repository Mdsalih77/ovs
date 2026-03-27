import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

let otpStore = {}; // temporary store

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = otp;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP for Voting Login",
    text: `Your OTP is ${otp}`,
  });

  res.json({ message: "OTP sent successfully" });
};

// Verify OTP + Login
export const verifyOtp = async (req, res) => {
const { email, otp, name, dob, aadhaar } = req.body;

  if (otpStore[email] != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

if (otpStore[email] != otp) {
  return res.status(400).json({ message: "Invalid OTP" });
}

const user = await User.findOne({
  name: name,
  dob: dob,
  aadhaar: aadhaar,
  emailid: email
});

if (!user) {
  return res.status(400).json({ message: "User details do not match" });
}

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  delete otpStore[email]; // cleanup

  res.json({ token });
};