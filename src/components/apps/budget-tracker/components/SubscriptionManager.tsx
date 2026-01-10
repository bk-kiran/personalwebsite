import React, { useState } from 'react';
import type { Subscription, Category, Transaction } from '../types';
import { subscriptionRepo, transactionRepo } from '../db';
import { formatCurrency, getSubscriptionOccurrences, parseCurrencyToCents } from '../utils';
import { format, parseISO, addMonths, addWeeks, addYears, addDays } from 'date-fns';
import ConfirmModal from './ConfirmModal';

interface SubscriptionManagerProps {
  subscriptions: Subscription[];
  categories: Category[];
  currentMonth: string;
  transactions: Transaction[];
  onUpdate: (monthKey: string) => void;
}

interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  type?: 'danger' | 'warning' | 'info';
}

const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({
  subscriptions,
  categories,
  currentMonth,
  transactions,
  onUpdate,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'info',
  });

  const handleMarkAsPaid = async (subscription: Subscription, occurrenceDate: string) => {
    const amountCents = subscription.amountCents;
    await transactionRepo.add({
      type: 'expense',
      dateISO: occurrenceDate,
      amountCents,
      name: subscription.name,
      categoryId: subscription.categoryId,
      notes: `Subscription payment`,
      subscriptionId: subscription.id,
      subscriptionOccurrenceDate: occurrenceDate,
    });
    onUpdate(currentMonth);
  };

  const handleDelete = async (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Subscription',
      message: 'Are you sure you want to delete this subscription? This action cannot be undone.',
      type: 'danger',
      onConfirm: async () => {
        await subscriptionRepo.delete(id);
        onUpdate(currentMonth);
        setConfirmModal({ ...confirmModal, isOpen: false });
      },
    });
  };

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return 'Uncategorized';
    return categories.find((c) => c.id === categoryId)?.name || 'Uncategorized';
  };

  const getNextBillingDate = (sub: Subscription) => {
    const date = parseISO(sub.nextBillingDateISO);
    switch (sub.cadence) {
      case 'monthly':
        return addMonths(date, 1);
      case 'weekly':
        return addWeeks(date, 1);
      case 'yearly':
        return addYears(date, 1);
      case 'custom':
        return sub.customDays ? addDays(date, sub.customDays) : date;
      default:
        return date;
    }
  };

  return (
    <div className="subscription-manager">
      <div className="action-bar">
        <button className="btn-primary" onClick={() => {
          setEditingSub(null);
          setShowForm(true);
        }}>
          + Add Subscription
        </button>
      </div>

      {subscriptions.length === 0 ? (
        <div className="empty-state">
          <p>No subscriptions yet. Add your first subscription to track recurring expenses!</p>
        </div>
      ) : (
        <div className="subscriptions-list">
          {subscriptions.map((sub) => {
            const occurrences = getSubscriptionOccurrences(sub, currentMonth);
            const materialized = transactions.filter(
              (tx) => tx.subscriptionId === sub.id && tx.subscriptionOccurrenceDate
            );

            return (
              <div key={sub.id} className="subscription-card">
                <div className="subscription-header">
                  <div>
                    <h3>{sub.name}</h3>
                    <div className="subscription-meta">
                      <span>{formatCurrency(sub.amountCents)}</span>
                      <span>•</span>
                      <span>{sub.cadence}</span>
                      <span>•</span>
                      <span>{getCategoryName(sub.categoryId)}</span>
                      {sub.autopay && <span className="autopay-badge">Autopay</span>}
                    </div>
                  </div>
                  <div className="subscription-actions">
                    <button
                      className="btn-icon"
                      onClick={() => {
                        setEditingSub(sub);
                        setShowForm(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button className="btn-icon" onClick={() => handleDelete(sub.id)}>
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="subscription-occurrences">
                  <h4>This Month ({currentMonth})</h4>
                  {occurrences.length === 0 ? (
                    <p className="no-occurrences">No occurrences this month</p>
                  ) : (
                    occurrences.map((occ) => {
                      const isMaterialized = materialized.some(
                        (tx) => tx.subscriptionOccurrenceDate === occ.date
                      );
                      return (
                        <div key={occ.date} className="occurrence-item">
                          <span>{format(parseISO(occ.date), 'MMM dd')}</span>
                          <span>{formatCurrency(occ.amountCents)}</span>
                          {isMaterialized ? (
                            <span className="materialized-badge">Paid</span>
                          ) : (
                            <button
                              className="btn-small btn-primary"
                              onClick={() => handleMarkAsPaid(sub, occ.date)}
                            >
                              Mark as Paid
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="subscription-footer">
                  <span>Next billing: {format(parseISO(sub.nextBillingDateISO), 'MMM dd, yyyy')}</span>
                  {sub.endDateISO && (
                    <span>Ends: {format(parseISO(sub.endDateISO), 'MMM dd, yyyy')}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <SubscriptionForm
          subscription={editingSub}
          categories={categories}
          onSave={async (subData) => {
            if (editingSub) {
              await subscriptionRepo.update(editingSub.id, subData);
            } else {
              await subscriptionRepo.add(subData);
            }
            onUpdate(currentMonth);
            setShowForm(false);
            setEditingSub(null);
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingSub(null);
          }}
          onError={(message) => {
            // Could add alert modal here if needed
            console.error(message);
          }}
        />
      )}
    </div>
  );
};

interface SubscriptionFormProps {
  subscription?: Subscription | null;
  categories: Category[];
  onSave: (data: Omit<Subscription, 'id' | 'createdAtISO' | 'updatedAtISO'>) => void;
  onCancel: () => void;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  subscription,
  categories,
  onSave,
  onCancel,
  onError,
}) => {
  const [name, setName] = useState(subscription?.name || '');
  const [amount, setAmount] = useState(
    subscription ? formatCurrency(subscription.amountCents).replace('$', '') : ''
  );
  const [categoryId, setCategoryId] = useState(subscription?.categoryId || '');
  const [cadence, setCadence] = useState(subscription?.cadence || 'monthly');
  const [nextBillingDate, setNextBillingDate] = useState(
    subscription?.nextBillingDateISO || format(new Date(), 'yyyy-MM-dd')
  );
  const [endDate, setEndDate] = useState(subscription?.endDateISO || '');
  const [autopay, setAutopay] = useState(subscription?.autopay || false);
  const [customDays, setCustomDays] = useState(subscription?.customDays?.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountCents = parseCurrencyToCents(amount);
    if (!name || !amountCents || !nextBillingDate) {
      // Error will be shown via parent component
      return;
    }

    onSave({
      name,
      amountCents,
      categoryId: categoryId || undefined,
      cadence: cadence as any,
      nextBillingDateISO: nextBillingDate,
      endDateISO: endDate || undefined,
      active: subscription?.active !== false,
      autopay,
      customDays: cadence === 'custom' && customDays ? parseInt(customDays) : undefined,
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="transaction-form">
          <h3>{subscription ? 'Edit Subscription' : 'Add Subscription'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name <span className="required">*</span></label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Amount <span className="required">*</span></label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
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
            <div className="form-group">
              <label>Cadence <span className="required">*</span></label>
              <select value={cadence} onChange={(e) => setCadence(e.target.value)} required>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            {cadence === 'custom' && (
              <div className="form-group">
                <label>Days between billing</label>
                <input
                  type="number"
                  value={customDays}
                  onChange={(e) => setCustomDays(e.target.value)}
                  min="1"
                />
              </div>
            )}
            <div className="form-group">
              <label>Next Billing Date <span className="required">*</span></label>
              <input
                type="date"
                value={nextBillingDate}
                onChange={(e) => setNextBillingDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date (optional)</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={autopay}
                  onChange={(e) => setAutopay(e.target.checked)}
                />
                Autopay enabled
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {subscription ? 'Update' : 'Add'} Subscription
              </button>
              <button type="button" className="btn-secondary" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManager;

