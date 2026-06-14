import { useEffect } from 'react';

export default function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    if (open) document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Blockchain payment flow</p>
            <h3 id="modal-title">{title}</h3>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
