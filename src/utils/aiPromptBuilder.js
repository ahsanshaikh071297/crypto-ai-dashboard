export const buildCoinAnalysisPrompt = ({
  coinSnapshot,
  chartData,
  action = 'analyze',
  userQuestion = '',
}) => {
  if (!coinSnapshot || !chartData?.length) return '';

  const sampledData = chartData
    .filter((_, index) => index % Math.ceil(chartData.length / 12) === 0)
    .slice(0, 12)
    .map((item) => ({
      label: item.label,
      price: item.price,
      volume: item.volume,
    }));

  const prices = chartData.map((item) => item.price);
  const startPrice = prices[0];
  const endPrice = prices[prices.length - 1];
  const highestPrice = Math.max(...prices);
  const lowestPrice = Math.min(...prices);
  const rangeChange = (((endPrice - startPrice) / startPrice) * 100).toFixed(2);

  const actionInstructionMap = {
    analyze:
      'Analyze the chart trend and explain the overall movement, market behavior, and risk.',
    summarize:
      'Summarize the selected coin performance in a concise and clear way.',
    dip:
      'Explain possible reasons for the price dips and whether the recovery looks strong.',
    compare:
      'Explain how this coin is behaving and what kind of trader or investor might care about this trend.',
    chat: `Answer this user question based on the coin data and chart context: ${userQuestion}`,
  };

  return `
You are a crypto market analysis assistant.

Coin:
- Name: ${coinSnapshot.name}
- Symbol: ${coinSnapshot.symbol}
- Current Price: ${coinSnapshot.currentPrice}
- 24h Change: ${coinSnapshot.change24h}
- Market Cap: ${coinSnapshot.marketCap}
- 24h Volume: ${coinSnapshot.volume24h}

Chart Summary:
- Start Price: ${startPrice}
- End Price: ${endPrice}
- Highest Price: ${highestPrice}
- Lowest Price: ${lowestPrice}
- Range Change: ${rangeChange}%

Sampled Chart Data:
${JSON.stringify(sampledData, null, 2)}

Task:
${actionInstructionMap[action]}

Return your answer in this format:
1. Summary
2. Key Insights
3. Risk / Caution
4. Plain-English Takeaway

Keep it clear, practical, and not overly long.
`.trim();
};

export const buildDashboardAnalysisPrompt = ({
  stats = [],
  moversData = [],
  trendingCoins = [],
  action = 'market',
}) => {
  const sampledMovers = moversData.slice(0, 10);
  const sampledCoins = trendingCoins.slice(0, 5);

  const actionInstructionMap = {
    market:
      'Analyze the overall crypto market condition using the provided dashboard summary. Explain the general market mood, notable trends, and any caution points.',
    movers:
      'Summarize the top movers from the dashboard data. Highlight strongest performers, weak performers, and what this may suggest about the market.',
  };

  return `
You are a crypto market dashboard analyst.

Market Stats:
${JSON.stringify(stats, null, 2)}

Top Movers Chart Data:
${JSON.stringify(sampledMovers, null, 2)}

Trending Coins Snapshot:
${JSON.stringify(sampledCoins, null, 2)}

Task:
${actionInstructionMap[action]}

Return the answer in this format:
1. Summary
2. Key Observations
3. Risk / Caution
4. Plain-English Takeaway

Keep the response practical, clear, and not overly long.
`.trim();
};