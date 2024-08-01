// Dashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import AboutUs from './aboutus';
import ContactUs from './contact';
import AttendanceRecords from './attendancerecords';
import Reviews from './reviews';
import Query from './query';
import './App.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/attendance" element={<AttendanceRecords />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/query" element={<Query />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
