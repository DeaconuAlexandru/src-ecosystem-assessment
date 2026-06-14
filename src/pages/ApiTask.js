import { useEffect, useMemo, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import StateCard from '../components/StateCard';
import { sleep } from '../utils/formatters';

const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=6';

export default function ApiTask() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const load = async () => {
      try {
        setStatus('loading');
        setError('');

        await sleep(300);

        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error('Could not load data from the API.');

        const data = await response.json();
        if (cancelled) return;
        setItems(Array.isArray(data) ? data : []);
        setStatus('success');
      } catch (fetchError) {
        if (cancelled || fetchError.name === 'AbortError') return;
        setError(fetchError.message || 'Unexpected API error.');
        setStatus('error');
      }
    };

    load();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [refreshKey]);

  const filteredItems = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return items;
    return items.filter((item) => item.title.toLowerCase().includes(value) || item.body.toLowerCase().includes(value));
  }, [items, query]);

  const refresh = () => setRefreshKey((value) => value + 1);

  return (
    <div className="task-grid">
      <section className="panel">
        <SectionTitle
          eyebrow="Task 3"
          title="API Integration Challenge"
          description="Fetch data, handle async states properly, and keep the widget polished."
          actions={<button type="button" className="primary-button" onClick={refresh}>Refresh</button>}
        />

        <div className="api-toolbar">
          <label className="field search-field">
            <span>Search widget</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter the loaded content..." />
          </label>

          <div className="api-state-chip">
            <span className={`status-dot ${status}`} />
            {status === 'loading' ? 'Loading' : status === 'error' ? 'Error' : 'Loaded'}
          </div>
        </div>

        {status === 'loading' ? (
          <StateCard
            type="info"
            title="Loading dashboard data"
            message="Fetching a public API in the background. This is the kind of feedback users need."
            icon="⏳"
          />
        ) : status === 'error' ? (
          <StateCard
            type="danger"
            title="Error state"
            message={error || 'Something went wrong while loading the API.'}
            icon="🚨"
            actions={<button type="button" className="ghost-button" onClick={refresh}>Try again</button>}
          />
        ) : filteredItems.length === 0 ? (
          <StateCard
            type="neutral"
            title="Empty state"
            message="No items match the current filter. This state is intentional and useful for UX."
            icon="🫙"
            actions={<button type="button" className="ghost-button" onClick={() => setQuery('')}>Clear filter</button>}
          />
        ) : (
          <div className="api-grid">
            {filteredItems.map((item) => (
              <article key={item.id} className="api-card">
                <span className="api-card-index">{String(item.id).padStart(2, '0')}</span>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
