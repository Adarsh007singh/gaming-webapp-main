// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import "../../css/auth.css"
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import { useCartContext } from "../../context/CartContext";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { addToCart, fetchCart } = useCartContext();

//   const location = useLocation();
//   const navigate = useNavigate();
//   const searchParams = new URLSearchParams(location.search);
//   const redirectPath = searchParams.get("next") || "/";

//   const isValidPath = (path) => {
//     return path.startsWith("/"); // Basic validation
//   };
//   const safeRedirectPath = isValidPath(redirectPath) ? redirectPath : "/";

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       navigate("/", { replace: true });
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:9000/login", {
//         email,
//         password,
//       });

//       if (res.status === 200 && res.data.token) {
//         // Save session data
//         navigate("/")
//         sessionStorage.setItem("token", res.data.token);
//         sessionStorage.setItem("user", res.data.first_name);

//         // Refresh cart data from server
//         await fetchCart();

//         // Merge guest cart with user cart
//         const guestCart = JSON.parse(sessionStorage.getItem("guestCart"));
//         if (guestCart?.cartData?.length > 0) {
//           try {
//             // Add all guest cart items to user's cart
//             await Promise.all(
//               guestCart.cartData.map((item) =>
//                 addToCart(
//                   item.product_id,
//                   item.quantity,
//                   item.name,
//                   item.image,
//                   item.price
//                 )
//               )
//             );

//             // Clear guest cart data
//             sessionStorage.removeItem("guestCart");
//             sessionStorage.removeItem("count");

//             // Refresh cart state
//             await fetchCart();
//           } catch (syncError) {
//             console.error("Cart merge failed:", syncError);
//             toast.warning("Some cart items couldn't be saved", {
//               position: "bottom-right",
//               autoClose: 3000,
//             });
//           }
//         }

//         // Success feedback and redirect after toast closes
//         toast.success("Login successful!", {
//           position: "bottom-right",
//           autoClose: 2000,
//           hideProgressBar: true,
//           onClose: () => navigate(safeRedirectPath, { replace: true }),
//         });
//       } else {
//         toast.error(res.data.message || "Invalid credentials", {
//           position: "bottom-right",
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       // Unified error handling
//       const errorMessage = error.response?.data?.errors
//         ? Object.values(error.response.data.errors)[0]
//         : error.response?.data?.message || "Login failed. Please try again.";

//       toast.error(errorMessage, {
//         position: "bottom-right",
//         autoClose: 3000,
//       });
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
//             <form className="auth-form" onSubmit={handleLogin}>
//               <h2 className="mb-4 text-center auth-mainheading">Login</h2>

//               <div className="form-group mb-3">
//                 <label className="mb-1 text-info">Email</label>
//                 <input
//                   type="email"
//                   className="form-control form-input"
//                   placeholder="Enter your Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   autoComplete="email"
//                 />
//               </div>

//               <div className="form-group mb-2">
//                 <label className="mb-1 text-info">Password</label>
//                 <input
//                   type="password"
//                   className="form-control form-input"
//                   placeholder="Enter your Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   autoComplete="current-password"
//                 />
//               </div>

//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <div className="form-check">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id="rememberMe"
//                   />
//                   <label
//                     className="form-check-label text-white"
//                     htmlFor="rememberMe"
//                   >
//                     Remember me
//                   </label>
//                 </div>
//                 <Link
//                   to="/forgot-password"
//                   className="text-decoration-none text-info"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>

//               <div className="d-grid">
//                 <button
//                   type="submit"
//                   className="btn w-100 text-white p-2 btn-gaming-blue"
//                 >
//                   Login
//                 </button>
//               </div>

//               <p className="mt-3 text-center text-white">
//                 Don&apos;t have an account?{" "}
//                 <Link to="/register" className="text-decoration-none text-info">
//                   Sign Up
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../css/auth.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useCartContext } from "../../context/CartContext";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { addToCart, fetchCart } = useCartContext();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("next") || "/";
  const isValidPath = (path) => path.startsWith("/");
  const safeRedirectPath = isValidPath(redirectPath) ? redirectPath : "/";

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) navigate("/", { replace: true });
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      if (res.status === 200 && res.data.token) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", res.data.first_name);
        await fetchCart();

        const guestCart = JSON.parse(sessionStorage.getItem("guestCart"));
        if (guestCart?.cartData?.length > 0) {
          try {
            await Promise.all(
              guestCart.cartData.map((item) =>
                addToCart(
                  item.product_id,
                  item.quantity,
                  item.name,
                  item.image,
                  item.price
                )
              )
            );
            sessionStorage.removeItem("guestCart");
            sessionStorage.removeItem("count");
            await fetchCart();
          } catch (syncError) {
            console.error("Cart merge failed:", syncError);
            toast.warning("Some cart items couldn't be saved", {
              position: "bottom-right",
              autoClose: 3000,
            });
          }
        }

        toast.success("Login successful!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          onClose: () => navigate(safeRedirectPath, { replace: true }),
        });
      } else {
        toast.error(res.data.message || "Invalid credentials", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.errors
        ? Object.values(error.response.data.errors)[0]
        : error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container-fluid auth-page-wrapper d-flex flex-column min-vh-100">
      {/* <ToastContainer /> */}
      <div
        className="container flex-grow-1 d-flex align-items-center justify-content-center auth-outer my-5"
        style={{
          backgroundColor: "rgb(23, 83, 119)",
          boxShadow: "0px 12px 18px -6px rgba(34, 56, 101, 0.04)",
        }}
      >
        <div className="row w-100 align-items-center justify-content-center">
          <div className="col-lg-6 col-md-10 col-12 mb-5 mb-lg-0 d-flex justify-content-center">
            <form className="auth-form" onSubmit={handleLogin} noValidate>
              <h2 className="mb-4 text-center auth-mainheading">Login</h2>

              <div className="form-group mb-3">
                <label className="mb-1 text-info">Email</label>
                <input
                  type="email"
                  className={`form-control form-input ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="form-group mb-3">
                <label className="mb-1 text-info">Password</label>
                <input
                  type="password"
                  className={`form-control form-input ${errors.password ? "is-invalid" : ""}`}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label
                    className="form-check-label text-white"
                    htmlFor="rememberMe"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-decoration-none text-info"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn w-100 text-white p-2 btn-gaming-blue"
                >
                  Login
                </button>
              </div>

              <p className="mt-3 text-center text-white">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-decoration-none text-info">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
