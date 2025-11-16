// LocalStorage service for Budget Planner

const STORAGE_KEYS = {
  TRANSACTIONS: 'budgetPlanner_transactions',
  BUDGET_LIMITS: 'budgetPlanner_budgetLimits'
};

// Initialize with default data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
    const defaultTransactions = [
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
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(defaultTransactions));
  }

  if (!localStorage.getItem(STORAGE_KEYS.BUDGET_LIMITS)) {
    const defaultBudgetLimits = [
      { category: 'food', limit: 500 },
      { category: 'transport', limit: 200 },
      { category: 'entertainment', limit: 300 },
      { category: 'bills', limit: 400 },
      { category: 'shopping', limit: 300 },
      { category: 'healthcare', limit: 200 },
      { category: 'education', limit: 500 },
      { category: 'other-expense', limit: 200 }
    ];
    localStorage.setItem(STORAGE_KEYS.BUDGET_LIMITS, JSON.stringify(defaultBudgetLimits));
  }
};

// Transactions
export const getTransactions = () => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  return data ? JSON.parse(data) : [];
};

export const saveTransactions = (transactions) => {
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
};

export const addTransaction = (transaction) => {
  const transactions = getTransactions();
  transactions.unshift(transaction);
  saveTransactions(transactions);
  return transactions;
};

export const deleteTransaction = (id) => {
  const transactions = getTransactions();
  const filtered = transactions.filter(t => t.id !== id);
  saveTransactions(filtered);
  return filtered;
};

// Budget Limits
export const getBudgetLimits = () => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.BUDGET_LIMITS);
  return data ? JSON.parse(data) : [];
};

export const saveBudgetLimits = (budgetLimits) => {
  localStorage.setItem(STORAGE_KEYS.BUDGET_LIMITS, JSON.stringify(budgetLimits));
};

export const updateBudgetLimit = (category, limit) => {
  const budgetLimits = getBudgetLimits();
  const exists = budgetLimits.find(b => b.category === category);
  
  let updated;
  if (exists) {
    updated = budgetLimits.map(b => 
      b.category === category ? { ...b, limit } : b
    );
  } else {
    updated = [...budgetLimits, { category, limit }];
  }
  
  saveBudgetLimits(updated);
  return updated;
};

// Clear all data
export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
  localStorage.removeItem(STORAGE_KEYS.BUDGET_LIMITS);
  initializeStorage();
};
