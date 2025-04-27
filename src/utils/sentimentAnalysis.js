export const getSentiment = (text) => {
   const positiveWords = ['good', 'excellent', 'great', 'amazing', 'positive', 'outstanding'];
    const negativeWords = ['bad', 'poor', 'terrible', 'negative', 'awful', 'horrible'];
    let sentimentScore = 0;
    positiveWords.forEach((word) => {
      if (text.toLowerCase().includes(word)) {
        sentimentScore += 1;
      }
    });
    negativeWords.forEach((word) => {
      if (text.toLowerCase().includes(word)) {
        sentimentScore -= 1;
      }
    });
    if (sentimentScore > 0) {
      return 'Positive';
    } else if (sentimentScore < 0) {
      return 'Negative';
    } else {
      return 'Neutral';
    }
  };
  