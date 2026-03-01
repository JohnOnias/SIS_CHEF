import { useEffect } from "react";
import "./style/customModal.css";

function CustomModal({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  duration = null,
  type = "default", // error | success | warning | default
}) {
  const tempo = duration ?? null;

  useEffect(() => {
    if (!isOpen || tempo === null) return;

    const timer = setTimeout(() => {
      onClose();
    }, tempo);

    return () => clearTimeout(timer);
  }, [isOpen, onClose, tempo]);

  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className={`custom-modal ${type}`}>
        <h2>{title}</h2>
        <p>{message}</p>

        <div className="custom-modal-actions">
          {onConfirm && (
            <button className="custom-modal-confirm" onClick={onConfirm}>
              {confirmText}
            </button>
          )}

          <button className="custom-modal-cancel" onClick={onClose}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
