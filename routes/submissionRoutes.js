const express = require('express');
const { submitAssignment } = require('../controllers/submissionController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Students can submit assignments
router.post('/submit', verifyToken, verifyRole('Student'), submitAssignment);

module.exports = router;
