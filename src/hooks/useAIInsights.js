import { useState } from 'react';
import { generateAIResponse } from '../services/api/geminiApi';
import {
  buildCoinAnalysisPrompt,
  buildDashboardAnalysisPrompt,
} from '../utils/aiPromptBuilder';

function useAIInsights() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');

  const askAI = async ({
    coinSnapshot,
    chartData,
    stats,
    moversData,
    trendingCoins,
    action = 'analyze',
    userQuestion = '',
    mode = 'coin',
  }) => {
    try {
      setLoading(true);
      setError('');
      setResponse('');

      let prompt = '';

      if (mode === 'coin') {
        prompt = buildCoinAnalysisPrompt({
          coinSnapshot,
          chartData,
          action,
          userQuestion,
        });
      }

      if (mode === 'dashboard') {
        prompt = buildDashboardAnalysisPrompt({
          stats,
          moversData,
          trendingCoins,
          action,
        });
      }

      const aiText = await generateAIResponse(prompt);
      setResponse(aiText);
    } catch (err) {
      setError(err.message || 'Failed to get AI response');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    response,
    askAI,
    setResponse,
  };
}

export default useAIInsights;