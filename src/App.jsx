import React, { useState } from 'react';
import PasswordInput from './components/PasswordInput';
import PasswordStrength from './components/PasswordStrength';
import './App.css';

function App() {
  const [password, setPassword] = useState('');

  return (
    <div className="app-container">
      <h2>Password Strength Meter</h2>
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordStrength password={password} />
    </div>
  );
}

export default App;