export default function StatCard({ label, value, delta, trend = 'up' }) {
  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <p>{label}</p>
        <span className={`trend-badge ${trend}`}>{delta}</span>
      </div>
      <h3>{value}</h3>
    </article>
  );
}
