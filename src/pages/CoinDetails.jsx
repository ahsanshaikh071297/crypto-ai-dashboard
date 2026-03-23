import { useParams } from 'react-router-dom';
import CoinHeader from '../components/coin/CoinHeader';
import CoinStatsGrid from '../components/coin/CoinStatsGrid';
import CoinChartsSection from '../components/coin/CoinChartsSection';
import AIInsightsPanel from '../components/ai/AIInsightsPanel';
import useCoinDetails from '../hooks/useCoinDetails';

function CoinDetails() {
  const { coinId } = useParams();
  const selectedCoinId = coinId || 'bitcoin';

  const { loading, error, coinSnapshot, chartData, statsGrid } =
    useCoinDetails(selectedCoinId, 7);

  return (
    <div className="page-stack">
      {loading && <p>Loading coin details...</p>}
      {error && <p className="negative-text">{error}</p>}

      {!loading && !error && coinSnapshot && (
        <>
          <CoinHeader coinSnapshot={coinSnapshot} />
          <CoinStatsGrid stats={statsGrid} />

          <div className="coin-detail-layout">
            <CoinChartsSection chartData={chartData} />
            <AIInsightsPanel
              coinSnapshot={coinSnapshot}
              chartData={chartData}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CoinDetails;