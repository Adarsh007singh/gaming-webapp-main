import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import BASE_URL from "../../config";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email) return toast.error("Please enter your email.");

    try {
      const response = await axios.post(`${BASE_URL}/sendOtp`, { email });
      if (response.data.status) {
        toast.success(response.data.message);
        setStep(2);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Error sending OTP.");
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !password || !confirmPassword)
      return toast.error("All fields are required.");

    if (password !== confirmPassword)
      return toast.error("Passwords do not match.");

    try {
      const response = await axios.post(`${BASE_URL}/forgetPassword`, {
        email,
        otp,
        password,
        confirm_password: confirmPassword, // 🔁 Fix: match backend's field
      });

      if (response.data.status) {
        toast.success("Password reset successful!");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Error resetting password.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="text-center p-5 shadow-sm rounded"
        style={{ width: "100%", maxWidth: "450px", background: "#fafafa" }}
      >
        <h2 className="mb-4 fw-bold">Forgot Password</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              className="form-control form-control-lg mb-4 shadow-sm"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: "10px" }}
            />
            <button
              className="btn btn-lg w-100 text-white fw-bold bg-dark"
              style={{ borderRadius: "7px" }}
              onClick={handleSendOTP}
            >
              SEND OTP
            </button>
            <div className="mt-3">
              <Link to="/login" className="text-danger small">
                ← Back to Login
              </Link>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              className="form-control form-control-lg mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              className="form-control form-control-lg mb-3"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control form-control-lg mb-4"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="btn btn-lg w-100 text-white fw-bold bg-dark"
              style={{ borderRadius: "7px" }}
              onClick={handleResetPassword}
            >
              RESET PASSWORD
            </button>
          </>
        )}
      </div>
    </div>
  );
}
