import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockCourses, mockReviews } from '../data/mockdata';
import { useAuth } from './AuthContext';

const CourseContext = createContext();
export const useCourses = () => useContext(CourseContext);
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    setCourses(mockCourses);
    setReviews(mockReviews);
    setLoading(false);
  }, []);
  const getCourse = (id) => {
    return courses.find(course => course.id === id);
  };
  const getCourseReviews = (courseId) => {
    return reviews.filter(review => review.courseId === courseId);
  };
  const addReview = (reviewData) => {
    setError(null);
    try {
      const newReview = {
        id: `review-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        createdAt: new Date().toISOString(),
        ...reviewData
      };
      const sentimentScore = calculateSentimentScore(reviewData.content);
      newReview.sentimentScore = sentimentScore;
      setReviews([...reviews, newReview]);
      return true;
    } catch (error) {
      setError('Failed to add review. Please try again.');
      return false;
    }
  };
  const calculateSentimentScore = (text) => {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'helpful', 'best', 'love', 'enjoyed', 'clear', 'interesting'];
    const negativeWords = ['bad', 'poor', 'terrible', 'worst', 'difficult', 'confusing', 'boring', 'waste', 'hard', 'unclear'];
    const lowerText = text.toLowerCase();
    let score = 0.5; 
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) score += 0.1;
    });
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) score -= 0.1;
    });
    return Math.max(0, Math.min(1, score));
  };
  const getRecommendations = () => {
    if (!currentUser) return [];
    const userReviews = reviews.filter(review => review.userId === currentUser.id);
    const userRatedCourseIds = userReviews.map(review => review.courseId);
    const userDepartments = new Set();
    userReviews.forEach(review => {
      const course = courses.find(c => c.id === review.courseId);
      if (course) userDepartments.add(course.department);
    });
    let recommendations = courses
      .filter(course => 
        !userRatedCourseIds.includes(course.id) && 
        (userDepartments.size === 0 || userDepartments.has(course.department))
      )
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 6);
    
    return recommendations;
  };
  const filterCourses = (filters) => {
    let filteredCourses = [...courses];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredCourses = filteredCourses.filter(
        course => 
          course.title.toLowerCase().includes(searchLower) ||
          course.code.toLowerCase().includes(searchLower) ||
          course.instructor.toLowerCase().includes(searchLower)
      );
    }
    if (filters.department) {
      filteredCourses = filteredCourses.filter(
        course => course.department === filters.department
      );
    }
    if (filters.instructor) {
      filteredCourses = filteredCourses.filter(
        course => course.instructor === filters.instructor
      );
    }
    if (filters.difficulty) {
      filteredCourses = filteredCourses.filter(
        course => course.difficulty === filters.difficulty
      );
    }
    return filteredCourses;
  };
  const value = {
    courses,
    reviews,
    loading,
    error,
    getCourse,
    getCourseReviews,
    addReview,
    getRecommendations,
    filterCourses
  };
  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};
