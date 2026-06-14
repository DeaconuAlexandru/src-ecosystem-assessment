export default function StateCard({ type = 'info', title, message, actions, icon }) {
  return (
    <div className={`state-card ${type}`}>
      <div className="state-card-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="state-card-copy">
        <h4>{title}</h4>
        <p>{message}</p>
        {actions ? <div className="state-card-actions">{actions}</div> : null}
      </div>
    </div>
  );
}
