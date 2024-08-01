import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendanceRecords() {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/attendance');
      setAttendanceList(response.data);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
  };

  const handleEdit = async (id) => {
    const editedRecord = prompt('Enter the updated attendance status:');
    if (editedRecord !== null) {
      try {
        await axios.put(`http://localhost:5000/attendance/${id}`, {
          attendanceStatus: editedRecord,
        });
        fetchData(); // Fetch updated data after edit
      } catch (error) {
        console.error('Error updating attendance record:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:5000/attendance/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting attendance record:', error);
      }
    }
  };

  return (
    <div className='attendance-container'>
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Standard/Class</th>
            <th>Attendance Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((record) => (
            <tr key={record._id}>
              <td>{record.name}</td>
              <td>{record.standard}</td>
              <td>{record.attendanceStatus}</td>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(record._id)}>Edit</button>
                <button onClick={() => handleDelete(record._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceRecords;
