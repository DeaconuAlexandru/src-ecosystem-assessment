import { formatCurrency } from '../utils/formatters';

const toneMap = {
  Completed: 'success',
  Pending: 'warning',
  Processing: 'neutral',
  Failed: 'danger',
};

export default function TransactionsTable({ rows }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h3>Recent Transactions</h3>
        </div>
        <span className="panel-chip">Live sample data</span>
      </div>

      <div className="table-wrap">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Channel</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td><strong>{row.id}</strong></td>
                <td>{row.customer}</td>
                <td>{formatCurrency(row.amount, 'USD')}</td>
                <td><span className={`status-pill ${toneMap[row.status] || 'neutral'}`}>{row.status}</span></td>
                <td>{row.method}</td>
                <td>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
