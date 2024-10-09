const express = require('express');
const { assignGrade, getStudentGrades } = require('../controllers/gradeController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Teacher assigns grades to students
router.post('/grades', verifyToken, verifyRole('Teacher'), assignGrade);

// Students can view their grades for each course
router.get('/grades/:studentId', verifyToken, verifyRole('Student'), getStudentGrades);

module.exports = router;
