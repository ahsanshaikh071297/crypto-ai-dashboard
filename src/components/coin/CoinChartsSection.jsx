import SectionTitle from '../common/SectionTitle';
import CustomLineChart from '../charts/CustomLineChart';
import CustomBarChart from '../charts/CustomBarChart';

function CoinChartsSection({ chartData = [] }) {
  const volumeData = chartData.map((item) => ({
    label: item.label,
    change: item.volume,
  }));

  return (
    <div className="coin-charts-column">
      <div className="panel-card">
        <SectionTitle
          title="Price Trend"
          subtitle={`Loaded ${chartData.length} chart points from CoinGecko`}
        />
        <CustomLineChart data={chartData} xKey="label" lineKey="price" />
      </div>

      <div className="panel-card">
        <SectionTitle
          title="Trading Volume"
          subtitle="Volume distribution across the selected range"
        />
        <CustomBarChart data={volumeData} xKey="label" barKey="change" />
      </div>
    </div>
  );
}

export default CoinChartsSection;