import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import BASE_URL from "../config";


const UserDetailsContext = createContext();


export const UserDetailsProvider = ({ children }) => {
   const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const getUserDetails = async (authToken = token) => {
    try {
      const response = await axios.get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const firstName = response.data?.data?.firstName;
      setUserName(firstName);
      setUser(response.data.data);
      sessionStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (error) {
      console.error("Failed to fetch user details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
      getUserDetails(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserDetailsContext.Provider value={{userName,user}}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => useContext(UserDetailsContext);
