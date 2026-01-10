import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'info',
}) => {
  if (!isOpen) return null;

  const getButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'btn-danger';
      case 'warning':
        return 'btn-warning';
      default:
        return 'btn-primary';
    }
  };

  const getDefaultConfirmText = () => {
    if (confirmText) return confirmText;
    switch (type) {
      case 'danger':
        return 'Delete';
      case 'warning':
        return 'Continue';
      default:
        return 'Confirm';
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-modal-header">
          <h3>{title}</h3>
        </div>
        <div className="confirm-modal-body">
          <p>{message}</p>
        </div>
        <div className="confirm-modal-actions">
          <button className="btn-secondary" onClick={onCancel}>
            {cancelText}
          </button>
          <button className={getButtonClass()} onClick={onConfirm}>
            {getDefaultConfirmText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

