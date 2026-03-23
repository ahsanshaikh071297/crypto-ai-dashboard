function InfoCard({ title, value, change, icon }) {
  return (
    <div className="info-card">
      <div className="info-card-top">
        <div>
          <p className="info-card-title">{title}</p>
          <h3 className="info-card-value">{value}</h3>
        </div>

        {icon && <div className="info-card-icon">{icon}</div>}
      </div>

      {change && <p className="info-card-change">{change}</p>}
    </div>
  );
}

export default InfoCard;