import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import CourseCard from '../components/courses/CourseCard';
import CourseFilter from '../components/courses/CourseFilter';
import { mockCourses, mockReviews } from '../data/mockdata';
import { useAuth } from '../context/AuthContext'; 

const Courses = () => {
  const { currentUser } = useAuth();
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    instructor: '',
    difficulty: '',
  });
  const [selectedCourseReviews, setSelectedCourseReviews] = useState([]);
  const [isAddCourseFormVisible, setIsAddCourseFormVisible] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    department: '',
    difficulty: '',
    instructor: currentUser?.name,
  });

  const instructorCourses = mockCourses.filter(course => course.instructor === currentUser?.name);
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleViewReviews = (courseId) => {
    const reviews = mockReviews.filter((review) => review.courseId === courseId);
    setSelectedCourseReviews(reviews);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmitCourse = (e) => {
    e.preventDefault();
    mockCourses.push({ id: mockCourses.length + 1, ...newCourse });
    setIsAddCourseFormVisible(false);
    alert('New course added successfully!');
  };

  const filteredCourses = mockCourses.filter((course) => {
    return (
      (filters.search === '' || course.title.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.department === '' || course.department === filters.department) &&
      (filters.instructor === '' || course.instructor === filters.instructor) &&
      (filters.difficulty === '' || course.difficulty === parseInt(filters.difficulty))
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
          <p className="text-gray-600 mt-2">
            Explore our wide selection of courses and find the perfect match for your academic journey.
          </p>
        </div>
        {currentUser?.role !== 'instructor' && (
          <>
            <CourseFilter
              onFilterChange={handleFilterChange}
              departments={[...new Set(mockCourses.map((course) => course.department))]}
              instructors={[...new Set(mockCourses.map((course) => course.instructor))]}
            />
          </>
        )}
        {currentUser?.role === 'instructor' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructorCourses.map((course) => (
                <div key={course.id}>
                  <CourseCard course={course}>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mt-4"
                      onClick={() => handleViewReviews(course.id)}
                    >
                      View Reviews
                    </button>
                  </CourseCard>
                </div>
              ))}
            </div>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-md mt-6"
              onClick={() => setIsAddCourseFormVisible(!isAddCourseFormVisible)}
            >
              {isAddCourseFormVisible ? 'Cancel' : 'Add New Course'}
            </button>
            {isAddCourseFormVisible && (
              <form onSubmit={handleSubmitCourse} className="bg-white p-6 mt-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Add New Course</h3>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700">Course Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newCourse.title}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700">Course Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newCourse.description}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="department" className="block text-gray-700">Department</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={newCourse.department}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="difficulty" className="block text-gray-700">Difficulty Level</label>
                  <input
                    type="number"
                    id="difficulty"
                    name="difficulty"
                    value={newCourse.difficulty}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 mt-2 border rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-md mt-4"
                >
                  Add Course
                </button>
              </form>
            )}
          </>
        ) : (
          <>
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <div key={course.id}>
                    <CourseCard course={course}>
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mt-4"
                        onClick={() => handleViewReviews(course.id)}
                      >
                        View Reviews
                      </button>
                    </CourseCard>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
              </div>
            )}
          </>
        )}
        {selectedCourseReviews.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Reviews</h3>
            {selectedCourseReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 mb-4">
                <p className="text-gray-800 font-semibold">{review.userName}</p>
                <p className="text-gray-600">{review.content}</p>
                <p className="text-sm text-gray-500">
                  <strong>Rating:</strong> {review.rating} | <strong>Difficulty:</strong> {review.difficultyRating} |{' '}
                  <strong>Workload:</strong> {review.workload}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
