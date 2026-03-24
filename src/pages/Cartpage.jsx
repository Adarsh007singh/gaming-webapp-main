import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/cart.css";
import { useCartContext } from "../context/CartContext";
import BASE_URL from "../config";

const CartPage = () => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const {
    cartItems,
    // addToCart,
    removeFromCart,
    getSubtotal,
    getDiscountedTotal,
    getGSTAmount,
    handleQuantityChange,
    // applyCoupon,
  } = useCartContext();
  const [localCart, setLocalCart] = useState([]);

  // Sync local cart with context cart
  useEffect(() => {
    setLocalCart(cartItems);
  }, [cartItems]);
console.log(localCart)
  // const handleCouponChange = (e) => {
  //   setCouponCode(e.target.value);
  // };
  // const handleCouponApply = () => {
  //   const result = applyCoupon(couponCode);
  //   alert(result.message);
  // };

  // In CartPage.jsx - Update handleRemoveItem
  const handleRemoveItem = async (product_id) => {
    const response = await removeFromCart(product_id);
    if (response.success) {
      // Update local cart immediately
      setLocalCart((prev) =>
        prev.filter((item) => item.product_id !== product_id)
      );
    } else {
      alert("Failed to remove item: " + response.message);
    }
  };

  const handleProceedToCheckout = () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      navigate("/checkout");
    } else {
      // navigate("/login");
      navigate("/login?next=/checkout");
    }
  };

  return (
    <div
      className="container my-5 py-5"
      style={{ backgroundColor: "rgb(23, 83, 119)" }}
    >
      {localCart.length === 0 ? (
        <>
          <h2 className="text-white text-center pb-4">Cart</h2>
          <div className="row primaryBg  d-flex align-items-center empty-cart">
            <div className="text-white col-10 p-3">
              <p className="mb-0">
                <i className="fa-regular fa-bell fs-5"></i> Your cart is
                currently empty.
              </p>
            </div>
          </div>
          <button
            className="btn btn-color text-white ms-2 mt-3"
            onClick={() => navigate("/")}
          >
            Return To Shop
          </button>
        </>
      ) : (
        <div className="row p-5">
          <div className="col-lg-8">
            <div className="cart-items">
              <h4 className="text-center text-white">Cart</h4>
              <table className="table text-white">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {localCart.map((item) => (
                    <tr key={item.product_id}>
                      <td className="align-middle">
                      <Link to={`/shop-details/${item.product_id}`}>
                        <img
                          src={
                            item.image?.startsWith("http")
                              ? item.image
                              : item.image
                              ? `${BASE_URL}/uploads/${item.image}`
                              : "/default-product-image.png"
                          }
                          height={135}
                          alt={item.name}
                          style={{ objectFit: "cover" }}
                        /></Link>
                      </td>
                      <td className="text-center align-middle">{item.name}</td>
                      <td className="text-center align-middle">
                        <div
                          className="input-group quantity"
                          style={{ width: "100px" }}
                        >
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#00FFF5",
                              color: "#000",
                            }}
                            onClick={() =>
                              handleQuantityChange(item.product_id, -1)
                            }
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            className="form-control form-control-sm text-center"
                            style={{
                              backgroundColor: "#14142b",
                              color: "#fff",
                              border: "1px solid #00FFF5",
                            }}
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#00FFF5",
                              color: "#000",
                            }}
                            onClick={() =>
                              handleQuantityChange(item.product_id, 1)
                            }
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="text-center align-middle">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="text-center align-middle">
                        <i
                          className="fa-solid fa-trash text-danger"
                          onClick={() => handleRemoveItem(item.product_id)}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="row">
                <div className="col-6">
                  {/* <div className="mb-3 d-flex">
                    <input
                      type="text"
                      className="form-control coupon-input"
                      value={couponCode}
                      onChange={handleCouponChange}
                      placeholder="Enter Coupon Code"
                    />
                    <button
                      className="coupon-btn btn mt-2 w-100 p-2 ms-2"
                      onClick={handleCouponApply}
                    >
                      Apply Coupon
                    </button>
                  </div> */}
                </div>
                <div className="col-6 text-end">
                  <button
                    className="btn text-white disable-btn"
                    style={{ backgroundColor: "#409cbb" }}
                    onClick={() => window.location.reload()} // Optional: Refresh cart
                    disabled
                  >
                    Update Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="subtotal-card p-4 rounded-3 shadow-lg">
              <h5 className="mb-4 text-white">Cart Total</h5>
              <div className="d-flex justify-content-between mb-3 text-white">
                <p>Subtotal</p>
                <p>₹{getSubtotal().toFixed(2)}</p>
              </div>
              <div className="order-item mb-4"></div>
              <div className="d-flex justify-content-between mb-4 text-white">
                <p>Total</p>
                <div className="d-flex">
                  <p>₹{getDiscountedTotal().toFixed(2)}</p>
                  <span className="text-white" style={{ fontSize: "0.8rem" }}>
                    (includes ₹{getGSTAmount().toFixed(2)} GST)
                  </span>
                </div>
              </div>
              <button
                className="btn btn-total"
                onClick={handleProceedToCheckout}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
