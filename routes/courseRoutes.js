const express = require('express');
const { createCourse } = require('../controllers/courseController');
const { updateCourseContent } = require('../controllers/courseController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/courses', verifyToken, verifyRole('Admin'), createCourse);
router.put('/courses/:courseId/content', verifyToken, verifyRole('Teacher'), updateCourseContent);


module.exports = router;
