// Utility functions for Budget Tracker
import type { Transaction, Subscription, Category, MonthBudget, CategorySpending, MonthSummary } from './types';
import { format, parseISO, startOfMonth, endOfMonth, addMonths, subMonths, isWithinInterval, addDays, addWeeks, addYears } from 'date-fns';

// Money formatting - convert cents to dollars
export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

// Parse currency input to cents
export function parseCurrencyToCents(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const dollars = parseFloat(cleaned) || 0;
  return Math.round(dollars * 100);
}

// Month key utilities
export function getMonthKey(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'yyyy-MM');
}

export function getCurrentMonthKey(): string {
  return getMonthKey(new Date());
}

export function getMonthDisplay(monthKey: string): string {
  const date = parseISO(`${monthKey}-01`);
  return format(date, 'MMMM yyyy');
}

export function getPreviousMonth(monthKey: string): string {
  const date = parseISO(`${monthKey}-01`);
  return getMonthKey(subMonths(date, 1));
}

export function getNextMonth(monthKey: string): string {
  const date = parseISO(`${monthKey}-01`);
  return getMonthKey(addMonths(date, 1));
}

// Calculate subscription occurrences for a month
export function getSubscriptionOccurrences(
  subscription: Subscription,
  monthKey: string
): Array<{ date: string; amountCents: number }> {
  if (!subscription.active) return [];

  const monthStart = parseISO(`${monthKey}-01`);
  const monthEnd = endOfMonth(monthStart);
  const occurrences: Array<{ date: string; amountCents: number }> = [];
  let currentDate = parseISO(subscription.nextBillingDateISO);

  // If subscription has ended, return empty
  if (subscription.endDateISO) {
    const endDate = parseISO(subscription.endDateISO);
    if (endDate < monthStart) return [];
  }

  // Find first occurrence in or before the month
  while (currentDate > monthStart && subscription.cadence !== 'custom') {
    switch (subscription.cadence) {
      case 'monthly':
        currentDate = subMonths(currentDate, 1);
        break;
      case 'weekly':
        currentDate = subWeeks(currentDate, 1);
        break;
      case 'yearly':
        currentDate = subYears(currentDate, 1);
        break;
    }
  }

  // Generate occurrences within the month
  const maxIterations = 100; // Safety limit
  let iterations = 0;

  while (currentDate <= monthEnd && iterations < maxIterations) {
    if (isWithinInterval(currentDate, { start: monthStart, end: monthEnd })) {
      occurrences.push({
        date: format(currentDate, 'yyyy-MM-dd'),
        amountCents: subscription.amountCents,
      });
    }

    switch (subscription.cadence) {
      case 'monthly':
        currentDate = addMonths(currentDate, 1);
        break;
      case 'weekly':
        currentDate = addWeeks(currentDate, 1);
        break;
      case 'yearly':
        currentDate = addYears(currentDate, 1);
        break;
      case 'custom':
        if (subscription.customDays) {
          currentDate = addDays(currentDate, subscription.customDays);
        } else {
          return occurrences; // Can't continue without customDays
        }
        break;
    }

    iterations++;

    // Check if subscription has ended
    if (subscription.endDateISO) {
      const endDate = parseISO(subscription.endDateISO);
      if (currentDate > endDate) break;
    }
  }

  return occurrences;
}

// Calculate month summary
export function calculateMonthSummary(
  transactions: Transaction[],
  subscriptions: Subscription[],
  budgets: MonthBudget | null,
  categories: Category[],
  monthKey: string
): MonthSummary {
  // Calculate income and expenses from transactions
  let incomeCents = 0;
  let expensesCents = 0;

  transactions.forEach((tx) => {
    if (tx.type === 'income') {
      incomeCents += tx.amountCents;
    } else {
      expensesCents += tx.amountCents;
    }
  });

  // Add subscription occurrences that aren't materialized
  subscriptions.forEach((sub) => {
    const occurrences = getSubscriptionOccurrences(sub, monthKey);
    occurrences.forEach((occ) => {
      // Check if this occurrence is already materialized
      const isMaterialized = transactions.some(
        (tx) =>
          tx.subscriptionId === sub.id &&
          tx.subscriptionOccurrenceDate === occ.date
      );
      if (!isMaterialized) {
        expensesCents += occ.amountCents;
      }
    });
  });

  const netCents = incomeCents - expensesCents;

  // Calculate category spending
  const categorySpendingMap = new Map<string, { spent: number; budget: number }>();

  // Initialize with budgets
  if (budgets) {
    Object.entries(budgets.categoryBudgets).forEach(([catId, budgetCents]) => {
      categorySpendingMap.set(catId, { spent: 0, budget: budgetCents });
    });
  }

  // Add transaction spending
  transactions
    .filter((tx) => tx.type === 'expense' && tx.categoryId)
    .forEach((tx) => {
      const existing = categorySpendingMap.get(tx.categoryId!) || { spent: 0, budget: 0 };
      existing.spent += tx.amountCents;
      categorySpendingMap.set(tx.categoryId!, existing);
    });

  // Add subscription spending
  subscriptions.forEach((sub) => {
    if (sub.categoryId) {
      const occurrences = getSubscriptionOccurrences(sub, monthKey);
      const isMaterialized = transactions.some(
        (tx) => tx.subscriptionId === sub.id
      );
      if (!isMaterialized) {
        const total = occurrences.reduce((sum, occ) => sum + occ.amountCents, 0);
        const existing = categorySpendingMap.get(sub.categoryId) || { spent: 0, budget: 0 };
        existing.spent += total;
        categorySpendingMap.set(sub.categoryId, existing);
      }
    }
  });

  // Convert to CategorySpending array
  const categorySpending: CategorySpending[] = Array.from(categorySpendingMap.entries()).map(
    ([categoryId, data]) => {
      const category = categories.find((c) => c.id === categoryId);
      const remainingCents = data.budget - data.spent;
      const percentageUsed = data.budget > 0 ? (data.spent / data.budget) * 100 : 0;

      return {
        categoryId,
        categoryName: category?.name || 'Uncategorized',
        budgetCents: data.budget,
        spentCents: data.spent,
        remainingCents,
        percentageUsed: Math.min(100, Math.max(0, percentageUsed)),
      };
    }
  );

  // Calculate safe to spend (remaining budget across all categories)
  const totalBudgetCents = categorySpending.reduce((sum, cat) => sum + cat.budgetCents, 0);
  const totalSpentCents = categorySpending.reduce((sum, cat) => sum + cat.spentCents, 0);
  const safeToSpendCents = totalBudgetCents - totalSpentCents;

  return {
    incomeCents,
    expensesCents,
    netCents,
    safeToSpendCents: Math.max(0, safeToSpendCents),
    categorySpending,
  };
}

// CSV Export utilities
export function transactionsToCSV(transactions: Transaction[], categories: Category[]): string {
  const headers = ['Date', 'Type', 'Amount', 'Name', 'Category', 'Payment Method', 'Notes'];
  const rows = transactions.map((tx) => {
    const category = tx.categoryId ? categories.find((c) => c.id === tx.categoryId)?.name : '';
    return [
      tx.dateISO,
      tx.type,
      formatCurrency(tx.amountCents),
      tx.name,
      category || '',
      tx.paymentMethod || '',
      tx.notes || '',
    ];
  });

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  return csvContent;
}

export function exportToJSON(data: {
  transactions: Transaction[];
  subscriptions: Subscription[];
  categories: Category[];
  budgets: MonthBudget[];
  rules: any[];
}): string {
  return JSON.stringify(data, null, 2);
}

