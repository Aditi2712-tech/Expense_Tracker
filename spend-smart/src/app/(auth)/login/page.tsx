"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Mock login functionality
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      router.push("/");
    } else {
      setError("Please enter both email and password.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Sign in to your SpendSmart account</p>
        
        {error && <p style={{ color: "var(--danger)", textAlign: "center" }}>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="student@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="primary">Sign In</button>
        </form>
        
        <div className="auth-links">
          Don't have an account? <Link href="/signup">Sign up here</Link>
        </div>
      </div>
    </div>
  );
}
