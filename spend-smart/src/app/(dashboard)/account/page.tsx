"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type UserProfile = {
  name: string;
  email: string;
  age: string;
  gender: string;
  university: string;
  course: string;
};

export default function AccountPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser({
      name: localStorage.getItem("userName") || "Student User",
      email: localStorage.getItem("userEmail") || "student@university.edu",
      age: localStorage.getItem("userAge") || "20",
      gender: localStorage.getItem("userGender") || "Prefer not to say",
      university: localStorage.getItem("userUniversity") || "State University",
      course: localStorage.getItem("userCourse") || "Computer Science"
    });
  }, []);

  if (!user) return null;

  return (
    <div className="container">
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Account Details</h1>
        <Link href="/account/edit">
          <button className="primary" style={{ padding: '0.5rem 1.5rem' }}>Edit Profile</button>
        </Link>
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
                <p>Age</p>
                <h4>{user.age}</h4>
              </div>
            </div>
            <div className="transaction-item">
              <div className="transaction-info">
                <p>Gender</p>
                <h4>{user.gender}</h4>
              </div>
            </div>
            <div className="transaction-item">
              <div className="transaction-info">
                <p>University / College</p>
                <h4>{user.university}</h4>
              </div>
            </div>
            <div className="transaction-item">
              <div className="transaction-info">
                <p>Course / Major</p>
                <h4>{user.course}</h4>
              </div>
            </div>
            <div className="transaction-item">
              <div className="transaction-info">
                <p>Account Status</p>
                <h4><span className="badge positive">Active</span></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
