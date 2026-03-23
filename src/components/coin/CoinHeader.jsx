function CoinHeader({ coinSnapshot }) {
  if (!coinSnapshot) return null;

  return (
    <div className="coin-header panel-card">
      <div className="coin-header-left">
        <img
          src={coinSnapshot.image}
          alt={coinSnapshot.name}
          className="coin-image"
        />
        <div>
          <h1 className="coin-title">
            {coinSnapshot.name} ({coinSnapshot.symbol})
          </h1>
          <p className="coin-subtitle">
            Detailed market performance and AI-driven insights
          </p>
        </div>
      </div>

      <div className="coin-header-right">
        <h2>{coinSnapshot.currentPrice}</h2>
        <p
          className={
            coinSnapshot.rawChange24h >= 0 ? 'positive-text' : 'negative-text'
          }
        >
          {coinSnapshot.change24h} in the last 24 hours
        </p>
      </div>
    </div>
  );
}

export default CoinHeader;