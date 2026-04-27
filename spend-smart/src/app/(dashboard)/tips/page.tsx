"use client";

import { useState } from "react";

const initialTips = [
  {
    id: 1,
    title: "💡 High Food Expenses Detected",
    description: "You have spent a significant portion of your budget on Food & Dining recently. Consider cooking at home or meal prepping to save up to ₹2,000 this month.",
    action: "View Food Budget",
    type: "warning"
  },
  {
    id: 2,
    title: "💡 Unused Subscriptions",
    description: "We noticed you paid for a Netflix subscription but have multiple entertainment bills. Reviewing your active subscriptions could save you ₹499/month.",
    action: "Review Subscriptions",
    type: "info"
  },
  {
    id: 3,
    title: "💡 Great Job on Academics!",
    description: "Your academic spending is well within budget. Keep tracking your book and course purchases to stay on target.",
    action: "Share Milestone",
    type: "success"
  }
];

export default function TipsPage() {
  const [tips, setTips] = useState(initialTips);

  const handleDismiss = (id: number) => {
    setTips(tips.filter(tip => tip.id !== id));
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Saving Tips</h1>
      </header>

      <div className="dashboard-grid">
        {tips.length === 0 ? (
          <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
            <h2 style={{ color: 'var(--text-primary)' }}>All Caught Up! 🎉</h2>
            <p style={{ color: 'var(--text-secondary)' }}>You have reviewed all your saving tips. Keep up the good financial habits!</p>
            <button className="primary" onClick={() => setTips(initialTips)} style={{ marginTop: '1rem', width: 'auto' }}>
              Reset Tips
            </button>
          </div>
        ) : (
          tips.map(tip => (
            <div key={tip.id} className="glass-card tip-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginTop: 0, color: 'var(--accent-color)' }}>{tip.title}</h3>
              <p style={{ flex: 1, color: 'var(--text-primary)' }}>{tip.description}</p>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button className="primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.9rem' }} onClick={() => alert(`Action: ${tip.action}`)}>
                  {tip.action}
                </button>
                <button className="secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.9rem' }} onClick={() => handleDismiss(tip.id)}>
                  Dismiss
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
