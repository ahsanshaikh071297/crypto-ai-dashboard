import InfoCard from '../common/InfoCard';

function CoinStatsGrid({ stats = [] }) {
  return (
    <div className="stats-grid">
      {stats.map((item) => (
        <InfoCard
          key={item.title}
          title={item.title}
          value={item.value}
          change={item.change}
        />
      ))}
    </div>
  );
}

export default CoinStatsGrid;