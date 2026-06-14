export default function TopBar({ title, subtitle, actions }) {
  return (
    <header className="top-bar">
      <div>
        <p className="eyebrow">SRC Ecosystem</p>
        <h2>{title}</h2>
        <p className="top-bar-subtitle">{subtitle}</p>
      </div>

      <div className="top-bar-actions">{actions}</div>
    </header>
  );
}
