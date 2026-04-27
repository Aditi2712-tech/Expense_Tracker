"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditAccountPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    university: "",
    course: ""
  });

  useEffect(() => {
    setFormData({
      name: localStorage.getItem("userName") || "",
      email: localStorage.getItem("userEmail") || "",
      age: localStorage.getItem("userAge") || "",
      gender: localStorage.getItem("userGender") || "",
      university: localStorage.getItem("userUniversity") || "",
      course: localStorage.getItem("userCourse") || ""
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("userAge", formData.age);
    localStorage.setItem("userGender", formData.gender);
    localStorage.setItem("userUniversity", formData.university);
    localStorage.setItem("userCourse", formData.course);
    
    // Redirect back to account details page
    router.push("/account");
  };

  return (
    <div className="container">
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Edit Profile</h1>
        <Link href="/account">
          <button className="secondary" style={{ padding: '0.5rem 1.5rem' }}>Cancel</button>
        </Link>
      </header>

      <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Age</label>
              <input 
                type="number" 
                name="age" 
                value={formData.age} 
                onChange={handleChange} 
                min="13" 
                max="120" 
                required 
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>University / College</label>
            <input 
              type="text" 
              name="university" 
              value={formData.university} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Course / Major</label>
            <input 
              type="text" 
              name="course" 
              value={formData.course} 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="primary" style={{ marginTop: '1rem' }}>Save Changes</button>
        </form>
      </div>
    </div>
  );
}
