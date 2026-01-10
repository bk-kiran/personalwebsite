# Budget Tracker

A comprehensive monthly budget tracking application built with React, TypeScript, and IndexedDB.

## Features

### Core Features
- **Income & Expense Tracking**: Add, edit, and delete transactions with categories
- **Monthly Budgets**: Set budgets by category for each month
- **Recurring Subscriptions**: Track subscriptions with automatic monthly occurrence generation
- **Local Storage**: All data stored in browser using IndexedDB (Dexie)
- **Export/Import**: Export to CSV or JSON, import JSON backups

### Key Features
- **Month Navigation**: Easy navigation between months with previous/next buttons
- **Summary Tiles**: Quick view of income, expenses, net, and safe-to-spend
- **Category Budgets**: Visual progress bars showing budget usage
- **Transaction Filtering**: Search and filter transactions by type, category, and text
- **Subscription Management**: Mark subscriptions as paid, view occurrences

## Data Model

- **Transactions**: Income and expense entries with date, amount, category, notes
- **Subscriptions**: Recurring payments with cadence (monthly/weekly/yearly/custom)
- **Categories**: Customizable spending categories with colors
- **Month Budgets**: Category-based budgets per month

## Storage

All data is stored locally in the browser using IndexedDB via Dexie. No server or backend required.

## Installation

The app is integrated into the vite-project. Install dependencies:

```bash
npm install
```

Required dependencies:
- `dexie`: IndexedDB wrapper
- `date-fns`: Date utilities
- `typescript`: TypeScript support

## Usage

1. Navigate to the Budget Tracker app from the apps page
2. Select a month using the month picker
3. Add transactions (income/expense)
4. Set category budgets
5. Add subscriptions for recurring expenses
6. View summaries and insights

## File Structure

```
budget-tracker/
├── App.tsx                 # Main app component
├── types.ts               # TypeScript type definitions
├── db.ts                  # IndexedDB database layer
├── utils.ts               # Utility functions
├── index.css              # Styles
├── components/
│   ├── MonthPicker.tsx
│   ├── SummaryTiles.tsx
│   ├── BudgetOverview.tsx
│   ├── BudgetCategoryCard.tsx
│   ├── TransactionTable.tsx
│   ├── TransactionForm.tsx
│   ├── SubscriptionManager.tsx
│   └── SettingsPanel.tsx
└── README.md
```

## Notes

- Currency is stored as integer cents to avoid floating-point precision issues
- Month keys use YYYY-MM format
- Subscriptions can be virtual (projected) or materialized (marked as paid)
- All calculations are deterministic and reproducible

