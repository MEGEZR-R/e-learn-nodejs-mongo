const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    phone: {
        type: String,
        required: true,
        // unique: true,
      },
    age: Number,
    address: String,
    email: String,
    password: {
        type: String,
        required: true,
      },
    bio: String,
    
});

module.exports = mongoose.model('Student', studentSchema);
