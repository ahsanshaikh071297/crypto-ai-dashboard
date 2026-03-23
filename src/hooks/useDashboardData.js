import { useEffect, useState } from 'react';
import {
  getGlobalData,
  getTopCoinsMarketData,
} from '../services/api/coingeckoApi';
import {
  transformGlobalStats,
  transformTrendingTableData,
  transformTopMoversChartData,
  transformMarketShareData,
} from '../utils/dashboardTransformers';

function useDashboardData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [moversData, setMoversData] = useState([]);
  const [marketShareData, setMarketShareData] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        const [globalResponse, topCoinsResponse] = await Promise.all([
          getGlobalData(),
          getTopCoinsMarketData(1, 10),
        ]);

        setStats(transformGlobalStats(globalResponse, topCoinsResponse));
        setTrendingCoins(transformTrendingTableData(topCoinsResponse));
        setMoversData(transformTopMoversChartData(topCoinsResponse));
        setMarketShareData(
          transformMarketShareData(globalResponse, topCoinsResponse)
        );
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return {
    loading,
    error,
    stats,
    trendingCoins,
    moversData,
    marketShareData,
  };
}

export default useDashboardData;