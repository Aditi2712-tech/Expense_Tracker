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

  const [linkedAccounts, setLinkedAccounts] = useState([
    { id: 'gpay', name: 'Google Pay', initial: 'G', color: 'linear-gradient(135deg, #f97316, #eab308)', lastSynced: 'Synced just now', url: 'https://pay.google.com/', syncing: false },
    { id: 'paytm', name: 'Paytm', initial: 'P', color: '#0f172a', lastSynced: 'Synced 5m ago', url: 'https://paytm.com/', syncing: false },
    { id: 'hdfc', name: 'HDFC Bank', initial: 'H', color: '#1d4ed8', lastSynced: 'Synced 2h ago', url: 'https://netbanking.hdfcbank.com/', syncing: false }
  ]);

  const handleSyncAccount = (id: string) => {
    setLinkedAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, syncing: true } : acc));
    setTimeout(() => {
      setLinkedAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, syncing: false, lastSynced: 'Synced just now' } : acc));
      fetchData(); // Refresh data to simulate real sync
    }, 1500);
  };

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
        <h1>Dashboard</h1>
        <div className="header-actions">
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

      <div style={{ marginBottom: '2rem' }}>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin { 100% { transform: rotate(360deg); } }
          .spin-anim { animation: spin 1s linear infinite; }
        `}} />
        <h3 style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>Linked Accounts & Wallets</h3>
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {linkedAccounts.map(acc => (
            <div key={acc.id} className="glass-card" style={{ flex: '0 0 auto', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '280px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: acc.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>{acc.initial}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold' }}>{acc.name}</div>
                <div style={{ fontSize: '0.8rem', color: acc.lastSynced === 'Synced just now' ? 'var(--success)' : 'var(--text-secondary)' }}>
                  {acc.syncing ? 'Syncing...' : acc.lastSynced}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  style={{ background: 'none', border: 'none', cursor: acc.syncing ? 'default' : 'pointer', color: 'var(--text-secondary)' }} 
                  title="Sync Now" 
                  disabled={acc.syncing}
                  onClick={() => handleSyncAccount(acc.id)}
                >
                  <svg className={acc.syncing ? 'spin-anim' : ''} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                </button>
                <a href={acc.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }} title={`Open ${acc.name}`}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
            </div>
          ))}
          <button className="secondary" style={{ flex: '0 0 auto', borderStyle: 'dashed' }}>+ Link Account</button>
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
                  <p>
                    {new Date(t.date).toLocaleDateString()} • {t.paymentMode} 
                    {t.source && <span style={{ marginLeft: '0.5rem', color: t.source === 'Manual' ? 'var(--text-secondary)' : 'var(--success)' }}>
                      • {t.source === 'Manual' ? 'Added Manually' : `Synced via ${t.source}`}
                    </span>}
                  </p>
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
                  step="0.01"
                  min="0"
                  placeholder="0.00"
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
