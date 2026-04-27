export default function BankPage() {
  return (
    <div className="container">
      <header className="header">
        <h1>Bank Accounts</h1>
      </header>

      <div className="dashboard-grid">
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
