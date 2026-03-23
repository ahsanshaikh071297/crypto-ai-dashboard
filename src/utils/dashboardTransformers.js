import { formatLargeNumber, formatPercentage, formatCurrency } from './formatters';

export const transformGlobalStats = (globalResponse, topCoins = []) => {
  const data = globalResponse?.data;

  if (!data) return [];

  const topGainer = [...topCoins]
    .sort(
      (a, b) =>
        (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
    )[0];

  return [
    {
      title: 'Global Market Cap',
      value: formatLargeNumber(data.total_market_cap?.usd),
      change: 'Live market capitalization snapshot',
    },
    {
      title: '24h Volume',
      value: formatLargeNumber(data.total_volume?.usd),
      change: 'Total traded volume in 24 hours',
    },
    {
      title: 'BTC Dominance',
      value: `${data.market_cap_percentage?.btc?.toFixed(2) || 0}%`,
      change: 'Bitcoin market share',
    },
    {
      title: 'Top Gainer',
      value: topGainer
        ? `${topGainer.symbol.toUpperCase()} ${formatPercentage(
            topGainer.price_change_percentage_24h || 0
          )}`
        : '-',
      change: topGainer ? `${topGainer.name} leads among top tracked coins` : 'No data',
    },
  ];
};

export const transformTrendingTableData = (coins = []) => {
  return coins.map((coin) => ({
    id: coin.id,
    coin: coin.name,
    symbol: coin.symbol.toUpperCase(),
    price: formatCurrency(coin.current_price),
    rawChange: coin.price_change_percentage_24h || 0,
    change: formatPercentage(coin.price_change_percentage_24h || 0),
    marketCap: formatLargeNumber(coin.market_cap),
    image: coin.image,
  }));
};

export const transformTopMoversChartData = (coins = []) => {
  return coins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    change: Number((coin.price_change_percentage_24h || 0).toFixed(2)),
  }));
};

export const transformMarketShareData = (globalResponse, coins = []) => {
  const totalMarketCap = globalResponse?.data?.total_market_cap?.usd;

  if (!totalMarketCap || !coins.length) return [];

  const topFive = coins.slice(0, 5).map((coin) => ({
    name: coin.symbol.toUpperCase(),
    value: Number(((coin.market_cap / totalMarketCap) * 100).toFixed(2)),
  }));

  const usedShare = topFive.reduce((sum, item) => sum + item.value, 0);
  const otherShare = Number((100 - usedShare).toFixed(2));

  return [...topFive, { name: 'OTHERS', value: otherShare > 0 ? otherShare : 0 }];
};