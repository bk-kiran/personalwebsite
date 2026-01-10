import React, { useState } from 'react';
import type { Transaction, Category } from '../types';
import { formatCurrency } from '../utils';
import { format, parseISO } from 'date-fns';

interface TransactionTableProps {
  transactions: Transaction[];
  categories: Category[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  categories,
  onEdit,
  onDelete,
}) => {
  const [filter, setFilter] = useState({ type: '', category: '', search: '' });

  const filteredTransactions = transactions.filter((tx) => {
    if (filter.type && tx.type !== filter.type) return false;
    if (filter.category && tx.categoryId !== filter.category) return false;
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      return (
        tx.name.toLowerCase().includes(searchLower) ||
        tx.notes?.toLowerCase().includes(searchLower) ||
        tx.paymentMethod?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return 'Uncategorized';
    return categories.find((c) => c.id === categoryId)?.name || 'Uncategorized';
  };

  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <p>No transactions yet. Add your first transaction to get started!</p>
      </div>
    );
  }

  return (
    <div className="transaction-table-container">
      <div className="table-filters">
        <input
          type="text"
          placeholder="Search transactions..."
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className="filter-input"
        />
        <select
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="no-results">
                  No transactions match your filters.
                </td>
              </tr>
            ) : (
              filteredTransactions
                .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
                .map((tx) => (
                  <tr key={tx.id} className={tx.type}>
                    <td>{format(parseISO(tx.dateISO), 'MMM dd, yyyy')}</td>
                    <td>
                      <span className={`type-badge ${tx.type}`}>{tx.type}</span>
                    </td>
                    <td>{tx.name}</td>
                    <td>{getCategoryName(tx.categoryId)}</td>
                    <td className={tx.type === 'income' ? 'income-amount' : 'expense-amount'}>
                      {tx.type === 'income' ? '+' : '-'}
                      {formatCurrency(tx.amountCents)}
                    </td>
                    <td>{tx.paymentMethod || '-'}</td>
                    <td>
                      <button
                        className="btn-icon"
                        onClick={() => onEdit(tx)}
                        aria-label="Edit transaction"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => onDelete(tx.id)}
                        aria-label="Delete transaction"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;

