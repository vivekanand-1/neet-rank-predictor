import { Router } from 'express';
import { 
  getQuizData,
  getHistoricalData ,
  getCurrentSubmission
} from '../services/dataService.js';
import { 
  analyzePerformance,
  predictRank 
} from '../services/analysisService.js';

const router = Router();

router.get('/analyze', async (req, res) => {
  try {
    const [quizData, historicalData, currentSubmission] = await Promise.all([
      getQuizData(),
      getHistoricalData(),
      getCurrentSubmission()
    ]);
    
    const analysis = analyzePerformance(
      historicalData, 
      currentSubmission,
      quizData
    );
    
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
});

router.get('/predict-rank', async (req, res) => {
  try {
    const historicalData = await getHistoricalData();
    const {rank,avgScore} = predictRank(historicalData);
    res.json({ predicted_rank: rank,
      average_score: avgScore
     });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;