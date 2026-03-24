import React, { useEffect, useState } from "react";
import "./Dashboard.css";
// import OrderPage from "./OrderPage";
// import UserInfo from "./UserInfo";
// import UpdateProfile from "./Address";
// import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
// import Loader from "../Loader/Loader";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  // const { handleLogout,userName  } = useAuth();
  const [loading, setLoading] = useState(true)

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return "gdhfyjguk";
      case "details":
        return "eartyui";
      case "address":
        return "esrtdyfugi";
      case "logout":
        return <div>You have been logged out.</div>;
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };
useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer); 
    }, []);
//  if (loading) return <Loader/>;
  return (
    <div className="dashboard-container">
      <div className="d-flex flex-column flex-md-row min-vh-100">
        {/* Sidebar */}
        <div className="sidebar bg-white border-end p-3">
          <h3 className=" mb-4 text-dark fw-bold">Details</h3>

          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button
                className={`btn w-100 text-start ${
                  activeTab === "orders" ? "btn-secondary1" : ""
                }`}
                onClick={() => setActiveTab("orders")}
              >
                <i class="fa-solid fa-cart-shopping"></i> Orders
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className={`btn w-100 text-start ${
                  activeTab === "details" ? "btn-secondary1" : ""
                }`}
                onClick={() => setActiveTab("details")}
              >
                <i class="fa-solid fa-circle-user"></i> User Details
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className={`btn w-100 text-start ${
                  activeTab === "address" ? "btn-secondary1" : ""
                }`}
                onClick={() => setActiveTab("address")}
              >
                <i class="fa-solid fa-location-dot"></i> Address
              </button>
            </li>
            <li className="nav-item mt-4">
              <button className="btn w-100 text-start" >
                <i class="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="content flex-grow-1 p-4 bg-light">
          <h3 className="mb-3 text-capitalize text-dark fw-bolder">
            {activeTab}
          </h3>
          <div className="content-area border rounded p-4 shadow-sm bg-white">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
