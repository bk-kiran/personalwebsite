// Type definitions for Budget Tracker

export type TransactionType = 'income' | 'expense';

export type SubscriptionCadence = 'monthly' | 'weekly' | 'yearly' | 'custom';

export interface Transaction {
  id: string;
  type: TransactionType;
  dateISO: string; // YYYY-MM-DD format
  amountCents: number; // Stored as integer to avoid floating-point issues
  name: string;
  categoryId?: string;
  notes?: string;
  paymentMethod?: string;
  subscriptionId?: string; // If materialized from subscription
  subscriptionOccurrenceDate?: string; // Date of the subscription occurrence
  createdAtISO: string;
  updatedAtISO: string;
}

export interface Subscription {
  id: string;
  name: string;
  amountCents: number;
  categoryId?: string;
  cadence: SubscriptionCadence;
  nextBillingDateISO: string; // YYYY-MM-DD
  endDateISO?: string; // YYYY-MM-DD, optional
  active: boolean;
  autopay: boolean;
  customDays?: number; // For custom cadence
  createdAtISO: string;
  updatedAtISO: string;
}

export interface Category {
  id: string;
  name: string;
  color: string; // Hex color code
}

export interface MonthBudget {
  monthKey: string; // YYYY-MM format
  categoryBudgets: Record<string, number>; // categoryId -> amountCents
  createdAtISO: string;
  updatedAtISO: string;
}

export interface Rule {
  id: string;
  matchText: string;
  categoryId: string;
  appliesTo: 'expense' | 'income' | 'both';
  createdAtISO: string;
}

export interface MonthData {
  monthKey: string;
  transactions: Transaction[];
  subscriptions: Subscription[];
  budgets: MonthBudget | null;
  categories: Category[];
}

// Utility types for calculations
export interface CategorySpending {
  categoryId: string;
  categoryName: string;
  budgetCents: number;
  spentCents: number;
  remainingCents: number;
  percentageUsed: number;
}

export interface MonthSummary {
  incomeCents: number;
  expensesCents: number;
  netCents: number;
  safeToSpendCents: number;
  categorySpending: CategorySpending[];
}

