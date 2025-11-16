import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Categories from './components/Categories';
import BudgetSettings from './components/BudgetSettings';
import Navbar from './components/Navbar';
import * as storage from './services/localStorage';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [budgetLimits, setBudgetLimits] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    setTransactions(storage.getTransactions());
    setBudgetLimits(storage.getBudgetLimits());
  }, []);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: transaction.date || new Date().toISOString().split('T')[0]
    };
    const updated = storage.addTransaction(newTransaction);
    setTransactions(updated);
  };

  const deleteTransaction = (id) => {
    const updated = storage.deleteTransaction(id);
    setTransactions(updated);
  };

  const updateBudgetLimit = (category, limit) => {
    const updated = storage.updateBudgetLimit(category, limit);
    setBudgetLimits(updated);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  transactions={transactions} 
                  budgetLimits={budgetLimits}
                />
              } 
            />
            <Route 
              path="/transactions" 
              element={
                <Transactions 
                  transactions={transactions}
                  addTransaction={addTransaction}
                  deleteTransaction={deleteTransaction}
                />
              } 
            />
            <Route 
              path="/categories" 
              element={
                <Categories 
                  transactions={transactions}
                  budgetLimits={budgetLimits}
                />
              } 
            />
            <Route 
              path="/budget" 
              element={
                <BudgetSettings 
                  budgetLimits={budgetLimits}
                  updateBudgetLimit={updateBudgetLimit}
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
