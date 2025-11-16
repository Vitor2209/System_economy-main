// Mock data for Budget Planner App

export const INCOME_CATEGORIES = [
  { id: 'salary', name: 'Salary', color: '#10b981' },
  { id: 'freelance', name: 'Freelance', color: '#14b8a6' },
  { id: 'investment', name: 'Investment', color: '#06b6d4' },
  { id: 'other-income', name: 'Other Income', color: '#0ea5e9' }
];

export const EXPENSE_CATEGORIES = [
  { id: 'food', name: 'Food', color: '#f59e0b' },
  { id: 'transport', name: 'Transport', color: '#ef4444' },
  { id: 'entertainment', name: 'Entertainment', color: '#ec4899' },
  { id: 'bills', name: 'Bills', color: '#8b5cf6' },
  { id: 'shopping', name: 'Shopping', color: '#6366f1' },
  { id: 'healthcare', name: 'Healthcare', color: '#f43f5e' },
  { id: 'education', name: 'Education', color: '#3b82f6' },
  { id: 'other-expense', name: 'Other Expense', color: '#64748b' }
];

export const mockTransactions = [
  {
    id: '1',
    type: 'income',
    category: 'salary',
    amount: 5000,
    description: 'Monthly Salary',
    date: '2025-07-01'
  },
  {
    id: '2',
    type: 'expense',
    category: 'food',
    amount: 120,
    description: 'Grocery Shopping',
    date: '2025-07-02'
  },
  {
    id: '3',
    type: 'expense',
    category: 'transport',
    amount: 50,
    description: 'Gas',
    date: '2025-07-03'
  },
  {
    id: '4',
    type: 'expense',
    category: 'entertainment',
    amount: 80,
    description: 'Movie & Dinner',
    date: '2025-07-05'
  },
  {
    id: '5',
    type: 'income',
    category: 'freelance',
    amount: 800,
    description: 'Web Design Project',
    date: '2025-07-06'
  },
  {
    id: '6',
    type: 'expense',
    category: 'bills',
    amount: 150,
    description: 'Electricity Bill',
    date: '2025-07-08'
  },
  {
    id: '7',
    type: 'expense',
    category: 'shopping',
    amount: 200,
    description: 'Clothing',
    date: '2025-07-10'
  },
  {
    id: '8',
    type: 'expense',
    category: 'healthcare',
    amount: 100,
    description: 'Medical Checkup',
    date: '2025-07-12'
  }
];

export const mockBudgetLimits = [
  { category: 'food', limit: 500 },
  { category: 'transport', limit: 200 },
  { category: 'entertainment', limit: 300 },
  { category: 'bills', limit: 400 },
  { category: 'shopping', limit: 300 },
  { category: 'healthcare', limit: 200 },
  { category: 'education', limit: 500 },
  { category: 'other-expense', limit: 200 }
];
