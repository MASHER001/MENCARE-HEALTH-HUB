export default function ConfirmationModal({ title, message, confirmText, cancelText, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirmation-modal-title">
      <div className="modal-card">
        <div className="modal-header">
          <h3 id="confirmation-modal-title">{title}</h3>
          <button type="button" className="small-btn" onClick={onCancel} aria-label="Close dialog">
            ×
          </button>
        </div>

        <p className="helper-text">{message}</p>

        <div className="form-actions" style={{ marginTop: '20px' }}>
          <button type="button" className="secondary-btn" onClick={onCancel}>
            {cancelText}
          </button>
          <button type="button" className="danger-btn" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
