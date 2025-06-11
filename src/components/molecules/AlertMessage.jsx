import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { Link } from 'react-router-dom';

const AlertMessage = ({ type = 'info', message, iconName, actionButton, linkButton, title, className = '' }) => {
  let icon = '';
  let iconColorClass = '';
  let bgColorClass = '';
  let textColorClass = 'text-surface-900';
  let borderColorClass = '';

  switch (type) {
    case 'error':
      icon = iconName || 'AlertCircle';
      iconColorClass = 'text-error';
      bgColorClass = 'bg-error/5';
      borderColorClass = 'border-error/20';
      break;
    case 'success':
      icon = iconName || 'CheckCircle';
      iconColorClass = 'text-success';
      bgColorClass = 'bg-success/5';
      borderColorClass = 'border-success/20';
      break;
    case 'warning':
      icon = iconName || 'AlertTriangle';
      iconColorClass = 'text-warning';
      bgColorClass = 'bg-warning/5';
      borderColorClass = 'border-warning/20';
      break;
    case 'info':
    default:
      icon = iconName || 'Info';
      iconColorClass = 'text-primary';
      bgColorClass = 'bg-primary/5';
      borderColorClass = 'border-primary/20';
      break;
  }

  return (
    <div className={`text-center py-12 px-4 rounded-xl shadow-card ${bgColorClass} border ${borderColorClass} ${className}`}>
      <ApperIcon name={icon} className={`w-12 h-12 ${iconColorClass} mx-auto mb-4`} />
      {title && <h3 className={`text-lg font-medium ${textColorClass} mb-2`}>{title}</h3>}
      <p className="text-surface-500 mb-4">{message}</p>
      {actionButton && (
        <Button
          onClick={actionButton.onClick}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          {actionButton.label}
        </Button>
      )}
      {linkButton && (
        <Link
          to={linkButton.to}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          {linkButton.label}
        </Link>
      )}
    </div>
  );
};

export default AlertMessage;