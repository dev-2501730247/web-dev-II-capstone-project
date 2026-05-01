import React, { useState, useEffect } from 'react';
import './App.css';
import { Dumbbell, UserPlus, Trash2, Users } from 'lucide-react';

function App() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState('Monthly');

  // Load data from LocalStorage
  useEffect(() => {
    const savedData = localStorage.getItem('gym_data');
    if (savedData) {
      setMembers(JSON.parse(savedData));
    }
  }, []);

  // Save data to LocalStorage
  useEffect(() => {
    localStorage.setItem('gym_data', JSON.stringify(members));
  }, [members]);

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!name || !phone) return alert("Please enter name and phone!");

    const newMember = {
      id: Date.now(),
      name,
      phone,
      plan,
      date: new Date().toLocaleDateString()
    };

    setMembers([newMember, ...members]);
    setName('');
    setPhone('');
  };

  const removeMember = (id) => {
    const filtered = members.filter(m => m.id !== id);
    setMembers(filtered);
  };

  return (
    <div className="container">
      <div className="header">
        <h1><Dumbbell size={32} /> DEV KAUSHIK GYM MANAGER</h1>
      </div>

      <form className="add-form" onSubmit={handleAddMember}>
        <input 
          placeholder="Member Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          placeholder="Phone Number" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
        />
        <select value={plan} onChange={(e) => setPlan(e.target.value)}>
          <option value="Monthly">Monthly (₹1000)</option>
          <option value="Quarterly">Quarterly (₹2500)</option>
          <option value="Yearly">Yearly (₹8000)</option>
        </select>
        <button type="submit"><UserPlus size={18} /> Add</button>
      </form>

      <div className="member-list">
        <h3><Users size={20} /> Registered Members ({members.length})</h3>
        {members.length === 0 && <p style={{color: '#9ca3af'}}>No members found.</p>}
        {members.map(m => (
          <div key={m.id} className="member-card">
            <div>
              <div style={{fontWeight: 'bold', fontSize: '1.1rem'}}>{m.name}</div>
              <div style={{color: '#9ca3af', fontSize: '0.9rem'}}>{m.phone} | Joined: {m.date}</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
              <span style={{color: '#34d399', fontWeight: 'bold'}}>{m.plan}</span>
              <button className="delete-btn" onClick={() => removeMember(m.id)}>
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;