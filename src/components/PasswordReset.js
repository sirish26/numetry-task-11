import React, { useState } from 'react';
import axios from 'axios';

function PasswordReset({ setResetPassword }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:5000/reset-password', {
        email,
      });
      if (response.data.success) {
        alert('Password reset email sent.');
        setResetPassword(false); // Redirect to login after sending reset email
      } else {
        alert('Error sending reset email. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className='register-form'>
      <h2>Reset Password</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
      
    </div>
  );
}

export default PasswordReset;
