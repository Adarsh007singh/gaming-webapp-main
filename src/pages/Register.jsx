import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import "../../src/css/auth.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const formData = { firstName, lastName, email, password, confirmPassword, phoneNo };

    try {
      const response = await axios.post("http://localhost:8000/signup", formData);

      toast.success(response.data.message || "Registration successful!");

      // Clear form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNo("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login")
    } catch (error) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.values(errors).forEach((msg) => {
          toast.error(msg);
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="container-fluid auth-page-wrapper d-flex flex-column min-vh-100">
      <div
        className="container flex-grow-1 d-flex align-items-center justify-content-center auth-outer my-5"
        style={{
          backgroundColor: "rgb(23, 83, 119)",
          boxShadow: "0px 12px 18px -6px rgba(34, 56, 101, 0.04)",
        }}
      >
        <div className="row w-100 align-items-center justify-content-center">
          <div className="col-lg-6 col-md-10 col-12 mb-5 mb-lg-0 d-flex justify-content-center">
            <form className="auth-form w-80 my-3" onSubmit={handleSubmit}>
              <h2
                className="mb-4 text-center auth-mainheading"
                style={{
                  color: "#00f0ff",
                  textShadow: "0 0 10px #00f0ff",
                }}
              >
                Sign Up
              </h2>

              <div className="form-group mb-3">
                <label className="mb-1" style={{ color: "#00f0ff" }}>
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="mb-1" style={{ color: "#00f0ff" }}>
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="mb-1" style={{ color: "#00f0ff" }}>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="mb-1" style={{ color: "#00f0ff" }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control form-input"
                  placeholder="Enter your phone number"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="mb-1" style={{ color: "#00f0ff" }}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="mb-1" style={{ color: "#00f0ff" }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control form-input"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid mt-3">
                <button
                  className="btn w-100 text-white p-2 btn-gaming-blue"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>

              <p className="mt-3 text-center text-light">
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none" style={{ color: "#00f0ff" }}>
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Toast container to show toasts */}
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../../src/css/auth.css";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Register = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [phoneNo, setPhoneNo] = useState("");
//   const navigate = useNavigate();

//   const validateForm = () => {
//     if (!firstName.trim()) return "First Name is required.";
//     if (!lastName.trim()) return "Last Name is required.";
//     if (!email.trim()) return "Email is required.";
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) return "Invalid email format.";
//     if (!phoneNo.trim()) return "Phone number is required.";
//     if (!/^\d{10}$/.test(phoneNo)) return "Phone number must be 10 digits.";
//     if (!password) return "Password is required.";
//     if (password.length < 6)
//       return "Password must be at least 6 characters long.";
//     if (password !== confirmPassword)
//       return "Password and Confirm Password do not match.";
//     return null;
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationError = validateForm();
//     if (validationError) {
//       toast.error(validationError);
//       return;
//     }

//     const formData = {
//       firstName,
//       lastName,
//       email,
//       password,
//       confirmPassword,
//       phoneNo,
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:9000/signup",
//         formData
//       );
//       toast.success(response.data.message || "Registration successful!");

//       // Clear form
//       setFirstName("");
//       setLastName("");
//       setEmail("");
//       setPhoneNo("");
//       setPassword("");
//       setConfirmPassword("");

//       navigate("/login");
//     } catch (error) {
//       if (error.response?.data?.errors) {
//         Object.values(error.response.data.errors).forEach((msg) => {
//           toast.error(msg);
//         });
//       } else if (error.response?.data?.message) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("Registration failed. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="container-fluid auth-page-wrapper d-flex flex-column min-vh-100">
//       <div
//         className="container flex-grow-1 d-flex align-items-center justify-content-center auth-outer my-5"
//         style={{
//           backgroundColor: "rgb(23, 83, 119)",
//           boxShadow: "0px 12px 18px -6px rgba(34, 56, 101, 0.04)",
//         }}
//       >
//         <div className="row w-100 align-items-center justify-content-center">
//           <div className="col-lg-6 col-md-10 col-12 mb-5 mb-lg-0 d-flex justify-content-center">
//             <form className="auth-form w-80 my-3" onSubmit={handleSubmit}>
//               <h2
//                 className="mb-4 text-center auth-mainheading"
//                 style={{
//                   color: "#00f0ff",
//                   textShadow: "0 0 10px #00f0ff",
//                 }}
//               >
//                 Sign Up
//               </h2>

//               <div className="form-group mb-3">
//                 <label className="mb-1" style={{ color: "#00f0ff" }}>
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control form-input"
//                   placeholder="Enter your first name"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                 />
//               </div>

//               <div className="form-group mb-3">
//                 <label className="mb-1" style={{ color: "#00f0ff" }}>
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control form-input"
//                   placeholder="Enter your last name"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                 />
//               </div>

//               <div className="form-group mb-3">
//                 <label className="mb-1" style={{ color: "#00f0ff" }}>
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   className="form-control form-input"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <div className="form-group mb-3">
//                 <label className="mb-1" style={{ color: "#00f0ff" }}>
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   className="form-control form-input"
//                   placeholder="Enter your phone number"
//                   value={phoneNo}
//                   maxLength={10}
//                   onChange={(e) => setPhoneNo(e.target.value)}
//                 />
//               </div>

//               <div className="form-group mb-3">
//                 <label className="mb-1" style={{ color: "#00f0ff" }}>
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control form-input"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>

//               <div className="form-group mb-3">
//                 <label className="mb-1" style={{ color: "#00f0ff" }}>
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control form-input"
//                   placeholder="Confirm your password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//               </div>

//               <div className="d-grid mt-3">
//                 <button
//                   className="btn w-100 text-white p-2 btn-gaming-blue"
//                   type="submit"
//                 >
//                   Sign Up
//                 </button>
//               </div>

//               <p className="mt-3 text-center text-light">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="text-decoration-none"
//                   style={{ color: "#00f0ff" }}
//                 >
//                   Login
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="bottom-right" autoClose={5000} />
//     </div>
//   );
// };

// export default Register;
