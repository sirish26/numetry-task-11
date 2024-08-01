import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import'./App.css';

function Register() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/register", {
        email,
        password,
      });
      
      if (response.data === "exist") {
        alert("User already exists");
      } else if (response.data === "notexist") {
        history("/home", { state: { id: email } });
      }
    } catch (error) {
      alert("Error registering");
      console.log(error);
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
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
      <br />
      <br />
      <div className="link">
        Already have an account? <Link to="/">Login</Link>
      </div>
    </div>
  );
}

export default Register;
