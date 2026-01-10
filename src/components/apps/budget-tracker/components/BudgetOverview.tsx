import React, { useState } from 'react';
import type { MonthSummary, MonthBudget, Category } from '../types';
import { formatCurrency } from '../utils';
import BudgetCategoryCard from './BudgetCategoryCard';

interface BudgetOverviewProps {
  summary: MonthSummary;
  budget: MonthBudget | null;
  categories: Category[];
  onUpdateBudget: (categoryBudgets: Record<string, number>) => void;
  onCopyLastMonth: () => void;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({
  summary,
  budget,
  categories,
  onUpdateBudget,
  onCopyLastMonth,
}) => {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEditBudget = (categoryId: string, currentBudget: number) => {
    setEditingCategory(categoryId);
    setEditValue(formatCurrency(currentBudget).replace('$', ''));
  };

  const handleSaveBudget = (categoryId: string) => {
    const cents = Math.round(parseFloat(editValue.replace(/[^0-9.]/g, '')) * 100) || 0;
    const newBudgets = { ...(budget?.categoryBudgets || {}) };
    if (cents > 0) {
      newBudgets[categoryId] = cents;
    } else {
      delete newBudgets[categoryId];
    }
    onUpdateBudget(newBudgets);
    setEditingCategory(null);
    setEditValue('');
  };

  const handleAddCategoryBudget = () => {
    // Show a simple prompt or modal to select category and amount
    const categoryId = prompt('Enter category ID or select from list:\n' + 
      categories.map(c => `${c.id}: ${c.name}`).join('\n'));
    if (categoryId && categories.find(c => c.id === categoryId)) {
      const amount = prompt('Enter budget amount:');
      if (amount) {
        const cents = Math.round(parseFloat(amount.replace(/[^0-9.]/g, '')) * 100) || 0;
        if (cents > 0) {
          const newBudgets = { ...(budget?.categoryBudgets || {}) };
          newBudgets[categoryId] = cents;
          onUpdateBudget(newBudgets);
        }
      }
    }
  };

  return (
    <div className="budget-overview">
      <div className="budget-actions">
        <button className="btn-secondary" onClick={onCopyLastMonth}>
          Copy Last Month's Budgets
        </button>
        <button className="btn-secondary" onClick={handleAddCategoryBudget}>
          + Add Category Budget
        </button>
      </div>

      <div className="budget-categories-grid">
        {summary.categorySpending.length > 0 ? (
          summary.categorySpending.map((catSpending) => {
            const category = categories.find((c) => c.id === catSpending.categoryId);
            return (
              <BudgetCategoryCard
                key={catSpending.categoryId}
                categorySpending={catSpending}
                category={category}
                isEditing={editingCategory === catSpending.categoryId}
                editValue={editValue}
                onEditValueChange={setEditValue}
                onEdit={() => handleEditBudget(catSpending.categoryId, catSpending.budgetCents)}
                onSave={() => handleSaveBudget(catSpending.categoryId)}
                onCancel={() => {
                  setEditingCategory(null);
                  setEditValue('');
                }}
              />
            );
          })
        ) : (
          <div className="empty-state">
            <p>No budgets set for this month.</p>
            <button className="btn-primary" onClick={handleAddCategoryBudget}>
              Set Your First Budget
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetOverview;

