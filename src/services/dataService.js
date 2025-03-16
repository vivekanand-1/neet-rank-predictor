import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const API_ENDPOINTS = {
  QUIZ_DATA:process.env.QUIZ_ENDPOINT,
  HISTORICAL_DATA:process.env.HISTORICAL_ENDPOINT,
  CURRENT_SUBMISSION:process.env.QUIZ_SUBMISSION_ENDPOINT
};

export const getQuizData = async () => {
  const { data } = await axios.get(API_ENDPOINTS.QUIZ_DATA);
  return data;
};

export const getHistoricalData = async () => {
  const { data } = await axios.get(API_ENDPOINTS.HISTORICAL_DATA);
  
 
  return data
    .map(sub => ({
      ...sub,
      accuracy: parseFloat(sub.accuracy) || 0
    }))
    .slice(0, 5);  
};

export const getCurrentSubmission = async () => {
  const { data } = await axios.get(API_ENDPOINTS.CURRENT_SUBMISSION);
  return {
    ...data,
    accuracy: parseFloat(data.accuracy) || 0
  };
};