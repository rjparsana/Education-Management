const Grade = require('../models/gradeModel');
const Enrollment = require('../models/enrollmentModel');
const Course = require('../models/courseModel');

// Teacher assigns a grade to a student
exports.assignGrade = async (req, res) => {
  const { courseId, studentId, grade } = req.body;

  try {
    // Check if the course exists and the teacher is assigned to it
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the logged-in teacher is the teacher of the course
    if (course.teacher.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not the teacher of this course' });
    }

    // Check if the student is enrolled in the course
    const isEnrolled = await Enrollment.findOne({ student: studentId, course: courseId });
    if (!isEnrolled) {
      return res.status(403).json({ message: 'The student is not enrolled in this course' });
    }

    // Assign the grade
    const newGrade = new Grade({
      student: studentId,
      course: courseId,
      grade: grade
    });

    await newGrade.save();
    res.status(201).json({ message: 'Grade assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Students can view their grades for each course
exports.getStudentGrades = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Fetch all grades for the student
    const grades = await Grade.find({ student: studentId }).populate('course');
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
