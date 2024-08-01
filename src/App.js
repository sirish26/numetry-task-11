import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Home from './components/home';
import AboutUs from './components/aboutus';
import ContactUs from './components/contact';
import AttendanceRecords from './components/attendancerecords';
import Reviews from './components/reviews';
import Query from './components/query';
import Login from './components/Login';
import Register from './components/Register';
import PasswordReset from './components/PasswordReset';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ setResetPassword] = useState(false);

  return (
    <Router>
      <div className="App">
      <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/attendance">Attendance Records</Link>
          </li>
          <li>
            <Link to="/reviews">Reviews</Link>
          </li>
          <li>
            <Link to="/query">Query</Link>
          </li>
          <li>
            <Link to="/">logout</Link>
          </li>
        </ul>
      </nav>
      </div>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} setResetPassword={setResetPassword} />}
          />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/reset-password" element={<PasswordReset setResetPassword={setResetPassword} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/attendance" element={<AttendanceRecords />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/query" element={<Query />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
