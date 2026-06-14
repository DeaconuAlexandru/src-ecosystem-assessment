import { dashboardStats, recentTransactions } from '../data/mockData';
import { formatCompactNumber } from '../utils/formatters';
import SectionTitle from '../components/SectionTitle';
import StatCard from '../components/StatCard';
import TransactionsTable from '../components/TransactionsTable';

export default function DashboardTask() {
  return (
    <div className="task-layout dashboard-task">
      <aside className="task-inner-sidebar">
        <div>
          <p className="eyebrow">Dashboard UI</p>
          <h4>Sidebar navigation</h4>
        </div>

        <nav className="inner-nav" aria-label="Dashboard navigation">
          <a href="#dashboard-home" className="inner-nav-item active">Overview</a>
          <a href="#dashboard-transactions" className="inner-nav-item">Transactions</a>
          <a href="#dashboard-wallets" className="inner-nav-item">Wallets</a>
          <a href="#dashboard-settings" className="inner-nav-item">Settings</a>
        </nav>

        <div className="inner-sidebar-card">
          <p className="eyebrow">Design focus</p>
          <strong>Clean UI, reusable components, and mobile behavior.</strong>
        </div>
      </aside>

      <section className="task-main" id="dashboard-home">
        <div className="dashboard-top">
          <div>
            <p className="eyebrow">Top navigation bar</p>
            <h4>Operations dashboard</h4>
          </div>

          <div className="dashboard-top-actions">
            <button type="button" className="ghost-button">Export</button>
            <button type="button" className="primary-button">New payment</button>
          </div>
        </div>

        <div className="stats-grid">
          {dashboardStats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={formatCompactNumber(stat.value)}
              delta={stat.delta}
            />
          ))}
        </div>

        <div className="dashboard-content-grid">
          <section className="panel" id="dashboard-wallets">
            <SectionTitle
              eyebrow="Product thinking"
              title="Platform highlights"
              description="A compact dashboard that stays readable on desktop and collapses nicely on mobile."
            />

            <div className="feature-list">
              <div className="feature-card">
                <span>01</span>
                <strong>Signal-first metrics</strong>
                <p>Three core KPIs keep the interface focused and easy to scan.</p>
              </div>
              <div className="feature-card">
                <span>02</span>
                <strong>Reusable building blocks</strong>
                <p>Cards, pills, nav items, and table rows can be reused across the platform.</p>
              </div>
              <div className="feature-card">
                <span>03</span>
                <strong>Responsive layout</strong>
                <p>The sidebar, nav, cards, and table stack cleanly on smaller screens.</p>
              </div>
            </div>
          </section>

          <div id="dashboard-transactions">
            <TransactionsTable rows={recentTransactions} />
          </div>
        </div>
      </section>
    </div>
  );
}
