import React from 'react';

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
  type?: 'success' | 'error' | 'info' | 'warning';
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  title,
  message,
  buttonText = 'OK',
  onClose,
  type = 'info',
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      case 'warning':
        return 'alert-warning';
      default:
        return 'alert-info';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content alert-modal ${getTypeClass()}`} onClick={(e) => e.stopPropagation()}>
        <div className="alert-modal-header">
          <span className="alert-icon">{getIcon()}</span>
          <h3>{title}</h3>
        </div>
        <div className="alert-modal-body">
          <p>{message}</p>
        </div>
        <div className="alert-modal-actions">
          <button className="btn-primary" onClick={onClose}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;

