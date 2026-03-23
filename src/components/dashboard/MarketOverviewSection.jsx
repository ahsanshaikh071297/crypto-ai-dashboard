import SectionTitle from '../common/SectionTitle';
import CustomPieChart from '../charts/CustomPieChart';
import CustomBarChart from '../charts/CustomBarChart';

function MarketOverviewSection({ moversData = [], marketShareData = [] }) {
  return (
    <div className="dashboard-two-col">
      <div className="panel-card">
        <SectionTitle
          title="Market Share"
          subtitle={`Top market-cap share distribution`}
        />
        <CustomPieChart data={marketShareData} />
      </div>

      <div className="panel-card">
        <SectionTitle
          title="Top Movers"
          subtitle={`24h performance of tracked top coins`}
        />
        <CustomBarChart data={moversData} />
      </div>
    </div>
  );
}

export default MarketOverviewSection;