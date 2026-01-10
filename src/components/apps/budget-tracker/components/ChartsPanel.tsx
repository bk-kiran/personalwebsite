import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MonthSummary, Transaction } from '../types';
import { formatCurrency } from '../utils';
import { format, parseISO, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';

interface ChartsPanelProps {
  summary: MonthSummary;
  transactions: Transaction[];
  currentMonth: string;
}

const ChartsPanel: React.FC<ChartsPanelProps> = ({
  summary,
  transactions,
  currentMonth,
}) => {
  // Category spending data for pie chart
  const categoryData = summary.categorySpending
    .filter(cat => cat.spentCents > 0)
    .map(cat => ({
      name: cat.categoryName,
      value: cat.spentCents,
      percentage: ((cat.spentCents / summary.expensesCents) * 100).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value);

  // Daily spending trend
  const monthStart = startOfMonth(parseISO(`${currentMonth}-01`));
  const monthEnd = endOfMonth(monthStart);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const dailyData = daysInMonth.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    const dayTransactions = transactions.filter(
      tx => tx.type === 'expense' && tx.dateISO === dayStr
    );
    const total = dayTransactions.reduce((sum, tx) => sum + tx.amountCents, 0);
    return {
      date: format(day, 'MMM dd'),
      amount: total / 100, // Convert to dollars for chart
      count: dayTransactions.length,
    };
  });

  const COLORS = ['#667eea', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1', '#6b7280'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p>{payload[0].name}</p>
          <p>{formatCurrency(payload[0].value * 100)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="charts-panel">
      <h3>Charts & Visualizations</h3>

      <div className="charts-grid">
        {/* Category Spending Pie Chart */}
        <div className="chart-card">
          <h4>Spending by Category</h4>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No spending data to display</p>
          )}
        </div>

        {/* Daily Spending Trend */}
        <div className="chart-card">
          <h4>Daily Spending Trend</h4>
          {summary.expensesCents > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value * 100)}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Bar dataKey="amount" fill="#667eea" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No spending data to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartsPanel;

