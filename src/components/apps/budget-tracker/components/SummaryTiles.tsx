import React from 'react';
import type { MonthSummary } from '../types';
import { formatCurrency } from '../utils';

interface SummaryTilesProps {
  summary: MonthSummary;
}

const SummaryTiles: React.FC<SummaryTilesProps> = ({ summary }) => {
  return (
    <div className="summary-tiles">
      <div className="summary-tile income">
        <div className="tile-label">Income</div>
        <div className="tile-value">{formatCurrency(summary.incomeCents)}</div>
      </div>
      <div className="summary-tile expense">
        <div className="tile-label">Expenses</div>
        <div className="tile-value">{formatCurrency(summary.expensesCents)}</div>
      </div>
      <div className={`summary-tile net ${summary.netCents >= 0 ? 'positive' : 'negative'}`}>
        <div className="tile-label">Net</div>
        <div className="tile-value">{formatCurrency(summary.netCents)}</div>
      </div>
      <div className="summary-tile safe">
        <div className="tile-label">Safe to Spend</div>
        <div className="tile-value">{formatCurrency(summary.safeToSpendCents)}</div>
      </div>
    </div>
  );
};

export default SummaryTiles;

