import { useEffect, useMemo, useState } from 'react';
import './App.css';

import SidebarNav from './components/SidebarNav';
import TopBar from './components/TopBar';
import DashboardTask from './pages/DashboardTask';
import OnboardingTask from './pages/OnboardingTask';
import ApiTask from './pages/ApiTask';
import TransactionTask from './pages/TransactionTask';
import { dashboardSummaryPills, sidebarItems } from './data/mockData';

const taskViews = {
  dashboard: DashboardTask,
  onboarding: OnboardingTask,
  api: ApiTask,
  transaction: TransactionTask,
};

function App() {
  const [activeTask, setActiveTask] = useState('dashboard');

  useEffect(() => {
    document.title = 'SRC Ecosystem • Frontend Assessment';
  }, []);

  const ActiveView = taskViews[activeTask];

  const headerActions = useMemo(
    () => (
      <>
        {dashboardSummaryPills.map((pill) => (
          <span key={pill.label} className="summary-pill">
            <strong>{pill.label}</strong>
            <small>{pill.value}</small>
          </span>
        ))}
      </>
    ),
    []
  );

  return (
    <div className="app-shell">
      <SidebarNav items={sidebarItems} activeId={activeTask} onSelect={setActiveTask} />

      <div className="workspace">
        <TopBar
          title={sidebarItems.find((item) => item.id === activeTask)?.label || 'Frontend Assessment'}
          subtitle="Short, practical, real-world frontend tasks with clear UX and clean component structure."
          actions={headerActions}
        />

        <main className="workspace-main">
          <ActiveView />
        </main>
      </div>
    </div>
  );
}

export default App;
