import React, { useState } from 'react';
import type { Transaction, Subscription, Category, MonthBudget } from '../types';
import { transactionRepo, subscriptionRepo, categoryRepo, budgetRepo } from '../db';
import { transactionsToCSV, exportToJSON } from '../utils';
import ConfirmModal from './ConfirmModal';
import AlertModal from './AlertModal';

interface SettingsPanelProps {
  currentMonth: string;
  transactions: Transaction[];
  subscriptions: Subscription[];
  categories: Category[];
  budgets: MonthBudget[];
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  currentMonth,
  transactions,
  subscriptions,
  categories,
  budgets,
}) => {
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importData, setImportData] = useState<any>(null);
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean; title: string; message: string; onConfirm: () => void; type?: 'danger' | 'warning' | 'info'; confirmText?: string; cancelText?: string}>(
    { isOpen: false, title: '', message: '', onConfirm: () => {}, type: 'info' }
  );
  const [alertModal, setAlertModal] = useState<{isOpen: boolean; title: string; message: string; type?: 'success' | 'error' | 'info' | 'warning'}>(
    { isOpen: false, title: '', message: '', type: 'info' }
  );

  const handleExportMonthCSV = () => {
    const csv = transactionsToCSV(transactions, categories);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `budget-${currentMonth}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportAllCSV = async () => {
    const allTransactions = await transactionRepo.getAll();
    const csv = transactionsToCSV(allTransactions, categories);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `budget-all-transactions.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = async () => {
    const allTransactions = await transactionRepo.getAll();
    const allSubscriptions = await subscriptionRepo.getAll();
    const allCategories = await categoryRepo.getAll();
    const allBudgets = await budgetRepo.getAll();

    const data = {
      transactions: allTransactions,
      subscriptions: allSubscriptions,
      categories: allCategories,
      budgets: allBudgets,
      exportDate: new Date().toISOString(),
    };

    const json = exportToJSON(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `budget-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    try {
      const data = JSON.parse(text);
      setImportData(data);
      
      setConfirmModal({
        isOpen: true,
        title: 'Import Data',
        message: 'This will import data. Do you want to replace all existing data or merge with existing data?',
        type: 'warning',
        confirmText: 'Replace All',
        cancelText: 'Merge Instead',
        onConfirm: () => {
          setConfirmModal({
            isOpen: true,
            title: 'Confirm Replace',
            message: 'Replace all existing data? (This will delete current data)',
            type: 'danger',
            confirmText: 'Yes, Replace',
            onConfirm: async () => {
              await performImport(data, true);
              setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: () => {}, type: 'info' });
            },
          });
        },
      });
    } catch (error: any) {
      setAlertModal({
        isOpen: true,
        title: 'Import Error',
        message: 'Error importing file: ' + (error?.message || error),
        type: 'error',
      });
    }
  };

  const performImport = async (data: any, replace: boolean) => {

    if (replace) {
      // Clear existing data
      await transactionRepo.getAll().then(txs => Promise.all(txs.map(tx => transactionRepo.delete(tx.id))));
      await subscriptionRepo.getAll().then(subs => Promise.all(subs.map(sub => subscriptionRepo.delete(sub.id))));
      // Note: We keep categories and budgets for now
    }

    // Import transactions
    if (data.transactions && Array.isArray(data.transactions)) {
      for (const tx of data.transactions) {
        try {
          await transactionRepo.add(tx);
        } catch (e) {
          console.error('Error importing transaction:', e);
        }
      }
    }

    // Import subscriptions
    if (data.subscriptions && Array.isArray(data.subscriptions)) {
      for (const sub of data.subscriptions) {
        try {
          await subscriptionRepo.add(sub);
        } catch (e) {
          console.error('Error importing subscription:', e);
        }
      }
    }

    setAlertModal({
      isOpen: true,
      title: 'Import Complete',
      message: 'Import completed! Please refresh the page to see the changes.',
      type: 'success',
    });
  };

  const handleReset = async () => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete All Data',
      message: 'Are you sure you want to delete ALL data? This cannot be undone!',
      type: 'danger',
      confirmText: 'Yes, Delete Everything',
      onConfirm: () => {
        setConfirmModal({
          isOpen: true,
          title: 'Final Confirmation',
          message: 'This is your last chance. Delete everything?',
          type: 'danger',
          confirmText: 'Delete All',
          onConfirm: async () => {
            const allTransactions = await transactionRepo.getAll();
            const allSubscriptions = await subscriptionRepo.getAll();
            
            await Promise.all([
              ...allTransactions.map(tx => transactionRepo.delete(tx.id)),
              ...allSubscriptions.map(sub => subscriptionRepo.delete(sub.id)),
            ]);

            setAlertModal({
              isOpen: true,
              title: 'Data Deleted',
              message: 'All data deleted. Refreshing page...',
              type: 'success',
            });
          },
        });
      },
    });
  };

  return (
    <div className="settings-panel">
      <div className="settings-section">
        <h3>Export Data</h3>
        <div className="settings-actions">
          <button className="btn-secondary" onClick={handleExportMonthCSV}>
            Export Current Month (CSV)
          </button>
          <button className="btn-secondary" onClick={handleExportAllCSV}>
            Export All Transactions (CSV)
          </button>
          <button className="btn-secondary" onClick={handleExportJSON}>
            Export Full Backup (JSON)
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>Import Data</h3>
        <div className="settings-actions">
          <label className="file-input-label">
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              style={{ display: 'none' }}
            />
            <span className="btn-secondary">Import JSON Backup</span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Danger Zone</h3>
        <div className="settings-actions">
          <button className="btn-danger" onClick={handleReset}>
            Reset All Data
          </button>
        </div>
        <p className="danger-warning">
          ⚠️ This will permanently delete all transactions and subscriptions. Categories and budgets will be preserved.
        </p>
      </div>

      <div className="settings-section">
        <h3>About</h3>
        <p>
          Budget Tracker v1.0<br />
          All data is stored locally in your browser using IndexedDB.<br />
          No data is sent to any server.
        </p>
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
        onConfirm={confirmModal.onConfirm}
        onCancel={async () => {
          // If canceling replace, offer merge option
          if (confirmModal.title === 'Confirm Replace' && importData) {
            // User canceled replace, so merge instead
            await performImport(importData, false);
          } else if (confirmModal.title === 'Import Data' && importData) {
            // User chose to merge from the first dialog
            await performImport(importData, false);
          }
          setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: () => {}, type: 'info' });
        }}
      />

      <AlertModal
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => {
          if (alertModal.message.includes('Refreshing')) {
            window.location.reload();
          }
          setAlertModal({ ...alertModal, isOpen: false });
        }}
      />
    </div>
  );
};

export default SettingsPanel;

