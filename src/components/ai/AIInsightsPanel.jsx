import { useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import useAIInsights from '../../hooks/useAIInsights';

function AIInsightsPanel({ coinSnapshot, chartData }) {
  const [question, setQuestion] = useState('');
  const { loading, error, response, askAI } = useAIInsights();

  const handlePresetAction = (action) => {
    askAI({ coinSnapshot, chartData, action });
  };

  const handleAskAI = () => {
    if (!question.trim()) return;

    askAI({
      coinSnapshot,
      chartData,
      action: 'chat',
      userQuestion: question,
    });
  };

  return (
    <div className="ai-panel panel-card">
      <SectionTitle
        title="AI Insights"
        subtitle="Understand what the chart is saying"
      />

      <div className="ai-action-buttons">
        <button className="primary-btn" onClick={() => handlePresetAction('analyze')}>
          Analyze Trend
        </button>
        <button className="secondary-btn" onClick={() => handlePresetAction('summarize')}>
          Summarize
        </button>
        <button className="secondary-btn" onClick={() => handlePresetAction('dip')}>
          Explain Dip
        </button>
        <button className="secondary-btn" onClick={() => handlePresetAction('compare')}>
          Investor View
        </button>
      </div>

      <div className="ai-response-preview">
        <h4>Insight Summary</h4>

        {loading && <p>Generating AI insight...</p>}
        {error && <p className="negative-text">{error}</p>}
        {!loading && !error && (
          <p>
            {response ||
              'Click any AI action above to get real Gemini-powered analysis for this chart.'}
          </p>
        )}
      </div>

      <div className="ai-chat-box">
        <input
          type="text"
          placeholder="Ask about this chart..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className="primary-btn" onClick={handleAskAI}>
          Ask AI
        </button>
      </div>
    </div>
  );
}

export default AIInsightsPanel;