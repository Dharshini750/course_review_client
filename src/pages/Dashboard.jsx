import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import StudentDashboard from "../components/student/studentDashboard";
import InstructorDashboard from "../components/instructor/instructordashboard";
import AdminDashboard from "../components/admin/adminDashboard";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      navigate("/login"); 
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null; 
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {currentUser.role === "student" && <StudentDashboard />}
        {currentUser.role === "instructor" && <InstructorDashboard />}
        {currentUser.role === "admin" && <AdminDashboard />}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
