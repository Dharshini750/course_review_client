import { useState, useEffect } from 'react';
import { mockInstructors } from '../../data/mockdata';
import { getSentiment } from '../../utils/sentimentAnalysis'; // Sentiment analysis function
import { Pie } from 'react-chartjs-2'; // ChartJS Pie chart
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const InstructorDashboard = () => {
  const [instructorSentiments, setInstructorSentiments] = useState([]);

  useEffect(() => {
    let instructorSentimentResults = [];
    mockInstructors.forEach(instructor => {
      const sentimentScores = instructor.ratings.map((rating) => getSentiment(rating.review));
      const positiveReviews = sentimentScores.filter(sentiment => sentiment === 'Positive').length;
      const negativeReviews = sentimentScores.filter(sentiment => sentiment === 'Negative').length;
      const neutralReviews = sentimentScores.filter(sentiment => sentiment === 'Neutral').length;
      let overallInstructorSentiment;
      if (positiveReviews > negativeReviews && positiveReviews > neutralReviews) {
        overallInstructorSentiment = 'Positive';
      } else if (negativeReviews > positiveReviews && negativeReviews > neutralReviews) {
        overallInstructorSentiment = 'Negative';
      } else {
        overallInstructorSentiment = 'Neutral';
      }
      instructorSentimentResults.push({
        instructorId: instructor.id,
        name: instructor.name,
        sentiment: overallInstructorSentiment,
        positiveReviews,
        negativeReviews,
        neutralReviews,
      });
    });

    setInstructorSentiments(instructorSentimentResults);
  }, []);
  const generateInstructorSentimentData = (instructorSentiment) => {
    return {
      labels: ['Positive', 'Negative', 'Neutral'],
      datasets: [
        {
          data: [
            instructorSentiment.positiveReviews,
            instructorSentiment.negativeReviews,
            instructorSentiment.neutralReviews
          ],
          backgroundColor: ['#4CAF50', '#F44336', '#FFEB3B'],
          borderColor: ['#388E3C', '#D32F2F', '#FBC02D'],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Instructor Dashboard</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Instructor Sentiment Analysis</h2>
          {instructorSentiments.map((instructor) => (
            <div key={instructor.instructorId} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800">{instructor.name}</h3>
              <p className={`mt-2 text-lg font-medium ${instructor.sentiment === 'Positive' ? 'text-green-500' : instructor.sentiment === 'Negative' ? 'text-red-500' : 'text-yellow-500'}`}>
                Sentiment: {instructor.sentiment}
              </p>

              <div className="mt-4">
                <Pie 
                  data={generateInstructorSentimentData(instructor)} 
                  options={{ responsive: true }} 
                  key={instructor.instructorId}  
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
