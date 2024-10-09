const express = require('express');
const { enrollStudent, removeStudent, getStudentEnrollments } = require('../controllers/enrollmentController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin enrolls a student in a course
router.post('/enroll', verifyToken, verifyRole('Admin'), enrollStudent);

// Admin removes a student from a course
router.delete('/enroll', verifyToken, verifyRole('Admin'), removeStudent);

// Students can view their enrollments
router.get('/enrollments/:studentId', verifyToken, verifyRole('Student'), getStudentEnrollments);

module.exports = router;
