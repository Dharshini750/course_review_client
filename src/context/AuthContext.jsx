import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setError(null);
    if (email === "admin@gmail.com" && password === "admin123") {
      const adminUser = {
        id: "admin-1",
        name: "Admin",
        email: "admin@gmail.com",
        role: "admin",
      };
      setCurrentUser(adminUser);
      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      return true;
    }

    try {
      const response = await fetch("${API_URL}/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
        localStorage.setItem("currentUser", JSON.stringify(data));
        return true;
      } else {
        const data = await response.json();
        setError(data.message || "Invalid email or password");
        return false;
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      return false;
    }
  };

  const register = async (name, email, password, role = "instructor") => {
    setError(null);
    try {
      const response = await fetch("${API_URL}/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
        localStorage.setItem("currentUser", JSON.stringify(data));
        return true;
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed. Please try again.");
        return false;
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
