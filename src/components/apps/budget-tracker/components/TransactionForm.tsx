import React, { useState, useEffect } from 'react';
import type { Transaction, Category } from '../types';
import { parseCurrencyToCents, formatCurrency } from '../utils';
import { format, parseISO } from 'date-fns';

interface TransactionFormProps {
  transaction?: Transaction | null;
  categories: Category[];
  onSave: (transaction: Omit<Transaction, 'id' | 'createdAtISO' | 'updatedAtISO'> | Partial<Transaction>) => void;
  onCancel: () => void;
  onError?: (message: string) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  transaction,
  categories,
  onSave,
  onCancel,
  onError,
}) => {
  const [type, setType] = useState<TransactionType>(transaction?.type || 'expense');
  const [date, setDate] = useState(transaction?.dateISO || format(new Date(), 'yyyy-MM-dd'));
  const [amount, setAmount] = useState(
    transaction ? formatCurrency(transaction.amountCents).replace('$', '') : ''
  );
  const [name, setName] = useState(transaction?.name || '');
  const [categoryId, setCategoryId] = useState(transaction?.categoryId || '');
  const [paymentMethod, setPaymentMethod] = useState(transaction?.paymentMethod || '');
  const [notes, setNotes] = useState(transaction?.notes || '');

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setDate(transaction.dateISO);
      setAmount(formatCurrency(transaction.amountCents).replace('$', ''));
      setName(transaction.name);
      setCategoryId(transaction.categoryId || '');
      setPaymentMethod(transaction.paymentMethod || '');
      setNotes(transaction.notes || '');
    }
  }, [transaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountCents = parseCurrencyToCents(amount);
    if (!name || !amountCents || !date) {
      if (onError) {
        onError('Please fill in all required fields');
      }
      return;
    }

    if (transaction) {
      // Update existing
      onSave({
        type,
        dateISO: date,
        amountCents,
        name,
        categoryId: categoryId || undefined,
        paymentMethod: paymentMethod || undefined,
        notes: notes || undefined,
      });
    } else {
      // Create new
      onSave({
        type,
        dateISO: date,
        amountCents,
        name,
        categoryId: categoryId || undefined,
        paymentMethod: paymentMethod || undefined,
        notes: notes || undefined,
      });
    }
  };

  return (
    <div className="transaction-form">
      <h3>{transaction ? 'Edit Transaction' : 'Add Transaction'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Type <span className="required">*</span>
          </label>
          <select value={type} onChange={(e) => setType(e.target.value as TransactionType)} required>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Date <span className="required">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>
            Amount <span className="required">*</span>
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>

        <div className="form-group">
          <label>
            {type === 'income' ? 'Source' : 'Merchant'} <span className="required">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={type === 'income' ? 'e.g., Salary' : 'e.g., Amazon'}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {type === 'expense' && (
          <div className="form-group">
            <label>Payment Method</label>
            <input
              type="text"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              placeholder="e.g., Credit Card, Cash"
            />
          </div>
        )}

        <div className="form-group">
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes..."
            rows={3}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {transaction ? 'Update' : 'Add'} Transaction
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

type TransactionType = 'income' | 'expense';

export default TransactionForm;

