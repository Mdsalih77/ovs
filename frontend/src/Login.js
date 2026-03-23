import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    aadhaar: "",
    email: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/otp/send-otp", {
        email: formData.email,
      });

      alert("OTP sent successfully");
      setOtpSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/otp/verify-otp",
        {
          ...formData,
          otp,
        }
      );

      localStorage.setItem("token", res.data.token);
      alert("Login Successful ");
      nav("/vote");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <center><h2>Voter Login</h2></center>

        <form onSubmit={handleVerifyOtp}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Aadhaar Number</label>
            <input
              type="text"
              name="aadhaar"
              maxLength="12"
              value={formData.aadhaar}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {!otpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="otp-btn"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          )}

          {otpSent && (
            <>
              <div className="form-group">
                <label>Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="otp-btn"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;