import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      
      if (response.data.success) {
        navigate('/dashboard', { state: { id: email } });
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Error logging in");
      console.log(error);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <div className="error">{error}</div>} {/* Moved error display outside the form */}
      <br />
      <br />
      <div className="link">
        Don't have an account? <Link to="/register">Register</Link><br />
        forgotten password? <Link to="/reset-password">Reset</Link> <br />
        <br /><h2>Dashboard</h2>
        im still facing errors it may be a backend problem; I'm still working on this <Link to="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}

export default Login;
