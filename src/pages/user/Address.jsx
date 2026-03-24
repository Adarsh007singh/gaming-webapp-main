import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { BASE_URL } from "../../../Config/Config";

const UpdateProfile = () => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    email: "",
    phone: "",
    name:"",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/updateUser`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message || "Profile updated successfully");
      setFormData({ password: "", newPassword: "", email: "", phone: "" });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update profile";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="shadow-lg p-4 rounded-4 bg-light text-dark col-md-8 mx-auto">
        {/* <h2 className="text-center mb-4 text-purple">Update Profile</h2> */}
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
            />
          </div>
             <div className="col-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
            />
          </div>
          <h3 className="fw-bold text-purple">Change Password</h3>
          <div className="col-md-6">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
            />
          </div>
          <div className="col-12 text-center mt-4">
            <button
              type="submit"
              className="btn main-btn fs-5 shadow border-0"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
