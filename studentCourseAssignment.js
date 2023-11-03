const mongoose = require('mongoose');

const studentCourseAssignmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
});

const StudentCourseAssignment = mongoose.model('StudentCourseAssignment', studentCourseAssignmentSchema);

module.exports = StudentCourseAssignment;
