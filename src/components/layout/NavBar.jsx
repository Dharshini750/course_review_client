
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Chatbot from "../chatbot/chatBot";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);

  useEffect(() => {
    setIsLoggedIn(!!currentUser);
  }, [currentUser]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1
              className="text-2xl font-bold text-yellow-400 cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              Prof Finder
            </h1>
            <button
              onClick={() => handleNavigation("/")}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/dashboard")}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavigation("/courses")}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Courses
            </button>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {currentUser?.role !== "admin" && (
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="text-gray-300 text-sm font-medium hover:text-white"
                  >
                    {currentUser?.name || "User"}
                  </button>
                )}
                <button
                  onClick={handleLoginLogout}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleLoginLogout}
                className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <FaSignInAlt />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {isLoggedIn && currentUser?.role === "student" && <Chatbot />}
    </nav>
  );
};

export default Navbar;
