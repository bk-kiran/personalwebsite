import React from 'react';
import type { Transaction, Category, MonthSummary } from '../types';
import { formatCurrency } from '../utils';
import { format, parseISO } from 'date-fns';

interface InsightsPanelProps {
  transactions: Transaction[];
  categories: Category[];
  summary: MonthSummary;
  previousMonthSummary?: MonthSummary | null;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({
  transactions,
  categories,
  summary,
  previousMonthSummary,
}) => {
  // Top 5 spending categories
  const topCategories = [...summary.categorySpending]
    .sort((a, b) => b.spentCents - a.spentCents)
    .slice(0, 5)
    .filter(cat => cat.spentCents > 0);

  // Largest 5 transactions
  const largestTransactions = [...transactions]
    .filter(tx => tx.type === 'expense')
    .sort((a, b) => b.amountCents - a.amountCents)
    .slice(0, 5);

  // Month-over-month comparison
  const spendingDelta = previousMonthSummary
    ? summary.expensesCents - previousMonthSummary.expensesCents
    : null;
  const incomeDelta = previousMonthSummary
    ? summary.incomeCents - previousMonthSummary.incomeCents
    : null;

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return 'Uncategorized';
    return categories.find((c) => c.id === categoryId)?.name || 'Uncategorized';
  };

  return (
    <div className="insights-panel">
      <h3>Insights</h3>

      <div className="insights-grid">
        {/* Top Categories */}
        <div className="insight-card">
          <h4>Top 5 Spending Categories</h4>
          {topCategories.length > 0 ? (
            <div className="insight-list">
              {topCategories.map((cat, index) => (
                <div key={cat.categoryId} className="insight-item">
                  <div className="insight-rank">#{index + 1}</div>
                  <div className="insight-content">
                    <div className="insight-name">{cat.categoryName}</div>
                    <div className="insight-amount">{formatCurrency(cat.spentCents)}</div>
                  </div>
                  <div className="insight-percentage">
                    {((cat.spentCents / summary.expensesCents) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No spending data yet</p>
          )}
        </div>

        {/* Largest Transactions */}
        <div className="insight-card">
          <h4>Largest 5 Transactions</h4>
          {largestTransactions.length > 0 ? (
            <div className="insight-list">
              {largestTransactions.map((tx) => (
                <div key={tx.id} className="insight-item">
                  <div className="insight-content">
                    <div className="insight-name">{tx.name}</div>
                    <div className="insight-date">
                      {format(parseISO(tx.dateISO), 'MMM dd')}
                    </div>
                  </div>
                  <div className="insight-amount expense">
                    {formatCurrency(tx.amountCents)}
                  </div>
                  <div className="insight-category">
                    {getCategoryName(tx.categoryId)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No transactions yet</p>
          )}
        </div>

        {/* Month-over-Month */}
        <div className="insight-card">
          <h4>Month-over-Month Change</h4>
          {previousMonthSummary ? (
            <div className="insight-list">
              <div className="insight-item">
                <div className="insight-content">
                  <div className="insight-name">Spending</div>
                </div>
                <div className={`insight-amount ${spendingDelta && spendingDelta > 0 ? 'negative' : 'positive'}`}>
                  {spendingDelta && spendingDelta > 0 ? '+' : ''}
                  {formatCurrency(spendingDelta || 0)}
                </div>
                <div className="insight-percentage">
                  {previousMonthSummary.expensesCents > 0
                    ? `${((spendingDelta! / previousMonthSummary.expensesCents) * 100).toFixed(1)}%`
                    : 'N/A'}
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-content">
                  <div className="insight-name">Income</div>
                </div>
                <div className={`insight-amount ${incomeDelta && incomeDelta < 0 ? 'negative' : 'positive'}`}>
                  {incomeDelta && incomeDelta > 0 ? '+' : ''}
                  {formatCurrency(incomeDelta || 0)}
                </div>
                <div className="insight-percentage">
                  {previousMonthSummary.incomeCents > 0
                    ? `${((incomeDelta! / previousMonthSummary.incomeCents) * 100).toFixed(1)}%`
                    : 'N/A'}
                </div>
              </div>
            </div>
          ) : (
            <p className="no-data">No previous month data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;

