const Enrollment = require('../models/enrollmentModel');
const Course = require('../models/courseModel');
const User = require('../models/userModel');

// Admin enrolls a student in a course
exports.enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;
  
  try {
    // Check if student and course exist
    const student = await User.findById(studentId);
    const course = await Course.findById(courseId);
    
    if (!student || student.role !== 'Student') {
      return res.status(400).json({ message: 'Invalid student ID' });
    }
    
    if (!course) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    // Check if the student is already enrolled
    const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Student is already enrolled in this course' });
    }

    // Enroll the student
    const enrollment = new Enrollment({ student: studentId, course: courseId });
    await enrollment.save();
    
    res.status(201).json({ message: 'Student enrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin removes a student from a course
exports.removeStudent = async (req, res) => {
  const { studentId, courseId } = req.body;
  
  try {
    // Check if the student is enrolled in the course
    const enrollment = await Enrollment.findOne({ student: studentId, course: courseId });
    if (!enrollment) {
      return res.status(400).json({ message: 'Student is not enrolled in this course' });
    }

    // Remove the enrollment
    await Enrollment.findByIdAndDelete(enrollment._id);
    
    res.status(200).json({ message: 'Student removed from the course' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Students can view their enrollments
exports.getStudentEnrollments = async (req, res) => {
  const { studentId } = req.params;
  
  try {
    const enrollments = await Enrollment.find({ student: studentId }).populate('course');
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
