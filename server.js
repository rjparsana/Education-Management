const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');  
const submitRoutes = require('./routes/submissionRoutes');  

require('dotenv').config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', courseRoutes);
app.use('/api', gradeRoutes);
app.use('/api', enrollmentRoutes);  
app.use('/api', submitRoutes);  

// Database connection
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
