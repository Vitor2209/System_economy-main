import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { EXPENSE_CATEGORIES } from '../mock';
import { AlertCircle, TrendingUp } from 'lucide-react';

const Categories = ({ transactions, budgetLimits }) => {
  const categoryStats = useMemo(() => {
    const expenseMap = {};
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
      });

    return EXPENSE_CATEGORIES.map(cat => {
      const spent = expenseMap[cat.id] || 0;
      const budget = budgetLimits.find(b => b.category === cat.id);
      const limit = budget?.limit || 0;
      const percentage = limit > 0 ? (spent / limit) * 100 : 0;
      const transactionCount = transactions.filter(
        t => t.type === 'expense' && t.category === cat.id
      ).length;

      return {
        ...cat,
        spent,
        limit,
        percentage,
        transactionCount,
        remaining: limit - spent
      };
    });
  }, [transactions, budgetLimits]);

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusIcon = (percentage) => {
    if (percentage >= 90) return <AlertCircle className="text-red-500" size={20} />;
    return <TrendingUp className="text-green-500" size={20} />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
        <p className="text-gray-600 mt-1">Track your spending by category</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoryStats.map(category => (
          <Card key={category.id} className="bg-white/80 backdrop-blur border-none shadow-lg card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.name}</span>
                </CardTitle>
                {category.limit > 0 && getStatusIcon(category.percentage)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600">Spent</div>
                  <div className="text-2xl font-bold" style={{ color: category.color }}>
                    ${category.spent.toFixed(2)}
                  </div>
                </div>
                {category.limit > 0 && (
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Budget</div>
                    <div className="text-2xl font-bold text-gray-700">
                      ${category.limit.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>

              {category.limit > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">{category.percentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${getProgressColor(category.percentage)}`}
                      style={{ width: `${Math.min(category.percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Remaining</span>
                    <span className={`font-semibold ${
                      category.remaining >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${Math.abs(category.remaining).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {category.limit === 0 && (
                <div className="text-sm text-gray-500 italic">
                  No budget limit set
                </div>
              )}

              <div className="pt-2 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  {category.transactionCount} transaction{category.transactionCount !== 1 ? 's' : ''}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
