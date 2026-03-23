import SectionTitle from '../common/SectionTitle';

function TrendingCoinsTable({ rows = [] }) {
  return (
    <div className="panel-card">
      <SectionTitle
        title="Trending Coins"
        subtitle="Top market movers and current pricing snapshot"
      />

      <div className="table-wrap">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Coin</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id}>
                <td>{item.coin}</td>
                <td>{item.symbol}</td>
                <td>{item.price}</td>
                <td className={item.rawChange >= 0 ? 'positive-text' : 'negative-text'}>
                  {item.change}
                </td>
                <td>{item.marketCap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TrendingCoinsTable;