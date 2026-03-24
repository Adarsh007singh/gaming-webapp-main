// src/components/UserInfo.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../../context/AuthContext";
import Loader from "../Loader/Loader";

const UserInfo = () => {
	const { UserDetails } = useAuth();
 
  if (!UserDetails) {
    return <div className="text-center p-4">No user is logged in.</div>;
  }

 


  return (
    <div className="container mt-5">
      <div className="card  p-4">
        <h4 className="mb-4">👤 User Information</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>First Name:</strong> {UserDetails.firstName}</li>
          <li className="list-group-item"><strong>Last Name:</strong> {UserDetails.lastName}</li>
          <li className="list-group-item"><strong>Email:</strong> {UserDetails.email}</li>
          <li className="list-group-item"><strong>Phone:</strong> {UserDetails.phoneNo || "N/A"}</li>
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
