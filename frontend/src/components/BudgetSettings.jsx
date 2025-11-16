import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { EXPENSE_CATEGORIES } from '../mock';
import { Save } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const BudgetSettings = ({ budgetLimits, updateBudgetLimit }) => {
  const [limits, setLimits] = useState(() => {
    const limitsMap = {};
    EXPENSE_CATEGORIES.forEach(cat => {
      const existing = budgetLimits.find(b => b.category === cat.id);
      limitsMap[cat.id] = existing?.limit || '';
    });
    return limitsMap;
  });

  const handleSave = (categoryId) => {
    const value = parseFloat(limits[categoryId]);
    if (isNaN(value) || value < 0) {
      toast({
        title: "Error",
        description: "Please enter a valid budget amount",
        variant: "destructive"
      });
      return;
    }

    updateBudgetLimit(categoryId, value);
    toast({
      title: "Success",
      description: "Budget limit updated"
    });
  };

  const handleChange = (categoryId, value) => {
    setLimits(prev => ({
      ...prev,
      [categoryId]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Budget Settings</h1>
        <p className="text-gray-600 mt-1">Set monthly budget limits for each category</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXPENSE_CATEGORIES.map(category => {
          const currentBudget = budgetLimits.find(b => b.category === category.id);
          return (
            <Card key={category.id} className="bg-white/80 backdrop-blur border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentBudget && (
                  <div className="text-sm text-gray-600">
                    Current limit: <span className="font-semibold">${currentBudget.limit.toFixed(2)}</span>
                  </div>
                )}
                <div>
                  <Label htmlFor={`budget-${category.id}`}>Monthly Budget Limit</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id={`budget-${category.id}`}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={limits[category.id]}
                      onChange={(e) => handleChange(category.id, e.target.value)}
                    />
                    <Button
                      onClick={() => handleSave(category.id)}
                      className="bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600"
                    >
                      <Save size={18} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetSettings;
