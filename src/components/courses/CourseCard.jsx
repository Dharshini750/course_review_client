import { Link } from 'react-router-dom';
import { Star, Users, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CourseCard = ({ course }) => {
  const { currentUser } = useAuth();
  const {
    id,
    title,
    code,
    department,
    instructor,
    difficulty,
    averageRating,
    totalReviews,
    description,
    prerequisites,
    credits,
    topics,
    image,
  } = course;

  const difficultyText = ['Very Easy', 'Easy', 'Moderate', 'Difficult', 'Very Difficult'][difficulty - 1];
  const difficultyColor = ['bg-green-100 text-green-800', 'bg-green-50 text-green-600', 'bg-yellow-100 text-yellow-800', 'bg-orange-100 text-orange-800', 'bg-red-100 text-red-800'][difficulty - 1];

  const renderStars = (rating) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-48 bg-gray-200">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <BookOpen className="h-16 w-16 text-white opacity-75" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium">
          {code}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 truncate">{title}</h3>
          {renderStars(averageRating)}
        </div>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {department}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor}`}>
            {difficultyText}
          </span>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          <p><strong>Instructor:</strong> {instructor}</p>
          <p><strong>Credits:</strong> {credits}</p>
          <p><strong>Prerequisites:</strong> {prerequisites.length > 0 ? prerequisites.join(', ') : 'None'}</p>
          <p><strong>Topics Covered:</strong> {topics.length > 0 ? topics.join(', ') : 'N/A'}</p>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{totalReviews} reviews</span>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <Link to={`/courses/${id}/reviews`} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm">
            View Reviews
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
