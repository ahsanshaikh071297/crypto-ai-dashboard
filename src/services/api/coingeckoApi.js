const BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (API_KEY) {
    headers['x-cg-demo-api-key'] = API_KEY;
  }

  return headers;
};

const fetchFromCoinGecko = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`CoinGecko API error: ${response.status}`);
  }

  return response.json();
};

export const getGlobalData = async () => {
  return fetchFromCoinGecko('/global');
};

export const getTopCoinsMarketData = async (page = 1, perPage = 10) => {
  return fetchFromCoinGecko(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`
  );
};

export const getCoinMarketSnapshot = async (coinId = 'bitcoin') => {
  return fetchFromCoinGecko(
    `/coins/markets?vs_currency=usd&ids=${coinId}&sparkline=false`
  );
};

export const getCoinMarketChart = async (coinId = 'bitcoin', days = 7) => {
  return fetchFromCoinGecko(
    `/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  );
};

export const searchCoins = async (query) => {
  return fetchFromCoinGecko(`/search?query=${encodeURIComponent(query)}`);
};