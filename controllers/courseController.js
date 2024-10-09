const mongoose = require('mongoose');
const Course = require('../models/courseModel');
const User = require('../models/userModel');

exports.createCourse = async (req, res) => {
  const { title, description, teacherId } = req.body;
  try {
    // Convert teacherId to ObjectId using 'new'
    const teacherObjectId = new mongoose.Types.ObjectId(teacherId);

    // Check if the teacherId belongs to a valid Teacher or Admin
    const assignedUser = await User.findById(teacherObjectId);
    if (!assignedUser || (assignedUser.role !== 'Teacher' && assignedUser.role !== 'Admin')) {
      return res.status(400).json({ message: 'Assigned user must be a Teacher or Admin' });
    }

    const newCourse = new Course({ title, description, teacher: teacherObjectId });
    await newCourse.save();
    res.status(201).json({ message: 'Course created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCourseContent = async (req, res) => {
  const { courseId } = req.params;
  const { content } = req.body;

  try {
    // Check if the course exists and if the user is the assigned teacher
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if the logged-in teacher is the teacher of this course
    if (course.teacher.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not the teacher of this course' });
    }

    // Update the course content
    course.content = content;
    await course.save();

    res.status(200).json({ message: 'Course content updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
