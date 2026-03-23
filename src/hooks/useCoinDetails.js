import { useEffect, useState } from 'react';
import {
  getCoinMarketSnapshot,
  getCoinMarketChart,
} from '../services/api/coingeckoApi';
import {
  transformCoinSnapshot,
  transformMarketChartData,
  buildCoinStatsGrid,
} from '../utils/coinTransformers';

function useCoinDetails(coinId = 'bitcoin', days = 7) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [coinSnapshot, setCoinSnapshot] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [statsGrid, setStatsGrid] = useState([]);

  useEffect(() => {
    const loadCoinDetails = async () => {
      try {
        setLoading(true);
        setError('');

        const [snapshotResponse, chartResponse] = await Promise.all([
          getCoinMarketSnapshot(coinId),
          getCoinMarketChart(coinId, days),
        ]);

        const rawCoin = snapshotResponse?.[0];
        const snapshot = transformCoinSnapshot(rawCoin);
        const transformedChartData = transformMarketChartData(chartResponse, days);

        setCoinSnapshot(snapshot);
        setChartData(transformedChartData);
        setStatsGrid(buildCoinStatsGrid(snapshot, transformedChartData));
      } catch (err) {
        setError(err.message || 'Failed to load coin details');
      } finally {
        setLoading(false);
      }
    };

    loadCoinDetails();
  }, [coinId, days]);

  return {
    loading,
    error,
    coinSnapshot,
    chartData,
    statsGrid,
  };
}

export default useCoinDetails;