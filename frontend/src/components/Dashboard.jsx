import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../mock';
import { Alert, AlertDescription } from './ui/alert';

const Dashboard = ({ transactions, budgetLimits }) => {
  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      income,
      expenses,
      balance: income - expenses
    };
  }, [transactions]);

  const expensesByCategory = useMemo(() => {
    const categoryMap = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      });
    
    return EXPENSE_CATEGORIES.map(cat => ({
      name: cat.name,
      value: categoryMap[cat.id] || 0,
      color: cat.color
    })).filter(item => item.value > 0);
  }, [transactions]);

  const budgetAlerts = useMemo(() => {
    const alerts = [];
    const expenseMap = {};
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
      });

    budgetLimits.forEach(budget => {
      const spent = expenseMap[budget.category] || 0;
      const percentage = (spent / budget.limit) * 100;
      
      if (percentage >= 90) {
        const category = EXPENSE_CATEGORIES.find(c => c.id === budget.category);
        alerts.push({
          category: category?.name || budget.category,
          spent,
          limit: budget.limit,
          percentage
        });
      }
    });
    
    return alerts;
  }, [transactions, budgetLimits]);

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [transactions]);

  const getCategoryName = (categoryId, type) => {
    const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    return categories.find(c => c.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-hover bg-white/80 backdrop-blur border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Income</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${stats.income.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="card-hover bg-white/80 backdrop-blur border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Expenses</CardTitle>
            <TrendingDown className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">${stats.expenses.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="card-hover bg-white/80 backdrop-blur border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Balance</CardTitle>
            <DollarSign className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${
              stats.balance >= 0 ? 'text-blue-600' : 'text-red-600'
            }`}>
              ${Math.abs(stats.balance).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {budgetAlerts.length > 0 && (
        <div className="space-y-3">
          {budgetAlerts.map((alert, idx) => (
            <Alert key={idx} className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>{alert.category}</strong>: You've spent ${alert.spent.toFixed(2)} of your ${alert.limit.toFixed(2)} budget ({alert.percentage.toFixed(0)}%)
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {expensesByCategory.length > 0 ? (
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={expensesByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expensesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                No expense data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={[
                  { name: 'Income', amount: stats.income, fill: '#10b981' },
                  { name: 'Expenses', amount: stats.expenses, fill: '#ef4444' }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/80 backdrop-blur border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-800">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.map(transaction => {
                const isIncome = transaction.type === 'income';
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{transaction.description}</div>
                      <div className="text-sm text-gray-500">
                        {getCategoryName(transaction.category, transaction.type)} • {transaction.date}
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${
                      isIncome ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">No transactions yet</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
