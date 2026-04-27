"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus !== "true") {
      router.push("/login");
      return;
    }
    
    setUser({
      name: localStorage.getItem("userName") || "Student User",
      email: localStorage.getItem("userEmail") || "student@university.edu"
    });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="container">
      <header className="header">
        <h1>Account Details</h1>
        <div className="header-actions">
          <Link href="/">
            <button className="secondary">← Back to Dashboard</button>
          </Link>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="glass-card">
          <h3 style={{ marginTop: 0 }}>Profile Information</h3>
          <div className="transaction-list">
            <div className="transaction-item">
              <div className="transaction-info">
                <p>Full Name</p>
                <h4>{user.name}</h4>
              </div>
            </div>
            <div className="transaction-item">
              <div className="transaction-info">
                <p>Email Address</p>
                <h4>{user.email}</h4>
              </div>
            </div>
            <div className="transaction-item">
              <div className="transaction-info">
                <p>Account Status</p>
                <h4><span className="badge positive">Active</span></h4>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <button className="secondary" onClick={handleLogout} style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
              Log Out
            </button>
          </div>
        </div>
        
        <div className="glass-card">
          <h3 style={{ marginTop: 0 }}>Linked Bank Accounts</h3>
          <div className="transaction-list">
            <div className="transaction-item">
              <div className="transaction-info">
                <h4>HDFC Bank <span className="badge">Primary</span></h4>
                <p>Checking •••• 4598</p>
              </div>
              <div className="transaction-amount positive">
                Active
              </div>
            </div>
            <div className="transaction-item">
              <div className="transaction-info">
                <h4>Paytm Payments Bank</h4>
                <p>Wallet & UPI</p>
              </div>
              <div className="transaction-amount positive">
                Active
              </div>
            </div>
            
            <button className="secondary" style={{ width: '100%', marginTop: '1rem', textAlign: 'center' }}>
              + Link New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
