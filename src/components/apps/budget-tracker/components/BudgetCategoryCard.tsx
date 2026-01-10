import React from 'react';
import type { CategorySpending, Category } from '../types';
import { formatCurrency } from '../utils';

interface BudgetCategoryCardProps {
  categorySpending: CategorySpending;
  category: Category | undefined;
  isEditing: boolean;
  editValue: string;
  onEditValueChange: (value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const BudgetCategoryCard: React.FC<BudgetCategoryCardProps> = ({
  categorySpending,
  category,
  isEditing,
  editValue,
  onEditValueChange,
  onEdit,
  onSave,
  onCancel,
}) => {
  const percentage = categorySpending.percentageUsed;
  const isOverBudget = percentage > 100;
  const isNearBudget = percentage >= 80 && percentage <= 100;

  return (
    <div className="budget-category-card">
      <div className="category-header">
        <div
          className="category-color"
          style={{ backgroundColor: category?.color || '#6b7280' }}
        />
        <h3>{categorySpending.categoryName}</h3>
      </div>

      <div className="budget-stats">
        {isEditing ? (
          <div className="edit-budget">
            <input
              type="text"
              value={editValue}
              onChange={(e) => onEditValueChange(e.target.value)}
              placeholder="0.00"
              autoFocus
            />
            <div className="edit-actions">
              <button className="btn-small btn-primary" onClick={onSave}>
                Save
              </button>
              <button className="btn-small btn-secondary" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="budget-amount">
              <span className="label">Budget:</span>
              <span className="value">{formatCurrency(categorySpending.budgetCents)}</span>
              <button className="edit-btn" onClick={onEdit} aria-label="Edit budget">
                ✏️
              </button>
            </div>
            <div className="spent-amount">
              <span className="label">Spent:</span>
              <span className={`value ${isOverBudget ? 'over' : ''}`}>
                {formatCurrency(categorySpending.spentCents)}
              </span>
            </div>
            <div className="remaining-amount">
              <span className="label">Remaining:</span>
              <span className={`value ${categorySpending.remainingCents < 0 ? 'over' : ''}`}>
                {formatCurrency(categorySpending.remainingCents)}
              </span>
            </div>
            <div className="percentage">
              {percentage.toFixed(1)}% used
            </div>
          </>
        )}
      </div>

      <div className="progress-bar-container">
        <div
          className={`progress-bar ${isOverBudget ? 'over' : isNearBudget ? 'warning' : ''}`}
          style={{ width: `${Math.min(100, percentage)}%` }}
        />
      </div>

      {isOverBudget && (
        <div className="alert-badge">Over Budget!</div>
      )}
      {isNearBudget && !isOverBudget && (
        <div className="warning-badge">Near Limit</div>
      )}
    </div>
  );
};

export default BudgetCategoryCard;

