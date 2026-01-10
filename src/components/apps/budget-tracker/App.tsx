import React, { useState, useEffect } from 'react';
import { db, transactionRepo, subscriptionRepo, categoryRepo, budgetRepo } from './db';
import { getCurrentMonthKey, getMonthDisplay, calculateMonthSummary, getPreviousMonth } from './utils';
import type { Transaction, Subscription, Category, MonthBudget, MonthSummary } from './types';
import MonthPicker from './components/MonthPicker';
import SummaryTiles from './components/SummaryTiles';
import BudgetOverview from './components/BudgetOverview';
import TransactionTable from './components/TransactionTable';
import SubscriptionManager from './components/SubscriptionManager';
import SettingsPanel from './components/SettingsPanel';
import TransactionForm from './components/TransactionForm';
import ForecastingPanel from './components/ForecastingPanel';
import InsightsPanel from './components/InsightsPanel';
import ChartsPanel from './components/ChartsPanel';
import RulesManager from './components/RulesManager';
import SpendingAlerts from './components/SpendingAlerts';
import ConfirmModal from './components/ConfirmModal';
import AlertModal from './components/AlertModal';
import { ruleRepo } from './db';
import './index.css';

const BudgetTracker: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonthKey());
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budget, setBudget] = useState<MonthBudget | null>(null);
  const [summary, setSummary] = useState<MonthSummary | null>(null);
  const [previousSummary, setPreviousSummary] = useState<MonthSummary | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'subscriptions' | 'settings' | 'insights' | 'rules'>('overview');
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean; title: string; message: string; onConfirm: () => void; type?: 'danger' | 'warning' | 'info'}>(
    { isOpen: false, title: '', message: '', onConfirm: () => {}, type: 'info' }
  );
  const [alertModal, setAlertModal] = useState<{isOpen: boolean; title: string; message: string; type?: 'success' | 'error' | 'info' | 'warning'}>(
    { isOpen: false, title: '', message: '', type: 'info' }
  );

  // Load data for current month
  useEffect(() => {
    loadMonthData(currentMonth);
    loadPreviousMonthData(currentMonth);
  }, [currentMonth]);

  const loadMonthData = async (monthKey: string) => {
    try {
      const [txs, subs, cats, budgetData] = await Promise.all([
        transactionRepo.getByMonth(monthKey),
        subscriptionRepo.getAll(),
        categoryRepo.getAll(),
        budgetRepo.getByMonth(monthKey),
      ]);

      setTransactions(txs);
      setSubscriptions(subs);
      setCategories(cats);
      setBudget(budgetData);

      // Calculate summary
      const monthSummary = calculateMonthSummary(txs, subs, budgetData, cats, monthKey);
      setSummary(monthSummary);
    } catch (error) {
      console.error('Error loading month data:', error);
    }
  };

  const loadPreviousMonthData = async (monthKey: string) => {
    try {
      const prevMonthKey = getPreviousMonth(monthKey);
      const [txs, subs, cats, budgetData] = await Promise.all([
        transactionRepo.getByMonth(prevMonthKey),
        subscriptionRepo.getAll(),
        categoryRepo.getAll(),
        budgetRepo.getByMonth(prevMonthKey),
      ]);

      const prevSummary = calculateMonthSummary(txs, subs, budgetData, cats, prevMonthKey);
      setPreviousSummary(prevSummary);
    } catch (error) {
      console.error('Error loading previous month data:', error);
      setPreviousSummary(null);
    }
  };

  const handleAddTransaction = async (transaction: Omit<Transaction, 'id' | 'createdAtISO' | 'updatedAtISO'>) => {
    // Apply auto-categorization rules
    let finalTransaction = { ...transaction };
    if (!finalTransaction.categoryId) {
      const rules = await ruleRepo.getAll();
      const matchingRule = rules.find(
        (rule) =>
          transaction.name.toLowerCase().includes(rule.matchText.toLowerCase()) &&
          (rule.appliesTo === transaction.type || rule.appliesTo === 'both')
      );
      if (matchingRule) {
        finalTransaction.categoryId = matchingRule.categoryId;
      }
    }

    await transactionRepo.add(finalTransaction);
    await loadMonthData(currentMonth);
    setShowTransactionForm(false);
    setEditingTransaction(null);
  };

  const handleUpdateTransaction = async (id: string, updates: Partial<Transaction>) => {
    await transactionRepo.update(id, updates);
    await loadMonthData(currentMonth);
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = async (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Transaction',
      message: 'Are you sure you want to delete this transaction? This action cannot be undone.',
      type: 'danger',
      onConfirm: async () => {
        await transactionRepo.delete(id);
        await loadMonthData(currentMonth);
        setConfirmModal({ ...confirmModal, isOpen: false });
      },
    });
  };

  const handleUpdateBudget = async (categoryBudgets: Record<string, number>) => {
    await budgetRepo.upsert(currentMonth, categoryBudgets);
    await loadMonthData(currentMonth);
  };

  const handleCopyLastMonthBudget = async () => {
    const prevMonth = currentMonth.split('-');
    const prevYear = parseInt(prevMonth[0]);
    const prevMonthNum = parseInt(prevMonth[1]);
    const lastMonthKey = prevMonthNum === 1 
      ? `${prevYear - 1}-12`
      : `${prevYear}-${String(prevMonthNum - 1).padStart(2, '0')}`;
    
    const lastMonthBudget = await budgetRepo.getByMonth(lastMonthKey);
    if (lastMonthBudget) {
      await budgetRepo.upsert(currentMonth, lastMonthBudget.categoryBudgets);
      await loadMonthData(currentMonth);
    }
  };

  return (
    <div className="budget-tracker">
      <div className="budget-container">
        {/* Header */}
        <div className="budget-header">
          <h2>Budget Tracker</h2>
          <MonthPicker
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
          />
        </div>

        {/* Summary Tiles */}
        {summary && (
          <SummaryTiles summary={summary} />
        )}

        {/* Tabs */}
        <div className="budget-tabs">
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={activeTab === 'transactions' ? 'active' : ''}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button
            className={activeTab === 'subscriptions' ? 'active' : ''}
            onClick={() => setActiveTab('subscriptions')}
          >
            Subscriptions
          </button>
          <button
            className={activeTab === 'insights' ? 'active' : ''}
            onClick={() => setActiveTab('insights')}
          >
            Insights
          </button>
          <button
            className={activeTab === 'rules' ? 'active' : ''}
            onClick={() => setActiveTab('rules')}
          >
            Rules
          </button>
          <button
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="budget-content">
          {activeTab === 'overview' && summary && (
            <>
              <SpendingAlerts categorySpending={summary.categorySpending} />
              <ForecastingPanel
                summary={summary}
                transactions={transactions}
                subscriptions={subscriptions}
                categories={categories}
                currentMonth={currentMonth}
              />
              <ChartsPanel
                summary={summary}
                transactions={transactions}
                currentMonth={currentMonth}
              />
              <BudgetOverview
                summary={summary}
                budget={budget}
                categories={categories}
                onUpdateBudget={handleUpdateBudget}
                onCopyLastMonth={handleCopyLastMonthBudget}
              />
            </>
          )}

          {activeTab === 'transactions' && (
            <>
              <div className="action-bar">
                <button
                  className="btn-primary"
                  onClick={() => {
                    setEditingTransaction(null);
                    setShowTransactionForm(true);
                  }}
                >
                  + Add Transaction
                </button>
              </div>
              <TransactionTable
                transactions={transactions}
                categories={categories}
                onEdit={(tx) => {
                  setEditingTransaction(tx);
                  setShowTransactionForm(true);
                }}
                onDelete={handleDeleteTransaction}
              />
            </>
          )}

          {activeTab === 'subscriptions' && (
            <SubscriptionManager
              subscriptions={subscriptions}
              categories={categories}
              currentMonth={currentMonth}
              transactions={transactions}
              onUpdate={loadMonthData}
            />
          )}

          {activeTab === 'insights' && summary && (
            <InsightsPanel
              transactions={transactions}
              categories={categories}
              summary={summary}
              previousMonthSummary={previousSummary}
            />
          )}

          {activeTab === 'rules' && (
            <RulesManager
              categories={categories}
              onRuleApplied={() => loadMonthData(currentMonth)}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPanel
              currentMonth={currentMonth}
              transactions={transactions}
              subscriptions={subscriptions}
              categories={categories}
              budgets={budget ? [budget] : []}
            />
          )}
        </div>

        {/* Transaction Form Modal */}
        {showTransactionForm && (
          <div className="modal-overlay" onClick={() => {
            setShowTransactionForm(false);
            setEditingTransaction(null);
          }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <TransactionForm
                transaction={editingTransaction}
                categories={categories}
                onSave={editingTransaction
                  ? (updates) => handleUpdateTransaction(editingTransaction.id, updates)
                  : handleAddTransaction}
                onCancel={() => {
                  setShowTransactionForm(false);
                  setEditingTransaction(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetTracker;

