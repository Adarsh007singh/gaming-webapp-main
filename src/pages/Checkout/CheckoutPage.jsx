import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
// import payment from "../assets/img/payment.png";
import BASE_URL from "../../config";
import { toast } from "react-toastify";
import axios from "axios";
const Checkout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [loading, setLoading] = useState(true);
  const { products } = useProducts();
  const {
    getSubtotal,
    getDiscountedTotal,
    getGSTAmount,
    handleQuantityChange,
  } = useCartContext();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState("Select Country");
  const [search, setSearch] = useState("");
  const [isOpen1, setIsOpen1] = useState(false);
  const [selected1, setSelected1] = useState("");
  const { cartItems, clearCart } = useCartContext();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const countries = ["India", "USA", "UK", "Germany", "France", "Japan"];
  const states = ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat"];
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    currency: "INR",
    streetAddress: "",
    city: "",
    country: "",
    state: "",
    postcode: "",
  });
  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return sum + price * quantity;
  }, 0);

  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollSuggested = (direction) => {
    const container = document.getElementById("suggested-products");
    const scrollAmount = 150; // Adjust based on item width
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  //  checkout api
  const handleInputChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    const {
      firstName,
      lastName,
      phone,
      email,
      streetAddress,
      city,
      country,
      state,
      postcode,
    } = billingDetails;

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !streetAddress ||
      !city ||
      // !country ||
      !state ||
      !postcode
    ) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Phone validation
    if (phone.length < 10 || isNaN(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    // UPI validation
    if (paymentMethod === "upi" && !upiId.trim()) {
      toast.error("Please enter your UPI ID.");
      return;
    }

    try {
      const order_id = "ORD" + Date.now();

      const res = await axios.post(
        `${BASE_URL}/placeOrder`,
        {
          order_id,
          billingDetails,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        const txCode = "TXN" + Date.now();
        const txTime = new Date().toISOString();

        await axios.post(`${BASE_URL}/paymentCallback`, {
          order_id,
          orderAmount: total,
          requestedAmount: total,
          currency: billingDetails.currency,
          txStatus: "SUCCESS",
          txMsg: "Payment completed successfully",
          txTime,
          txCode,
          checksum: "dummy-checksum",
        });

        clearCart();

        // Navigate to OrderSuccess page with transaction details
        navigate("/order-success", {
          state: {
            order_id,
            orderAmount: total,
            currency: billingDetails.currency,
            txStatus: "SUCCESS",
            txMsg: "Payment completed successfully",
            txTime,
            txCode,
          },
        });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Order failed");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer); // cleanup
  }, []);

  // if (loading) return <Loader/>;

  return (
    <div
      className="checkout-container text-white p-4 rounded mt-5 mx-auto mb-5"
      style={{ maxWidth: "1300px" }}
    >
      <h2 className="text-center fw-bold mb-5">Checkout</h2>

      {showLogin && (
        <form className="mb-4">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Username or email</label>
              <input
                type="text"
                className="form-control bg-transparent text-white border-primary"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control bg-transparent text-white border-primary"
                />
                <span className="input-group-text bg-transparent text-white border-primary">
                  <i className="bi bi-eye"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Login
          </button>
          <div>
            <Link to="#" className="text-info">
              Lost your password?
            </Link>
          </div>
        </form>
      )}

      <div className="row">
        {/* Billing */}
        <div className="col-md-6 pt-3">
          <h5 className="fw-bold mb-3">Billing details</h5>
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">First name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={billingDetails.firstName}
                  className="form-control bg-transparent text-white border-primary"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={billingDetails.lastName}
                  className="form-control bg-transparent text-white border-primary"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Phone *</label>
              <input
                type="text"
                name="phone"
                value={billingDetails.phone}
                className="form-control bg-transparent text-white border-primary"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address *</label>
              <input
                type="email"
                name="email"
                className="form-control bg-transparent text-white border-primary"
                value={billingDetails.email}
                onChange={handleInputChange}
              />
            </div>
            {/* <div style={{ position: "relative" }} className="mb-3">
              <label className="form-label text-white">
                Country / Region *
              </label>

   
              <div
                className="p-2 border  rounded text-white d-flex justify-content-between align-items-center"
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: "pointer", width: "100%" }}
              >
                {selected || "Select Country"}
                <i className="fa-solid fa-caret-down ms-2 text-white"></i>
              </div>
              {isOpen && (
                <div
                  className="p-2 bg-dark border border-primary rounded mt-1 position-absolute"
                  style={{
                    width: "100%",
                    zIndex: 999,
                  }}
                >
                  <div className="position-relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="form-control form-control-sm mb-2 bg-transparent text-white border-light ps-4"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <ul
                    className="list-unstyled mb-0"
                    style={{ maxHeight: "150px", overflowY: "auto" }}
                  >
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country, index) => (
                        <div
                          key={index}
                          className="text-white py-1 px-2 dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelected(country);
                            setIsOpen(false);
                            setSearch("");
                          }}
                        >
                          {country}
                        </div>
                      ))
                    ) : (
                      <li className="text-muted px-2">No match found</li>
                    )}
                  </ul>
                </div>
              )}
            </div> */}

            <div className="mb-3">
              <label className="form-label">Street address *</label>
              <input
                type="text"
                name="streetAddress"
                value={billingDetails.streetAddress}
                className="form-control bg-transparent text-white border-primary"
                placeholder="House number and street name"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Town / City *</label>
              <input
                type="text"
                className="form-control bg-transparent text-white border-primary"
                value={billingDetails.city}
                name="city"
                onChange={handleInputChange}
              />
            </div>
            <div className="position-relative mb-3">
              <label className="form-label text-white">State / County *</label>

              {/* Main Select Box */}
              <div
                className="p-2 border rounded text-white d-flex justify-content-between align-items-center"
                onClick={() => setIsOpen1(!isOpen1)}
                style={{ cursor: "pointer", width: "100%" }}
              >
                {billingDetails.state || "Select State"}
                <i className="fa-solid fa-caret-down ms-2 text-white"></i>
              </div>

              {/* Dropdown */}
              {isOpen1 && (
                <div
                  className="border border-primary bg-dark mt-1 position-absolute w-100 rounded p-2"
                  style={{ zIndex: 999 }}
                >
                  {/* Search Input */}
                  <div>
                    <input
                      type="text"
                      className="form-control form-control-sm mb-2 bg-transparent text-white border-light ps-4"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  {/* Options */}
                  {filteredStates.map((state, index) => (
                    <div
                      key={index}
                      className="text-white py-1 px-2 dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelected1(state);
                        setBillingDetails((prev) => ({ ...prev, state }));
                        setIsOpen1(false);
                        setSearch("");
                      }}
                    >
                      {state}
                    </div>
                  ))}

                  {/* No Results */}
                  {filteredStates.length === 0 && (
                    <div className="text-white-50 px-2">No match found</div>
                  )}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Postcode / ZIP *</label>
              <input
                type="text"
                name="postcode"
                value={billingDetails.postcode}
                onChange={handleInputChange}
                className="form-control bg-transparent text-white border-primary"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Currency</label>
              <input
                type="text"
                name="currency"
                className="form-control"
                value={billingDetails.currency}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
        </div>
        {/* Order Summary */}
        <div className="col-md-6">
          <div className="p-3 border border-2 border-info rounded">
            <h5 className="fw-bold">Your order</h5>
            <div className="d-flex justify-content-between fw-semibold  checkout-product-box">
              <span>Product</span>
              <span>Subtotal</span>
            </div>
            {cartItems.map((item) => {
              return (
                <>
                  <div className="d-flex py-4 align-items-center">
                    <Link to={`/shop-details/${item.product_id}`}>
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : item.image
                          ? `${BASE_URL}/uploads/${item.image}`
                          : "/default-product-image.png"
                      }
                      className="me-3"
                      style={{ width: "80px" }}
                      alt={item.name}
                    />
                    </Link>
                    <div className="flex-grow-1">
                      <div className="fw-semibold">{item.name}</div>
                      <div
                        className="input-group input-group-sm mt-2 quantity-box "
                        style={{ width: "100px" }}
                      >
                        <button
                          className="btn quantity-btn"
                          onClick={() =>
                            handleQuantityChange(item.product_id, -1)
                          }
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                        <div className="quantity-display">{item.quantity}</div>
                        <button
                          className="btn quantity-btn"
                          onClick={() =>
                            handleQuantityChange(item.product_id, +1)
                          }
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="text-end align-self-center">
                      ₹{item.price}
                    </div>
                  </div>
                  <div className="order-item "></div>
                </>
              );
            })}
            <div className="d-flex justify-content-between fw-bold py-3">
              <span>Subtotal</span>
              <span>{getSubtotal().toFixed(2)}</span>
            </div>
            <div className="order-item"></div>
            <div className="d-flex justify-content-between fw-bold pt-4">
              <span>Total</span>
              <span>
                <span> ₹ {getDiscountedTotal().toFixed(2)}</span>
                <small className="fw-normal text-white-50">
                  (includes ₹{getGSTAmount().toFixed(2)}GST)
                </small>
              </span>
            </div>
            {/* Suggested Product 2 */}
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center py-4">
                <h6 className="text-white mb-0">Suggested Products</h6>
                <div>
                  <button
                    className="btn btn-sm  me-1"
                    style={{ border: "1px solid #006CB5" }}
                    onClick={() => scrollSuggested(-1)}
                  >
                    <i class="fa-solid fa-angle-left text-white"></i>
                  </button>
                  <button
                    className="btn btn-sm "
                    style={{ border: "1px solid #006CB5" }}
                    onClick={() => scrollSuggested(1)}
                  >
                    <i class="fa-solid fa-angle-right text-white"></i>
                  </button>
                </div>
              </div>

              <div className="suggested-products-wrapper mb-5">
                <div
                  className="suggested-products d-flex justify-content-between "
                  id="suggested-products"
                >
                  {/* Suggested Product 2 */}
                  {products.map((item) => {
                    return (
                      <div
                        className="suggested-product-item d-flex mb-3"
                        key={item.id}
                      >
                         <Link to={`/shop-details/${item.id}`}>
                        <img
                          src={
                            item.image && item.image.startsWith("http")
                              ? item.image
                              : item.image
                              ? `${BASE_URL}/uploads/${item.image}`
                              : "/default-product-image.png"
                          }
                          alt={item.name || "Product Image"}
                          className="me-2"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                        </Link>
                        <div>
                          <p className="mb-1 text-white">{item.name}</p>
                          <small className="text-white d-block">
                            ₹{item.price} <del>₹{item.discount}</del>
                          </small>
                          <button className="btn btn-color btn-sm mt-2 text-white border-0">
                            Add to cart
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Add more items here if needed */}
                </div>
                <div className="order-item pt-2"></div>
              </div>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="upi"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              <label className="form-check-label fw-medium" htmlFor="upi">
                Upi Id
              </label>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter Upi Id"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
            {/* Consent */}
            <div className="form-check mt-3">
              <input
                className="form-check-input "
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #0483b5",
                }}
                type="checkbox"
                id="newsletter"
              />
              <label
                className="form-check-label fw-semibold"
                htmlFor="newsletter"
              >
                I would like to receive exclusive emails with discounts and
                product information
              </label>
            </div>
            <p className=" text-white mt-2" style={{ fontSize: "0.9rem" }}>
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our
              <Link to="#" className="text-color text-decoration-underline">
                {" "}
                privacy policy
              </Link>
              .
            </p>
            <p className="fst-italic">
              <strong>NOTE -</strong>{" "}
              <em>
                We are facing some technical issues due to which UPI payments
                are only available through mobile devices
              </em>
            </p>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="terms"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #0483b5",
                }}
              />
              <label className="form-check-label fw-semibold" htmlFor="terms">
                I have read and agree to the website{" "}
                <Link to="#" className="text-color">
                  terms and conditions
                </Link>
                <span className="text-danger"> *</span>
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-color text-white w-100 py-2"
              onClick={handlePlaceOrder}
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;

// import React, { useEffect, useState } from "react";
// import axios from "axios"
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useCartContext } from "../context/CartContext";
// import BASE_URL from "../config";

// const Checkout = () => {
//   const [loading, setLoading] = useState(true);
//   const { cartItems, clearCart } = useCartContext();
//   console.log(cartItems, "checkout");
//   const navigate = useNavigate();
// const total = cartItems.reduce((sum, item) => {
//   const price = Number(item.price) || 0;
//   const quantity = Number(item.quantity) || 1;
//   return sum + price * quantity;
// }, 0);

//   const [billingDetails, setBillingDetails] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     currency: "INR",
//     streetAddress: "",
//     city: "",
//     country: "",
//     state: "",
//     postcode: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("upi");
//   const [upiId, setUpiId] = useState("");

//   const handleInputChange = (e) => {
//     setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
//   };

// const handlePlaceOrder = async () => {
//   // Basic field validation
//   const {
//     firstName,
//     lastName,
//     phone,
//     email,
//     streetAddress,
//     city,
//     country,
//     state,
//     postcode,
//   } = billingDetails;

//   if (
//     !firstName ||
//     !lastName ||
//     !phone ||
//     !email ||
//     !streetAddress ||
//     !city ||
//     !country ||
//     !state ||
//     !postcode
//   ) {
//     toast.error("Please fill in all the required fields.");
//     return;
//   }

//   // Email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     toast.error("Please enter a valid email address.");
//     return;
//   }

//   // Phone validation
//   if (phone.length < 10 || isNaN(phone)) {
//     toast.error("Please enter a valid 10-digit phone number.");
//     return;
//   }

//   // UPI validation
//   if (paymentMethod === "upi" && !upiId.trim()) {
//     toast.error("Please enter your UPI ID.");
//     return;
//   }

//   try {
//     const order_id = "ORD" + Date.now();

//     const res = await axios.post(
//       `${BASE_URL}/placeOrder`,
//       {
//         order_id,
//         billingDetails,
//       },
//       {
//         headers: {
//           Authorization: sessionStorage.getItem("token"),
//         },
//       }
//     );

//     // if (res.status === 200) {
//     //   await axios.post("http://localhost:8000/paymentCallback", {
//     //     order_id,
//     //     orderAmount: total,
//     //     requestedAmount: total,
//     //     currency: billingDetails.currency,
//     //     txStatus: "SUCCESS",
//     //     txMsg: "Payment completed successfully",
//     //     txTime: new Date().toISOString(),
//     //     txCode: "TXN" + Date.now(),
//     //     checksum: "dummy-checksum",
//     //   });

//     //   // toast.success("Order placed and payment processed successfully!");
//     //   clearCart();
//     //   navigate("/order-success");
//     // }

//     if (res.status === 200) {
//   const txCode = "TXN" + Date.now();
//   const txTime = new Date().toISOString();

//   await axios.post(`${BASE_URL}/paymentCallback`, {
//     order_id,
//     orderAmount: total,
//     requestedAmount: total,
//     currency: billingDetails.currency,
//     txStatus: "SUCCESS",
//     txMsg: "Payment completed successfully",
//     txTime,
//     txCode,
//     checksum: "dummy-checksum",
//   });

//   clearCart();

//   // Navigate to OrderSuccess page with transaction details
//   navigate("/order-success", {
//     state: {
//       order_id,
//       orderAmount: total,
//       currency: billingDetails.currency,
//       txStatus: "SUCCESS",
//       txMsg: "Payment completed successfully",
//       txTime,
//       txCode,
//     },
//   });
// }

//   } catch (err) {
//     console.error(err);
//     toast.error(err.response?.data?.message || "Order failed");
//   }
// };

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   // if (loading) return <Loader/>;
//   return (
//     <>
//       {/* <TopHeader name="Checkout" /> */}
//       <div className="container py-5">
//         <div className="row g-5">
//           <div className="col-md-8">
//             <div className="card p-4 shadow-sm rounded-4">
//               <h4 className="mb-4 fw-semibold">Billing Details</h4>
//               <form>
//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <label className="form-label">First Name</label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       className="form-control"
//                       value={billingDetails.firstName}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">Last Name</label>
//                     <input
//                       type="text"
//                       name="lastName"
//                       className="form-control"
//                       value={billingDetails.lastName}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <label className="form-label">Phone</label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       className="form-control"
//                       value={billingDetails.phone}
//                       onChange={handleInputChange}
//                       maxLength="10"
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">Email Address</label>
//                     <input
//                       type="email"
//                       name="email"
//                       className="form-control"
//                       value={billingDetails.email}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <label className="form-label">Currency</label>
//                     <input
//                       type="text"
//                       name="currency"
//                       className="form-control"
//                       value={billingDetails.currency}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">Address </label>
//                     <input
//                       type="text"
//                       name="streetAddress"
//                       className="form-control"
//                       value={billingDetails.streetAddress}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <label className="form-label">City</label>
//                     <input
//                       type="text"
//                       name="city"
//                       className="form-control"
//                       value={billingDetails.city}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">Country</label>
//                     <input
//                       type="text"
//                       name="country"
//                       className="form-control"
//                       value={billingDetails.country}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <label className="form-label">State</label>
//                     <input
//                       type="text"
//                       name="state"
//                       className="form-control"
//                       value={billingDetails.state}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">Postal Code</label>
//                     <input
//                       type="text"
//                       name="postcode"
//                       className="form-control"
//                       value={billingDetails.postcode}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="col-md-4">
//             <div className="card p-4 shadow-sm rounded-4 ">
//               <h4 className="mb-4 fw-semibold">Your Order</h4>
//               <ul className="list-group list-group-flush mb-3">
//                 <li className="list-group-item d-flex justify-content-between fw-bold">
//                   <span>Total</span>
//                   <span>₹{total}</span>
//                 </li>
//               </ul>
//             </div>
//             <div className="mt-4 card p-4 shadow-sm rounded-4">
//               <h4 className="mb-4 fw-semibold">Payment</h4>

//               <div className="form-check mb-3">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="paymentMethod"
//                   id="upi"
//                   checked={paymentMethod === "upi"}
//                   onChange={() => setPaymentMethod("upi")}
//                 />
//                 <label className="form-check-label fw-medium" htmlFor="upi">
//                   Upi Id
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control mt-2"
//                   placeholder="Enter Upi Id"
//                   value={upiId}
//                   onChange={(e) => setUpiId(e.target.value)}
//                 />
//               </div>

//               <div className="form-check mb-3">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="paymentMethod"
//                   id="card"
//                   onChange={() => setPaymentMethod("card")}
//                 />
//                 <label className="form-check-label fw-medium" htmlFor="card">
//                   Credit/Debit Card
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control mt-2 bg-light border"
//                   value="Unavailable"
//                   disabled
//                 />
//               </div>

//               <div className="form-check mb-3">
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name="paymentMethod"
//                   id="netbanking"
//                   onChange={() => setPaymentMethod("netbanking")}
//                 />
//                 <label
//                   className="form-check-label fw-medium"
//                   htmlFor="netbanking"
//                 >
//                   Net Banking
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control mt-2 bg-light border"
//                   value="Unavailable"
//                   disabled
//                 />
//               </div>

//               <button
//                 className="btn main-btn fw-bold mt-3 w-100"
//                 onClick={handlePlaceOrder}
//               >
//                 Place Order
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Checkout;
