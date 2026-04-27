"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Transaction } from "@/data/mock";

type AnalyticsSummary = {
  totalSpent: number;
  totalIncome: number;
  balance: number;
  categoryBreakdown: Record<string, number>;
};

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  
  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    merchantName: '',
    category: 'Food',
    paymentMode: 'UPI',
    type: 'DEBIT'
  });

  const fetchData = async () => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data));
      
    fetch('/api/analytics/summary')
      .then(res => res.json())
      .then(data => setSummary(data));
  };

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus !== "true") {
      router.push("/login");
      return;
    }
    setIsAuthenticated(true);
    fetchData();
  }, [router]);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newExpense,
        amount: parseFloat(newExpense.amount)
      })
    });
    
    if (response.ok) {
      setIsAddModalOpen(false);
      setNewExpense({
        amount: '',
        merchantName: '',
        category: 'Food',
        paymentMode: 'UPI',
        type: 'DEBIT'
      });
      fetchData(); // Refresh data
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="container">
      <header className="header">
        <h1>SpendSmart</h1>
        <div className="header-actions">
          <Link href="/account">
            <button className="secondary">Account Details</button>
          </Link>
          <button className="primary" onClick={() => setIsAddModalOpen(true)}>+ Add Expense</button>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="glass-card">
          <div className="stat-label">Total Balance</div>
          <div className="stat-value">₹{summary?.balance ?? '...'}</div>
        </div>
        <div className="glass-card">
          <div className="stat-label">Total Spent</div>
          <div className="stat-value negative">₹{summary?.totalSpent ?? '...'}</div>
        </div>
        <div className="glass-card">
          <div className="stat-label">Total Income</div>
          <div className="stat-value positive">₹{summary?.totalIncome ?? '...'}</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-card" style={{ gridColumn: 'span 2' }}>
          <h3 style={{ marginTop: 0 }}>Recent Transactions</h3>
          <div className="transaction-list">
            {transactions.map(t => (
              <div key={t.id} className="transaction-item">
                <div className="transaction-info">
                  <h4>{t.merchantName} <span className="badge">{t.category}</span></h4>
                  <p>{new Date(t.date).toLocaleDateString()} • {t.paymentMode}</p>
                </div>
                <div className={`transaction-amount ${t.type === 'DEBIT' ? 'negative' : 'positive'}`}>
                  {t.type === 'DEBIT' ? '-' : '+'}₹{t.amount}
                </div>
              </div>
            ))}
            {transactions.length === 0 && <p>No recent transactions.</p>}
          </div>
        </div>
        
        <div className="glass-card">
          <h3 style={{ marginTop: 0 }}>Spending by Category</h3>
          <div className="transaction-list">
            {summary && Object.entries(summary.categoryBreakdown).map(([category, amount]) => (
              <div key={category} className="transaction-item">
                <div className="transaction-info">
                  <h4>{category}</h4>
                </div>
                <div className="transaction-amount negative">
                  ₹{amount}
                </div>
              </div>
            ))}
            {(!summary || Object.keys(summary.categoryBreakdown).length === 0) && <p>No data.</p>}
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-card">
            <div className="modal-header">
              <h2>Add New Transaction</h2>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleAddExpense}>
              <div className="form-group">
                <label>Amount (₹)</label>
                <input 
                  type="number" 
                  value={newExpense.amount} 
                  onChange={e => setNewExpense({...newExpense, amount: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Merchant / Title</label>
                <input 
                  type="text" 
                  value={newExpense.merchantName} 
                  onChange={e => setNewExpense({...newExpense, merchantName: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={newExpense.category} onChange={e => setNewExpense({...newExpense, category: e.target.value})}>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Subscriptions">Subscriptions</option>
                  <option value="Academics">Academics</option>
                  <option value="Bills">Bills</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Type</label>
                  <select value={newExpense.type} onChange={e => setNewExpense({...newExpense, type: e.target.value})}>
                    <option value="DEBIT">Expense (Debit)</option>
                    <option value="CREDIT">Income (Credit)</option>
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Mode</label>
                  <select value={newExpense.paymentMode} onChange={e => setNewExpense({...newExpense, paymentMode: e.target.value})}>
                    <option value="UPI">UPI</option>
                    <option value="CARD">Card</option>
                    <option value="CASH">Cash</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="primary">Save Transaction</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
