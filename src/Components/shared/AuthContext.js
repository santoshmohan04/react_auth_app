import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    let userProfle = localStorage.getItem("userProfile");
    if (userProfle) {
      return JSON.parse(userProfle);
    }
    return null;
  });
  let url = "http://localhost:4000/";
  const navigate = useNavigate();
  const login = async (payload) => {
    await axios.post(`${url}auth/login`, payload, {
      withCredentials: true,
    });
    let apiResponse = await axios.get(`${url}user-profile`, {
      withCredentials: true,
    });
    localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
    setUser(apiResponse.data);
    navigate("/");
  };

  const signup = async (payload) => {
    await axios.post(`${url}signup`, payload, { withCredentials: true });
  };

  const logout = async () => {
    await axios.get(`${url}logout`, { withCredentials: true });
    localStorage.removeItem("userProfile");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <AuthContext.Provider value={{ user, login, logout, signup }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
