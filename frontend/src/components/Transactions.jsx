import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Trash2, Filter } from 'lucide-react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../mock';
import { toast } from '../hooks/use-toast';

const Transactions = ({ transactions, addTransaction, deleteTransaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.amount || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });

    toast({
      title: "Success",
      description: "Transaction added successfully"
    });

    setFormData({
      type: 'expense',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    deleteTransaction(id);
    toast({
      title: "Success",
      description: "Transaction deleted"
    });
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      if (filterType !== 'all' && t.type !== filterType) return false;
      if (filterCategory !== 'all' && t.category !== filterCategory) return false;
      return true;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, filterType, filterCategory]);

  const getCategoryName = (categoryId, type) => {
    const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    return categories.find(c => c.id === categoryId)?.name || categoryId;
  };

  const totalAmount = useMemo(() => {
    return filteredTransactions.reduce((sum, t) => {
      return sum + (t.type === 'income' ? t.amount : -t.amount);
    }, 0);
  }, [filteredTransactions]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
          <p className="text-gray-600 mt-1">Manage your income and expenses</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white shadow-lg">
              <Plus className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData({ ...formData, type: value, category: '' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {(formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Amount</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600">
                Add Transaction
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white/80 backdrop-blur border-none shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center space-x-2">
              <Filter size={20} />
              <span>Filters</span>
            </CardTitle>
            <div className="text-lg font-semibold">
              Total: <span className={totalAmount >= 0 ? 'text-green-600' : 'text-red-600'}>
                {totalAmount >= 0 ? '+' : ''}${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {INCOME_CATEGORIES.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                  {EXPENSE_CATEGORIES.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur border-none shadow-lg">
        <CardHeader>
          <CardTitle>All Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length > 0 ? (
            <div className="space-y-3">
              {filteredTransactions.map(transaction => {
                const isIncome = transaction.type === 'income';
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-white hover:shadow-md transition-all group"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{transaction.description}</div>
                      <div className="text-sm text-gray-500">
                        {getCategoryName(transaction.category, transaction.type)} • {transaction.date}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className={`text-lg font-bold ${
                        isIncome ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(transaction.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              No transactions found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
