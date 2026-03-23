import MarketStatsCards from '../components/dashboard/MarketStatsCards';
import MarketOverviewSection from '../components/dashboard/MarketOverviewSection';
import TrendingCoinsTable from '../components/dashboard/TrendingCoinsTable';
import AIMarketSummaryCard from '../components/dashboard/AIMarketSummaryCard';
import useDashboardData from '../hooks/useDashboardData';

function Dashboard() {
  const { loading, error, stats, trendingCoins, moversData, marketShareData } =
    useDashboardData();

  return (
    <div className="page-stack">
      <div className="page-heading">
        <h1>Crypto Market Dashboard</h1>
        <p>Track overall market health, movers, and AI-powered summaries.</p>
      </div>

      {loading && <p>Loading dashboard data...</p>}
      {error && <p className="negative-text">{error}</p>}

      {!loading && !error && (
        <>
          <MarketStatsCards stats={stats} />
          <MarketOverviewSection
            moversData={moversData}
            marketShareData={marketShareData}
          />
          <TrendingCoinsTable rows={trendingCoins} />
          <AIMarketSummaryCard
            stats={stats}
            moversData={moversData}
            trendingCoins={trendingCoins}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;