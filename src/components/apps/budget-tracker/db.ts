// IndexedDB database layer using Dexie
import Dexie, { Table } from 'dexie';
import type { Transaction, Subscription, Category, MonthBudget, Rule } from './types';

export class BudgetDatabase extends Dexie {
  transactions!: Table<Transaction, string>;
  subscriptions!: Table<Subscription, string>;
  categories!: Table<Category, string>;
  monthBudgets!: Table<MonthBudget, string>;
  rules!: Table<Rule, string>;
  schemaVersion!: Table<{ version: number }, number>;

  constructor() {
    super('BudgetTrackerDB');
    
    // Define schema
    this.version(1).stores({
      transactions: 'id, dateISO, type, categoryId',
      subscriptions: 'id, nextBillingDateISO, active',
      categories: 'id',
      monthBudgets: 'monthKey',
      rules: 'id',
      schemaVersion: 'version'
    });

    // Initialize default categories if empty
    this.on('ready', async () => {
      const existingVersion = await this.schemaVersion.get(1);
      if (!existingVersion) {
        await this.initializeDefaultData();
        await this.schemaVersion.add({ version: 1 });
      }
    });
  }

  private async initializeDefaultData() {
    const categoryCount = await this.categories.count();
    if (categoryCount === 0) {
      const defaultCategories: Category[] = [
        { id: 'cat-food', name: 'Food & Dining', color: '#ef4444' },
        { id: 'cat-transport', name: 'Transport', color: '#3b82f6' },
        { id: 'cat-shopping', name: 'Shopping', color: '#8b5cf6' },
        { id: 'cat-bills', name: 'Bills & Utilities', color: '#f59e0b' },
        { id: 'cat-entertainment', name: 'Entertainment', color: '#10b981' },
        { id: 'cat-health', name: 'Health & Fitness', color: '#ec4899' },
        { id: 'cat-education', name: 'Education', color: '#6366f1' },
        { id: 'cat-other', name: 'Other', color: '#6b7280' },
      ];
      await this.categories.bulkAdd(defaultCategories);
    }
  }
}

export const db = new BudgetDatabase();

// Repository functions for easier data access
export const transactionRepo = {
  async getAll(): Promise<Transaction[]> {
    return db.transactions.toArray();
  },

  async getByMonth(monthKey: string): Promise<Transaction[]> {
    const startDate = `${monthKey}-01`;
    const endDate = `${monthKey}-31`;
    return db.transactions
      .where('dateISO')
      .between(startDate, endDate, true, true)
      .toArray();
  },

  async getById(id: string): Promise<Transaction | undefined> {
    return db.transactions.get(id);
  },

  async add(transaction: Omit<Transaction, 'id' | 'createdAtISO' | 'updatedAtISO'>): Promise<string> {
    const now = new Date().toISOString();
    const id = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newTransaction: Transaction = {
      ...transaction,
      id,
      createdAtISO: now,
      updatedAtISO: now,
    };
    await db.transactions.add(newTransaction);
    return id;
  },

  async update(id: string, updates: Partial<Transaction>): Promise<void> {
    await db.transactions.update(id, {
      ...updates,
      updatedAtISO: new Date().toISOString(),
    });
  },

  async delete(id: string): Promise<void> {
    await db.transactions.delete(id);
  },
};

export const subscriptionRepo = {
  async getAll(): Promise<Subscription[]> {
    return db.subscriptions.toArray();
  },

  async getActive(): Promise<Subscription[]> {
    return db.subscriptions.where('active').equals(true).toArray();
  },

  async getById(id: string): Promise<Subscription | undefined> {
    return db.subscriptions.get(id);
  },

  async add(subscription: Omit<Subscription, 'id' | 'createdAtISO' | 'updatedAtISO'>): Promise<string> {
    const now = new Date().toISOString();
    const id = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newSubscription: Subscription = {
      ...subscription,
      id,
      createdAtISO: now,
      updatedAtISO: now,
    };
    await db.subscriptions.add(newSubscription);
    return id;
  },

  async update(id: string, updates: Partial<Subscription>): Promise<void> {
    await db.subscriptions.update(id, {
      ...updates,
      updatedAtISO: new Date().toISOString(),
    });
  },

  async delete(id: string): Promise<void> {
    await db.subscriptions.delete(id);
  },
};

export const categoryRepo = {
  async getAll(): Promise<Category[]> {
    return db.categories.toArray();
  },

  async getById(id: string): Promise<Category | undefined> {
    return db.categories.get(id);
  },

  async add(category: Omit<Category, 'id'>): Promise<string> {
    const id = `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newCategory: Category = { ...category, id };
    await db.categories.add(newCategory);
    return id;
  },

  async update(id: string, updates: Partial<Category>): Promise<void> {
    await db.categories.update(id, updates);
  },

  async delete(id: string): Promise<void> {
    await db.categories.delete(id);
  },
};

export const budgetRepo = {
  async getByMonth(monthKey: string): Promise<MonthBudget | null> {
    return (await db.monthBudgets.get(monthKey)) || null;
  },

  async upsert(monthKey: string, categoryBudgets: Record<string, number>): Promise<void> {
    const now = new Date().toISOString();
    const existing = await db.monthBudgets.get(monthKey);
    
    if (existing) {
      await db.monthBudgets.update(monthKey, {
        categoryBudgets,
        updatedAtISO: now,
      });
    } else {
      await db.monthBudgets.add({
        monthKey,
        categoryBudgets,
        createdAtISO: now,
        updatedAtISO: now,
      });
    }
  },

  async getAll(): Promise<MonthBudget[]> {
    return db.monthBudgets.toArray();
  },
};

export const ruleRepo = {
  async getAll(): Promise<Rule[]> {
    return db.rules.toArray();
  },

  async add(rule: Omit<Rule, 'id' | 'createdAtISO'>): Promise<string> {
    const id = `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();
    const newRule: Rule = { ...rule, id, createdAtISO: now };
    await db.rules.add(newRule);
    return id;
  },

  async update(id: string, updates: Partial<Rule>): Promise<void> {
    await db.rules.update(id, updates);
  },

  async delete(id: string): Promise<void> {
    await db.rules.delete(id);
  },
};

