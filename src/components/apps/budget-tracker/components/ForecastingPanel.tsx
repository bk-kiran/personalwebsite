import React from 'react';
import type { MonthSummary, Transaction, Subscription, Category } from '../types';
import { formatCurrency, getSubscriptionOccurrences } from '../utils';
import { format, parseISO, endOfMonth, isAfter, isBefore } from 'date-fns';

interface ForecastingPanelProps {
  summary: MonthSummary;
  transactions: Transaction[];
  subscriptions: Subscription[];
  categories: Category[];
  currentMonth: string;
}

const ForecastingPanel: React.FC<ForecastingPanelProps> = ({
  summary,
  transactions,
  subscriptions,
  categories,
  currentMonth,
}) => {
  const today = new Date();
  const monthStart = parseISO(`${currentMonth}-01`);
  const monthEnd = endOfMonth(monthStart);
  const daysInMonth = monthEnd.getDate();
  const daysElapsed = today.getDate();
  const daysRemaining = daysInMonth - daysElapsed;

  // Calculate projected expenses for remaining month
  const dailyAverageExpense = daysElapsed > 0 
    ? summary.expensesCents / daysElapsed 
    : 0;
  const projectedExpensesRemaining = dailyAverageExpense * daysRemaining;

  // Add upcoming subscription occurrences
  let upcomingSubscriptionsCents = 0;
  subscriptions.forEach((sub) => {
    if (!sub.active) return;
    
    const occurrences = getSubscriptionOccurrences(sub, currentMonth);
    occurrences.forEach((occ) => {
      const occDate = parseISO(occ.date);
      // Check if occurrence is in the future and not materialized
      if (isAfter(occDate, today) || format(occDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
        const isMaterialized = transactions.some(
          (tx) =>
            tx.subscriptionId === sub.id &&
            tx.subscriptionOccurrenceDate === occ.date
        );
        if (!isMaterialized) {
          upcomingSubscriptionsCents += occ.amountCents;
        }
      }
    });
  });

  // Projected total expenses
  const projectedTotalExpenses = summary.expensesCents + projectedExpensesRemaining + upcomingSubscriptionsCents;

  // Projected income (assume same rate if there's income)
  const dailyAverageIncome = daysElapsed > 0 && summary.incomeCents > 0
    ? summary.incomeCents / daysElapsed
    : 0;
  const projectedIncomeRemaining = dailyAverageIncome * daysRemaining;
  const projectedTotalIncome = summary.incomeCents + projectedIncomeRemaining;

  // Projected net
  const projectedNet = projectedTotalIncome - projectedTotalExpenses;

  // Projected safe to spend (based on budgets)
  const totalBudgetCents = summary.categorySpending.reduce((sum, cat) => sum + cat.budgetCents, 0);
  const projectedSafeToSpend = totalBudgetCents - projectedTotalExpenses;

  return (
    <div className="forecasting-panel">
      <h3>End-of-Month Forecast</h3>
      <div className="forecast-grid">
        <div className="forecast-card">
          <div className="forecast-label">Projected Income</div>
          <div className="forecast-value income">
            {formatCurrency(projectedTotalIncome)}
          </div>
          <div className="forecast-detail">
            Current: {formatCurrency(summary.incomeCents)}
            {projectedIncomeRemaining > 0 && (
              <span> + {formatCurrency(projectedIncomeRemaining)} projected</span>
            )}
          </div>
        </div>

        <div className="forecast-card">
          <div className="forecast-label">Projected Expenses</div>
          <div className="forecast-value expense">
            {formatCurrency(projectedTotalExpenses)}
          </div>
          <div className="forecast-detail">
            Current: {formatCurrency(summary.expensesCents)}
            <br />
            Projected remaining: {formatCurrency(projectedExpensesRemaining)}
            {upcomingSubscriptionsCents > 0 && (
              <span> + {formatCurrency(upcomingSubscriptionsCents)} subscriptions</span>
            )}
          </div>
        </div>

        <div className={`forecast-card ${projectedNet >= 0 ? 'positive' : 'negative'}`}>
          <div className="forecast-label">Projected Net</div>
          <div className="forecast-value">
            {formatCurrency(projectedNet)}
          </div>
          <div className="forecast-detail">
            Current: {formatCurrency(summary.netCents)}
          </div>
        </div>

        <div className="forecast-card">
          <div className="forecast-label">Projected Safe to Spend</div>
          <div className={`forecast-value ${projectedSafeToSpend >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(projectedSafeToSpend)}
          </div>
          <div className="forecast-detail">
            Based on {daysRemaining} days remaining
          </div>
        </div>
      </div>

      <div className="forecast-info">
        <p>
          <strong>Days elapsed:</strong> {daysElapsed} / {daysInMonth} ({Math.round((daysElapsed / daysInMonth) * 100)}%)
        </p>
        <p>
          <strong>Daily average spending:</strong> {formatCurrency(dailyAverageExpense)}
        </p>
        {upcomingSubscriptionsCents > 0 && (
          <p>
            <strong>Upcoming subscriptions:</strong> {formatCurrency(upcomingSubscriptionsCents)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForecastingPanel;

