import React from 'react';

function PasswordStrength({ password }) {
  
const hasLower = /[a-z]/.test(password);
const hasUpper = /[A-Z]/.test(password);
const hasNumber = /[0-9]/.test(password);
const hasSpecial = /[^a-zA-Z0-9]/.test(password);

const criteriaMet = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

let label = '';
let color = 'transparent';

if (password.length === 0) {
  label = '';
  color = 'transparent';
} else if (password.length < 8 || criteriaMet <= 1) {
  label = 'Weak';
  color = 'red';
} else if (criteriaMet === 2 || criteriaMet === 3) {
  label = 'Medium';
  color = 'orange';
} else if (criteriaMet === 4) {
  label = 'Strong';
  color = 'green';
}



  return (
    <div className="strength-container">
      <div
        data-testid="strength-bar"
        style={{
          height: '10px',
          width: '100%',
          backgroundColor: color,
          transition: 'background-color 0.3s'
        }}
      />
      <p data-testid="strength-label">{label}</p>
    </div>
  );
}

export default PasswordStrength;