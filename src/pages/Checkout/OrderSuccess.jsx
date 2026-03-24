import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import confetti from "canvas-confetti";
import "./OrderSuccess.css"; // Add this CSS file for styling

const OrderSuccess = () => {
  const { state } = useLocation();

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  if (!state) {
    return (
      <div className="order-success-wrapper">
        <div className="order-success-card text-center">
          <h2 className="order-title">Oops!</h2>
          <p className="order-message">No payment information found.</p>
          <Link to="/courses" className="btn main-btn">
            Go to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-wrapper container-fluid">
      <div className="order-success-card container text-center">
        <div className="checkmark-wrapper">
          <div className="checkmark">✓</div>
        </div>
        <h1 className="order-title">Purchase Complete!</h1>
        <p className="order-message">Welcome to Clavix Academy — You’re in!</p>

        <div className="order-success-summary">
          <h2 className="order-summary-heading">Order Summary</h2>
          <ul className="order-summary-list">
            <li><strong>Order ID:</strong> {state.order_id}</li>
            <li><strong>Amount Paid:</strong> ₹{state.orderAmount}</li>
            <li><strong>Currency:</strong> {state.currency}</li>
            <li><strong>Transaction Status:</strong> {state.txStatus}</li>
            <li><strong>Transaction Message:</strong> {state.txMsg}</li>
            <li><strong>Transaction Code:</strong> {state.txCode}</li>
            <li><strong>Time:</strong> {new Date(state.txTime).toLocaleString()}</li>
          </ul>
        </div>

        <Link to="/courses" className="btn main-btn mt-4">
          Browse More Courses
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
