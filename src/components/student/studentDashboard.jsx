
import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { mockCourses, mockReviews } from "../../data/mockdata"; 
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const StudentDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [initialAnalytics, setInitialAnalytics] = useState(null);

  useEffect(() => {
    const departments = [...new Set(mockCourses.map((c) => c.department))];
    const deptData = departments.map((dept) => {
      const courseIds = mockCourses.filter((c) => c.department === dept).map((c) => c.id);
      const reviewsCount = mockReviews.filter((r) => courseIds.includes(r.courseId)).length;
      return { dept, reviewsCount };
    });
    const instructors = [...new Set(mockCourses.map((c) => c.instructor))];
    const instructorData = instructors.map((inst) => {
      const courseIds = mockCourses.filter((c) => c.instructor === inst).map((c) => c.id);
      const reviewsCount = mockReviews.filter((r) => courseIds.includes(r.courseId)).length;
      return { inst, reviewsCount };
    });

    const positive = mockReviews.filter((r) => r.sentimentScore > 0.6).length;
    const neutral = mockReviews.filter((r) => r.sentimentScore >= 0.4 && r.sentimentScore <= 0.6).length;
    const negative = mockReviews.filter((r) => r.sentimentScore < 0.4).length;

    setInitialAnalytics({
      departmentWise: {
        labels: departments,
        datasets: [
          {
            label: "Total Reviews",
            data: deptData.map((d) => d.reviewsCount),
            backgroundColor: "#3B82F6",
          },
        ],
      },
      instructorWise: {
        labels: instructors,
        datasets: [
          {
            label: "Total Reviews",
            data: instructorData.map((i) => i.reviewsCount),
            backgroundColor: "#10B981",
          },
        ],
      },
      overallSentiment: {
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [
          {
            label: "Overall Sentiment",
            data: [positive, neutral, negative],
            backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
          },
        ],
      },
    });
  }, []);
  useEffect(() => {
    let filtered = mockCourses;
    if (selectedDepartment) {
      filtered = filtered.filter((c) => c.department === selectedDepartment);
    }
    if (selectedInstructor) {
      filtered = filtered.filter((c) => c.instructor === selectedInstructor);
    }
    setFilteredCourses(filtered);
    let selectedReviews = [];
    if (selectedCourse) {
      selectedReviews = mockReviews.filter((r) => r.courseId === selectedCourse);
    } else if (filtered.length > 0) {
      const courseIds = filtered.map((c) => c.id);
      selectedReviews = mockReviews.filter((r) => courseIds.includes(r.courseId));
    }
    if (selectedReviews.length > 0) {
      const positive = selectedReviews.filter((r) => r.sentimentScore > 0.6).length;
      const neutral = selectedReviews.filter((r) => r.sentimentScore >= 0.4 && r.sentimentScore <= 0.6).length;
      const negative = selectedReviews.filter((r) => r.sentimentScore < 0.4).length;
      const averageRating = (
        selectedReviews.reduce((sum, r) => sum + r.rating, 0) / selectedReviews.length
      ).toFixed(1);
      setAnalyticsData({
        totalReviews: selectedReviews.length,
        sentimentData: {
          labels: ["Positive", "Neutral", "Negative"],
          datasets: [
            {
              label: "Sentiment Analysis",
              data: [positive, neutral, negative],
              backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
            },
          ],
        },
        averageRating,
      });
    } else {
      setAnalyticsData(null);
    }
  }, [selectedDepartment, selectedInstructor, selectedCourse]);
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          {[...new Set(mockCourses.map((c) => c.department))].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedInstructor}
          onChange={(e) => setSelectedInstructor(e.target.value)}
        >
          <option value="">Select Instructor</option>
          {[...new Set(mockCourses.map((c) => c.instructor))].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {filteredCourses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>
      {!selectedDepartment && !selectedInstructor && !selectedCourse && initialAnalytics && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Department-wise Review Count</h2>
            <Bar data={initialAnalytics.departmentWise} />
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Instructor-wise Review Count</h2>
            <Bar data={initialAnalytics.instructorWise} />
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Overall Sentiment Distribution</h2>
            <Pie data={initialAnalytics.overallSentiment} />
          </div>
        </div>
      )}
      {analyticsData && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold mb-4">Filtered Analytics</h2>
          <p className="text-lg mb-4">Average Rating: {analyticsData.averageRating}</p>
          <Pie data={analyticsData.sentimentData} />
        </div>
      )}
      {!analyticsData && (selectedDepartment || selectedInstructor || selectedCourse) && (
        <p className="text-gray-500 mt-4">No analytics found for the selected filters.</p>
      )}
    </div>
  );
};
export default StudentDashboard;
