const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  grade: { type: Number, required: true },
  gradedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grade', gradeSchema);
