import React from 'react';

function PasswordInput({ value, onChange }) {
  return (
    <div className="input-container">
      <input
        type="password"
        placeholder="Enter password"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default PasswordInput;