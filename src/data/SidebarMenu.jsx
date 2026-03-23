import {
  FaChartPie,
  FaBitcoin,
  FaBalanceScale,
  FaRobot,
} from 'react-icons/fa';

export const sidebarMenu = [
  {
    title: 'Dashboard',
    path: '/',
    icon: FaChartPie,
  },
  {
    title: 'Coin Details',
    path: '/coin-details/bitcoin',
    icon: FaBitcoin,
  },
  {
    title: 'Compare Coins',
    path: '/compare-coins',
    icon: FaBalanceScale,
  },
  {
    title: 'AI Insights',
    path: '/ai-insights',
    icon: FaRobot,
  },
];