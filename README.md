# Education Management System Backend

This is a Node.js and Express backend for an Education Management System that handles user authentication, course management, enrollment management, and grade management. It uses MongoDB as the database and JWT for authentication.

## Features

- User authentication (Admin, Teacher, Student)
- Course management (Admins can create, update, delete courses)
- Enrollment management (Admins can enroll/remove students, students can self-enroll)
- Grade management (Teachers can assign grades, students can view grades)
- Secure routes using JWT and role-based access control (RBAC)

### Create a .env file in the root of the project and add the following environment variables:

MONGO_URI=mongodb+srv://rjparsana8:gWlyoAYo7Qx5qxBd@cluster0.hkxic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=RJ_SECRET

## Running the Server
You can run the server locally using nodemon for automatic restarts during development.

Start the server with nodemon:

nodemon server.js

## API Endpoints

### Authentication
POST /api/auth/register: Register a new user (Admin, Teacher, or Student)
POST /api/auth/login: Login and receive a JWT

### Course Management
POST /api/courses: Create a new course (Admin only)
PUT /api/courses/:courseId/content: Update course content (Teacher only)
DELETE /api/courses/:courseId: Delete a course (Admin only)

### Enrollment Management
POST /api/enroll: Enroll a student in a course (Admin)
POST /api/enroll/self: Student self-enroll in a course

### Grade Management
POST /api/grades: Assign grades to students (Teacher only)
GET /api/grades/:studentId: View grades for a student (Student only)
