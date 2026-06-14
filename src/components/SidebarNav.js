export default function SidebarNav({ items, activeId, onSelect }) {
  return (
    <aside className="app-sidebar">
      <div className="brand-lockup">
        <div className="brand-mark">SRC</div>
        <div>
          <p className="eyebrow">Frontend/UI-UX Assessment</p>
          <h1>SRC Ecosystem</h1>
        </div>
      </div>

      <nav className="task-nav" aria-label="Assessment task navigation">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`task-nav-item ${activeId === item.id ? 'active' : ''}`}
            onClick={() => onSelect(item.id)}
          >
            <span className="task-nav-label">{item.label}</span>
            <span className="task-nav-description">{item.description}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="eyebrow">Submission ready</p>
        <p>GitHub repo • README • Loom walkthrough</p>
      </div>
    </aside>
  );
}
