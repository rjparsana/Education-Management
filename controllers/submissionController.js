const Enrollment = require('../models/enrollmentModel');
const Submission = require('../models/submissionModel');
const Course = require('../models/courseModel');

// Student submits an assignment
exports.submitAssignment = async (req, res) => {
  const { courseId, content } = req.body;

  try {
    // Check if the student is enrolled in the course
    const isEnrolled = await Enrollment.findOne({ student: req.user.id, course: courseId });
    console.log('Checking enrollment for student:', req.user.id, 'in course:', courseId);
    if (!isEnrolled) {
      return res.status(403).json({ message: 'You are not enrolled in this course' });
    }
    

    // Submit the assignment
    const submission = new Submission({
      student: req.user.id,
      course: courseId,
      content: content
    });

    await submission.save();
    res.status(201).json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
