import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../../utils/apiInstance";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const login = (userToken, user) => {
    axiosInstance.interceptors.request.clear();
    axiosInstance.interceptors.request.use((request) => {
      request.headers = {
        Authorization: `Bearer ${userToken}`,
      };
      return request;
    });
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    axiosInstance.interceptors.request.clear();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
