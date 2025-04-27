import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockCourses, mockReviews } from '../data/mockdata';
import { ArrowLeft } from 'lucide-react';

const ReviewPage = () => {
  const { courseId } = useParams();
  const course = mockCourses.find((c) => c.id === courseId);
  const courseReviews = Array.isArray(mockReviews) ? mockReviews.filter((review) => review.courseId === courseId) : [];

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
        <Link
          to="/courses"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            to="/courses"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Courses
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title} - Reviews</h1>
        <p className="text-gray-600 mb-8">{course.description}</p>
        {courseReviews.length > 0 ? (
          <div className="space-y-4">
            {courseReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{review.userName || review.userEmail}</h3>
                  <span className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700">{review.content}</p>
                <div className="mt-2 text-sm text-gray-600">
                  <strong>Rating:</strong> {review.rating}/5
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-600">Be the first to review this course!</p>
          </div>
        )}
       
      </div>
    </div>
  );
};

export default ReviewPage;
