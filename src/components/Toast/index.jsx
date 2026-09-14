export default function Toast({ message, type = 'success', onDismiss }) {
  return (
    <div className={`toast toast-${type}`} role="status">
      <span>{message}</span>
      <button type="button" className="toast-dismiss" onClick={onDismiss} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  );
}
