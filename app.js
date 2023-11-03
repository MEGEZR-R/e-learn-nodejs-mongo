const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student'); // Import the Student model
const Course = require('./models/course'); // Import the Course model

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/e-learn', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Define a route to fetch all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students from the database
    res.json(students); // Send the students as a JSON response
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Define a route to fetch all courses
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find(); // Fetch all courses from the database
    res.json(courses); // Send the courses as a JSON response
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Serve the insertion form for students
app.get('/insert-student', (req, res) => {
  res.sendFile(__dirname + '/insert-student.html');
});

// Define a route to insert a new student
app.post('/insert-student', async (req, res) => {
    try {
      // Extract and process student data from req.body
      const { firstName, lastName, phone, age, address, email, password, course } = req.body;
  
      // Save the selected course as the "Bio"
      const bio = course;
  
      // Create a new student document
      const newStudent = new Student({
        firstName,
        lastName,
        phone,
        age,
        address,
        email,
        password,
        bio, // Save the course as the "Bio"
      });
  
      // Save the new student to the database
      await newStudent.save();
  
      // Redirect to the insertion page after successful insertion
      res.redirect('/insert-student');
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Insertion failed' });
    }
  });

// Serve the insertion form for courses
app.get('/insert-course', (req, res) => {
  res.sendFile(__dirname + '/insert-course.html');
});

// Define a route to insert a new course
app.post('/insert-course', async (req, res) => {
    try {
      // Extract and process course data from req.body
      const { name, description, Professor } = req.body;
  
      // Create a new course document
      const newCourse = new Course({ name, description, Professor });
  
      // Save the new course to the database
      await newCourse.save();
  
      // Respond with a success message
      res.redirect('/insert-course');

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Insertion failed' });
    }
  });

  // Define a route to fetch a specific course by ID
app.get('/courses/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    try {
      const course = await Course.findById(courseId);
      res.json(course); // Send the course details as JSON response
    } catch (error) {
      console.error('Error fetching course details:', error);
      res.status(500).json({ message: 'Error fetching course details' });
    }
  });

  


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
