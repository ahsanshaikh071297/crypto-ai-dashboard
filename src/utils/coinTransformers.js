import {
  formatCurrency,
  formatLargeNumber,
  formatPercentage,
  formatDateLabel,
  formatShortTime,
} from './formatters';

export const transformCoinSnapshot = (coin) => {
  if (!coin) return null;

  return {
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    image: coin.image,
    currentPrice: formatCurrency(coin.current_price),
    rawCurrentPrice: coin.current_price,
    change24h: formatPercentage(coin.price_change_percentage_24h || 0),
    rawChange24h: coin.price_change_percentage_24h || 0,
    marketCap: formatLargeNumber(coin.market_cap),
    rawMarketCap: coin.market_cap,
    volume24h: formatLargeNumber(coin.total_volume),
    rawVolume24h: coin.total_volume,
    circulatingSupply: coin.circulating_supply
      ? `${(coin.circulating_supply / 1_000_000).toFixed(2)}M ${coin.symbol.toUpperCase()}`
      : '-',
    rawCirculatingSupply: coin.circulating_supply,
  };
};

export const transformMarketChartData = (chartResponse, days = 7) => {
  const prices = chartResponse?.prices || [];
  const volumes = chartResponse?.total_volumes || [];
  const marketCaps = chartResponse?.market_caps || [];

  const isIntraday = Number(days) <= 2;

  return prices.map((item, index) => ({
    timestamp: item[0],
    label: isIntraday ? formatShortTime(item[0]) : formatDateLabel(item[0]),
    price: Number(item[1].toFixed(2)),
    volume: volumes[index] ? Number(volumes[index][1].toFixed(2)) : 0,
    marketCap: marketCaps[index] ? Number(marketCaps[index][1].toFixed(2)) : 0,
  }));
};

export const buildCoinStatsGrid = (snapshot, chartData = []) => {
  if (!snapshot) return [];

  const firstPrice = chartData[0]?.price || 0;
  const lastPrice = chartData[chartData.length - 1]?.price || 0;
  const rangeChange =
    firstPrice && lastPrice ? ((lastPrice - firstPrice) / firstPrice) * 100 : 0;

  return [
    {
      title: 'Market Cap',
      value: snapshot.marketCap,
      change: 'Current total market value',
    },
    {
      title: '24h Volume',
      value: snapshot.volume24h,
      change: 'Current 24-hour traded volume',
    },
    {
      title: 'Circulating Supply',
      value: snapshot.circulatingSupply,
      change: 'Coins currently circulating',
    },
    {
      title: 'Selected Range',
      value: formatPercentage(rangeChange),
      change: 'Price movement over selected chart range',
    },
  ];
};