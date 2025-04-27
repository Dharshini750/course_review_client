import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useReview } from '../context/ReviewContext';
import { ArrowLeft } from 'lucide-react';

const AddReviewPage = () => {
  const { courseId } = useParams();
  const { setReviews } = useReview();
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now().toString(),
      courseId,
      userName: "Guest User",
      userEmail: "guest@example.com",
      content: reviewContent,
      rating: reviewRating,
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [...prev, newReview]);
    navigate(`/courses/${courseId}/reviews`);
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            to={`/courses/${courseId}/reviews`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Reviews
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Your Review</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Your Review</label>
            <textarea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              required
              rows="4"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Rating (1 to 5)</label>
            <select
              value={reviewRating}
              onChange={(e) => setReviewRating(parseInt(e.target.value))}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReviewPage;
