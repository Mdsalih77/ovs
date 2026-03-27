import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

let otpStore = {};

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = otp;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP for Voting Login",
      text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    console.log("OTP ERROR:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP + Login
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, name, dob, aadhaar } = req.body;

    if (!otpStore[email] || otpStore[email] != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.findOne({
      name: name,
      dob: dob,
      aadhaar: aadhaar,
      emailid: email,
    });

    if (!user) {
      return res.status(400).json({ message: "User details do not match" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    delete otpStore[email];

    res.json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.log("VERIFY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};