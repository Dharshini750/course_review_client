import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, BookOpen, Users, Star } from 'lucide-react';
import { useCourses } from '../../context/CourseContext';

const Hero = () => {
  const { courses, loading } = useCourses();

  const topRatedCourses = [...courses]
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 3);

  return (
    <div>
      <section className="relative bg-gradient-to-r from-teal-500 to-orange-500 text-white py-15 ">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Find Your Perfect Course with AI-Powered Recommendations
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-black">
              Make informed decisions with authentic reviews and personalized suggestions
            </p>

            <div className="bg-white rounded-lg shadow-lg p-1 max-w-2xl mx-auto flex">
              <input
                type="text"
                placeholder="Search for courses, departments, or instructors..."
                className="flex-grow px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none"
              />
              <Link
                to="/courses"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-r-lg flex items-center transition-colors"
              >
                <Search className="h-5 w-5 mr-2" />
                <span>Search</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,149.3C672,139,768,149,864,154.7C960,160,1056,160,1152,144C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Prof Finder?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 text-center transition-transform duration-300 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-6">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Recommendations</h3>
              <p className="text-gray-600">
                Our intelligent algorithm analyzes your preferences and academic history to suggest courses you'll love.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center transition-transform duration-300 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 text-teal-600 rounded-full mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Authentic Student Reviews</h3>
              <p className="text-gray-600">
                Read honest feedback from fellow students with sentiment analysis to help identify the most helpful insights.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center transition-transform duration-300 hover:-translate-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full mb-6">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Comprehensive Course Data</h3>
              <p className="text-gray-600">
                Get detailed information about course difficulty, workload, prerequisites, and learning outcomes all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Top Rated Courses</h2>
            <Link
              to="/courses"
              className="text-teal-600 hover:text-teal-800 transition-colors"
            >
              View all courses →
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topRatedCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="h-48 bg-gray-200 relative">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-teal-500 to-orange-500">
                        <BookOpen className="h-16 w-16 text-white opacity-75" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium">
                      {course.code}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <div className="flex items-center mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(course.averageRating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">
                        ({course.totalReviews} reviews)
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-teal-600 font-medium">{course.department}</span>
                      <span className="text-gray-500 text-sm">{course.instructor}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to find your perfect courses?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students making smarter academic choices with Prof Finder's AI-powered platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            
            <Link
              to="/courses"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;