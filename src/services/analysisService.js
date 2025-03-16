import _ from 'lodash';

export const analyzePerformance = (historicalData, currentSubmission, quizData) => {
 
  const allSubmissions = [currentSubmission, ...historicalData];
  
  const topicStats = {};
  const quizMap = new Map();

 
if (quizData?.quiz) {
  quizMap.set(
    quizData.quiz.id,
    quizData.quiz.questions || [] 
  );
}

  allSubmissions.forEach(sub => {
    const questions = quizMap.get(sub.quiz_id) || [];
    
    questions.forEach(question => {
      const topic = _.trim(question.topic) || 'Unknown';
      const userAnswer = sub.response_map[question.id];
      const correctOption = question.options.find(opt => opt.is_correct);
      
      if (!correctOption) return;  
      
      _.defaults(topicStats, { [topic]: { correct: 0, total: 0 } });
      
      topicStats[topic].total++;
      if (userAnswer === correctOption.id) topicStats[topic].correct++;
    });
  });

   
  const weakAreas = _.pickBy(
    _.mapValues(topicStats, stats => ({
      accuracy: (stats.correct / stats.total) * 100,
      weak: (stats.correct / stats.total) < 0.65
    })), 
    stats => stats.weak
  );

  return {
    weak_areas: weakAreas,
    average_accuracy: _.round(
      _.meanBy(allSubmissions, 'accuracy'),
      2
    ),
    performance_trend: allSubmissions.map(sub => ({
      date: sub.submitted_at,
      score: sub.score,
      accuracy: sub.accuracy
    }))
  };
};

export const predictRank = (submissions) => {
  const avgScore = _.meanBy(submissions, 'score');
  return {rank:Math.round((720 - avgScore) * 1000 +1),
    avgScore
  };

};