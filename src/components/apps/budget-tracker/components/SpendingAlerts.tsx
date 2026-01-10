import React, { useState, useEffect } from 'react';
import type { CategorySpending } from '../types';
import { formatCurrency } from '../utils';

interface SpendingAlertsProps {
  categorySpending: CategorySpending[];
}

interface Alert {
  categoryId: string;
  categoryName: string;
  percentage: number;
  type: 'warning' | 'critical';
}

const SpendingAlerts: React.FC<SpendingAlertsProps> = ({ categorySpending }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertThreshold, setAlertThreshold] = useState(80);

  useEffect(() => {
    const newAlerts: Alert[] = [];
    
    categorySpending.forEach((cat) => {
      if (cat.budgetCents === 0) return; // No budget set
      
      if (cat.percentageUsed >= 100) {
        newAlerts.push({
          categoryId: cat.categoryId,
          categoryName: cat.categoryName,
          percentage: cat.percentageUsed,
          type: 'critical',
        });
      } else if (cat.percentageUsed >= alertThreshold) {
        newAlerts.push({
          categoryId: cat.categoryId,
          categoryName: cat.categoryName,
          percentage: cat.percentageUsed,
          type: 'warning',
        });
      }
    });

    setAlerts(newAlerts);
  }, [categorySpending, alertThreshold]);

  if (alerts.length === 0) {
    return (
      <div className="spending-alerts">
        <div className="alerts-header">
          <h3>Spending Alerts</h3>
          <div className="alert-settings">
            <label>
              Alert threshold:
              <select
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(parseInt(e.target.value))}
                className="threshold-select"
              >
                <option value={80}>80%</option>
                <option value={90}>90%</option>
                <option value={95}>95%</option>
              </select>
            </label>
          </div>
        </div>
        <div className="no-alerts">
          <p>✅ All categories are within budget!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="spending-alerts">
      <div className="alerts-header">
        <h3>Spending Alerts</h3>
        <div className="alert-settings">
          <label>
            Alert threshold:
            <select
              value={alertThreshold}
              onChange={(e) => setAlertThreshold(parseInt(e.target.value))}
              className="threshold-select"
            >
              <option value={80}>80%</option>
              <option value={90}>90%</option>
              <option value={95}>95%</option>
            </select>
          </label>
        </div>
      </div>

      <div className="alerts-list">
        {alerts.map((alert) => {
          const category = categorySpending.find((c) => c.categoryId === alert.categoryId);
          return (
            <div
              key={alert.categoryId}
              className={`alert-item ${alert.type}`}
            >
              <div className="alert-icon">
                {alert.type === 'critical' ? '🚨' : '⚠️'}
              </div>
              <div className="alert-content">
                <div className="alert-title">
                  {alert.type === 'critical' ? 'Over Budget!' : 'Near Budget Limit'}
                </div>
                <div className="alert-category">{alert.categoryName}</div>
                <div className="alert-details">
                  {alert.percentage.toFixed(1)}% of budget used
                  {category && (
                    <>
                      <br />
                      Spent: {formatCurrency(category.spentCents)} / Budget: {formatCurrency(category.budgetCents)}
                      <br />
                      Remaining: {formatCurrency(category.remainingCents)}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpendingAlerts;

