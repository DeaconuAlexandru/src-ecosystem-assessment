import { useState } from 'react';
import Modal from '../components/Modal';
import SectionTitle from '../components/SectionTitle';
import StateCard from '../components/StateCard';
import { transactionPreview } from '../data/mockData';
import { formatCurrency, maskWalletAddress, sleep } from '../utils/formatters';

export default function TransactionTask() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');

  const reset = () => {
    setOpen(false);
    setState('idle');
    setMessage('');
  };

  const reject = () => {
    setState('failure');
    setMessage('The user rejected the payment before the transaction was broadcast.');
  };

  const confirm = async () => {
    setState('pending');
    setMessage('Waiting for wallet confirmation and network response...');
    await sleep(1600);

    const shouldFail = Math.random() < 0.25;
    if (shouldFail) {
      setState('failure');
      setMessage('The transaction failed. The network fee was not charged.');
      return;
    }

    setState('success');
    setMessage('Transaction confirmed successfully.');
  };

  return (
    <div className="task-grid">
      <section className="panel">
        <SectionTitle
          eyebrow="Task 4"
          title="Transaction UX Mini Challenge"
          description="A modal that makes blockchain actions feel understandable and trustworthy."
          actions={<button type="button" className="primary-button" onClick={() => setOpen(true)}>Open modal</button>}
        />

        <div className="tx-preview-grid">
          <StateCard
            type="info"
            title="Amount"
            message={`${formatCurrency(transactionPreview.amount, 'USD')} ${transactionPreview.currency}`}
            icon="💸"
          />
          <StateCard
            type="info"
            title="Wallet address"
            message={maskWalletAddress(transactionPreview.walletAddress)}
            icon="👛"
          />
          <StateCard
            type="info"
            title="Network fee"
            message={`${transactionPreview.networkFee} ${transactionPreview.currency} • ${transactionPreview.network}`}
            icon="⛓️"
          />
        </div>
      </section>

      <Modal open={open} title="Confirm blockchain payment" onClose={state === 'pending' ? undefined : reset}>
        <div className="modal-body">
          <div className="modal-summary">
            <div><span>Amount</span><strong>{formatCurrency(transactionPreview.amount, 'USD')} {transactionPreview.currency}</strong></div>
            <div><span>Wallet</span><strong>{maskWalletAddress(transactionPreview.walletAddress)}</strong></div>
            <div><span>Network fee</span><strong>{transactionPreview.networkFee} {transactionPreview.currency}</strong></div>
            <div><span>Network</span><strong>{transactionPreview.network}</strong></div>
          </div>

          {state === 'idle' && (
            <StateCard
              type="info"
              title="Make it clear for non-crypto users"
              message="The user sees the amount, address, fee, and the exact network before confirming."
              icon="🛡️"
            />
          )}

          {state === 'pending' && (
            <StateCard
              type="neutral"
              title="Processing transaction"
              message="Please wait while the wallet signs and the network validates the transfer."
              icon="⏳"
            />
          )}

          {state === 'success' && <StateCard type="success" title="Success state" message={message} icon="✅" />}
          {state === 'failure' && (
            <StateCard
              type="danger"
              title="Failure state"
              message={message}
              icon="⚠️"
              actions={<button type="button" className="ghost-button" onClick={confirm} disabled={state === 'pending'}>Retry</button>}
            />
          )}

          <div className="modal-actions">
            <button type="button" className="ghost-button" onClick={reject} disabled={state === 'pending'}>
              Reject
            </button>
            <button type="button" className="primary-button" onClick={confirm} disabled={state === 'pending'}>
              {state === 'pending' ? 'Confirming…' : 'Confirm'}
            </button>
          </div>

          {(state === 'success' || state === 'failure') && (
            <button type="button" className="text-link" onClick={reset}>
              Close modal
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
}
