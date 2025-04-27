import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CourseProvider } from "./context/CourseContext";
import { ReviewProvider } from "./context/ReviewContext";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import ReviewPage from "./pages/ReviewPage";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup"; 

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
      <ReviewProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId/reviews" element={<ReviewPage />} />
            
            <Route path="/profile" element={<UserProfile />} /> 
          </Routes>
        </Router>
        </ReviewProvider>
      </CourseProvider>
    </AuthProvider>
  );
}
export default App;