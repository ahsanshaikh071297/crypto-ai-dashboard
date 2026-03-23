import InfoCard from '../common/InfoCard';
import { FaGlobe, FaChartLine, FaBitcoin, FaArrowTrendUp } from 'react-icons/fa6';

const iconsMap = {
  'Global Market Cap': <FaGlobe />,
  '24h Volume': <FaChartLine />,
  'BTC Dominance': <FaBitcoin />,
  'Top Gainer': <FaArrowTrendUp />,
};

function MarketStatsCards({ stats = [] }) {
  return (
    <div className="stats-grid">
      {stats.map((item) => (
        <InfoCard
          key={item.title}
          title={item.title}
          value={item.value}
          change={item.change}
          icon={iconsMap[item.title]}
        />
      ))}
    </div>
  );
}

export default MarketStatsCards;