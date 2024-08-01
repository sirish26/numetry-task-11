const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = 'mongodb+srv://root:root@numerty.t7qkzms.mongodb.net/task11';

app.use(cors());
app.use(bodyParser.json());
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['Admin', 'Staff', 'Student'] },
});

const User = mongoose.model('User', userSchema);

const attendanceSchema = new mongoose.Schema({
  name: String,
  standard: String,
  attendanceStatus: { type: String, enum: ['Present', 'Absent'] },
  date: { type: Date, default: Date.now },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

app.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const newUser = new User({ email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/attendance', async (req, res) => {
  const { name, standard, attendanceStatus } = req.body;

  try {
    const newAttendance = new Attendance({ name, standard, attendanceStatus });
    await newAttendance.save();
    res.status(201).json({ message: 'Attendance recorded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/attendance', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/attendance/:id', async (req, res) => {
  const { id } = req.params;
  const { name, standard, attendanceStatus } = req.body;

  try {
    await Attendance.findByIdAndUpdate(id, { name, standard, attendanceStatus });
    res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/attendance/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Attendance.findByIdAndDelete(id);
    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
