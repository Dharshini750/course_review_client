import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import EditableSection from "../components/userprofile/EditableSection";
const API_URL = import.meta.env.VITE_API_URL;
import {
  Edit,
  Save,
  Phone,
  Mail,
  User,
  GraduationCap,
  BookOpen,
  List,
  Settings,
  XCircle,
} from "lucide-react";
import { mockCourses } from "../data/mockdata"; 

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    phone: "",
    age: "",
    gender: "",
    education: "",
    college: "",
    skills: [],
    preferences: [],
    courses: [], 
  });
  const [availableCourses, setAvailableCourses] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!currentUser) return;
      try {
        const response = await fetch(`${API_URL}/api/users/${currentUser.email}`);
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    const fetchAvailableCourses = () => {
      setAvailableCourses(mockCourses.map((course) => course.title));
    };
    fetchUserDetails();
    fetchAvailableCourses();
  }, [currentUser]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const response = await fetch(`${API_URL}/api/users/${currentUser.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        console.log("User details updated successfully:", updatedUser);
      } else {
        console.error("Failed to update user details");
      }
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !userDetails.skills.includes(newSkill)) {
      setUserDetails({ ...userDetails, skills: [...userDetails.skills, newSkill] });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setUserDetails({ ...userDetails, skills: userDetails.skills.filter((s) => s !== skill) });
  };

  const handleAddPreference = (course) => {
    if (course && !userDetails.preferences.includes(course)) {
      setUserDetails({ ...userDetails, preferences: [...userDetails.preferences, course] });
    }
  };

  const handleRemovePreference = (preference) => {
    setUserDetails({ ...userDetails, preferences: userDetails.preferences.filter((p) => p !== preference) });
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900">Please log in to view your profile.</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <EditableSection label="Name" value={currentUser.name} isEditing={false} icon={User} />
            <EditableSection label="Email" value={currentUser.email} isEditing={false} icon={Mail} />
            <EditableSection label="Role" value={currentUser.role} isEditing={false} icon={User} />
            <EditableSection
              label="Phone Number"
              value={userDetails.phone}
              isEditing={isEditing}
              onChange={(value) => setUserDetails({ ...userDetails, phone: value })}
              icon={Phone}
            />
            <EditableSection
              label="Age"
              value={userDetails.age}
              isEditing={isEditing}
              onChange={(value) => setUserDetails({ ...userDetails, age: value })}
              type="string"
              icon={Settings}
            />
            <EditableSection
              label="Gender"
              value={userDetails.gender}
              isEditing={isEditing}
              onChange={(value) => setUserDetails({ ...userDetails, gender: value })}
              icon={Settings}
            />
            <EditableSection
              label="Education"
              value={userDetails.education}
              isEditing={isEditing}
              onChange={(value) => setUserDetails({ ...userDetails, education: value })}
              icon={GraduationCap}
            />
            <EditableSection
              label="College"
              value={userDetails.college}
              isEditing={isEditing}
              onChange={(value) => setUserDetails({ ...userDetails, college: value })}
              icon={BookOpen}
            />
            <div className="mb-6">
              <label className="flex text-gray-700 font-medium mb-2 items-center">
                <List className="mr-2 text-gray-500" />
                Skills
              </label>
              {isEditing ? (
                <div>
                  <div className="flex items-center mb-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Add a skill"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {userDetails.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                        {skill}
                        <XCircle
                          className="ml-2 text-red-500 cursor-pointer"
                          onClick={() => handleRemoveSkill(skill)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {userDetails.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="flex text-gray-700 font-medium mb-2 items-center">
                <Settings className="mr-2 text-gray-500" />
                {currentUser.role === "instructor" ? "Courses Taken" : "Preferences"}
              </label>
              {isEditing ? (
                <div>
                  {currentUser.role === "instructor" ? (
                    <select
                      onChange={(e) => handleAddPreference(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-2"
                      defaultValue=""
                    >
                      <option value="" disabled>Select a course</option>
                      {availableCourses.map((course, index) => (
                        <option key={index} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      onChange={(e) => handleAddPreference(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-2"
                      defaultValue=""
                    >
                      <option value="" disabled>Select a preference</option>
                      {availableCourses.map((course, index) => (
                        <option key={index} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {userDetails.preferences.map((preference, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                        {preference}
                        <XCircle
                          className="ml-2 text-red-500 cursor-pointer"
                          onClick={() => handleRemovePreference(preference)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {userDetails.preferences.map((preference, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      {preference}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
                >
                  <Save className="mr-2" />
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center"
                >
                  <Edit className="mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
