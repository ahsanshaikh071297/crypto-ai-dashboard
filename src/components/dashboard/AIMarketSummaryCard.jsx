import { useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import Modal from '../common/Modal';
import useAIInsights from '../../hooks/useAIInsights';

function AIMarketSummaryCard({ stats = [], moversData = [], trendingCoins = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('AI Market Insight');

  const { loading, error, response, askAI } = useAIInsights();

  const handleDashboardAI = async (action) => {
    setModalTitle(
      action === 'market' ? 'AI Market Analysis' : 'AI Top Movers Summary'
    );
    setIsModalOpen(true);

    await askAI({
      stats,
      moversData,
      trendingCoins,
      action,
      mode: 'dashboard',
    });
  };

  return (
    <>
      <div className="panel-card ai-summary-card">
        <SectionTitle
          title="AI Market Summary"
          subtitle="Quick market understanding powered by AI insights"
        />

        <div className="ai-summary-box">
          <p>
            The market is showing mild bullish momentum led by Bitcoin dominance and
            strength in large-cap altcoins. Solana is currently outperforming most
            top assets, while overall trading volume has increased compared to the
            previous session.
          </p>

          <div className="ai-summary-actions">
            <button
              className="primary-btn"
              onClick={() => handleDashboardAI('market')}
            >
              Analyze Market
            </button>

            <button
              className="secondary-btn"
              onClick={() => handleDashboardAI('movers')}
            >
              Summarize Top Movers
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        title={modalTitle}
        onClose={() => setIsModalOpen(false)}
      >
        {loading && <p>Generating AI response...</p>}
        {error && <p className="negative-text">{error}</p>}
        {!loading && !error && (
          <div>
            <p>{response || 'No AI response available yet.'}</p>
          </div>
        )}
      </Modal>
    </>
  );
}

export default AIMarketSummaryCard;