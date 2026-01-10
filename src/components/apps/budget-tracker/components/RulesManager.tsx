import React, { useState, useEffect } from 'react';
import type { Rule, Category } from '../types';
import { ruleRepo } from '../db';
import ConfirmModal from './ConfirmModal';
import AlertModal from './AlertModal';

interface RulesManagerProps {
  categories: Category[];
  onRuleApplied?: () => void;
}

const RulesManager: React.FC<RulesManagerProps> = ({ categories, onRuleApplied }) => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [matchText, setMatchText] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [appliesTo, setAppliesTo] = useState<'expense' | 'income' | 'both'>('expense');
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean; title: string; message: string; onConfirm: () => void; type?: 'danger' | 'warning' | 'info'}>(
    { isOpen: false, title: '', message: '', onConfirm: () => {}, type: 'info' }
  );
  const [alertModal, setAlertModal] = useState<{isOpen: boolean; title: string; message: string; type?: 'success' | 'error' | 'info' | 'warning'}>(
    { isOpen: false, title: '', message: '', type: 'info' }
  );

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    const allRules = await ruleRepo.getAll();
    setRules(allRules);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchText || !categoryId) {
      setAlertModal({
        isOpen: true,
        title: 'Validation Error',
        message: 'Please fill in all fields',
        type: 'error',
      });
      return;
    }

    if (editingRule) {
      await ruleRepo.update(editingRule.id, { matchText, categoryId, appliesTo });
    } else {
      await ruleRepo.add({ matchText, categoryId, appliesTo });
    }

    await loadRules();
    setShowForm(false);
    setEditingRule(null);
    setMatchText('');
    setCategoryId('');
    setAppliesTo('expense');
  };

  const handleDelete = async (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Rule',
      message: 'Are you sure you want to delete this rule? This action cannot be undone.',
      type: 'danger',
      onConfirm: async () => {
        await ruleRepo.delete(id);
        await loadRules();
        setConfirmModal({ ...confirmModal, isOpen: false });
      },
    });
  };

  const handleEdit = (rule: Rule) => {
    setEditingRule(rule);
    setMatchText(rule.matchText);
    setCategoryId(rule.categoryId);
    setAppliesTo(rule.appliesTo);
    setShowForm(true);
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || 'Unknown';
  };

  return (
    <div className="rules-manager">
      <div className="action-bar">
        <button
          className="btn-primary"
          onClick={() => {
            setEditingRule(null);
            setMatchText('');
            setCategoryId('');
            setAppliesTo('expense');
            setShowForm(true);
          }}
        >
          + Add Rule
        </button>
      </div>

      {rules.length === 0 ? (
        <div className="empty-state">
          <p>No auto-categorization rules yet. Add rules to automatically categorize transactions!</p>
        </div>
      ) : (
        <div className="rules-list">
          {rules.map((rule) => (
            <div key={rule.id} className="rule-card">
              <div className="rule-content">
                <div className="rule-match">
                  <strong>If name contains:</strong> "{rule.matchText}"
                </div>
                <div className="rule-action">
                  <strong>Then categorize as:</strong> {getCategoryName(rule.categoryId)}
                </div>
                <div className="rule-applies">
                  <strong>Applies to:</strong> {rule.appliesTo}
                </div>
              </div>
              <div className="rule-actions">
                <button className="btn-icon" onClick={() => handleEdit(rule)}>
                  ✏️
                </button>
                <button className="btn-icon" onClick={() => handleDelete(rule.id)}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="transaction-form">
              <h3>{editingRule ? 'Edit Rule' : 'Add Rule'}</h3>
              <form onSubmit={handleSave}>
                <div className="form-group">
                  <label>
                    Match Text <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={matchText}
                    onChange={(e) => setMatchText(e.target.value)}
                    placeholder="e.g., Spotify, Amazon, Starbucks"
                    required
                  />
                  <small>Transaction names containing this text will be auto-categorized</small>
                </div>

                <div className="form-group">
                  <label>
                    Category <span className="required">*</span>
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Applies To <span className="required">*</span>
                  </label>
                  <select
                    value={appliesTo}
                    onChange={(e) => setAppliesTo(e.target.value as any)}
                    required
                  >
                    <option value="expense">Expenses Only</option>
                    <option value="income">Income Only</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingRule ? 'Update' : 'Add'} Rule
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setShowForm(false);
                      setEditingRule(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RulesManager;

