const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    maxlength: [128, 'Password cannot be exceed 128 characters'],
    // match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must contain at least one letter and one number'],
  },
    
    // dateOfBirth: {
    //   type: Date,
    //   required: [true, 'Date of birth is required']
    // },

    role : {
        type: String,
        enum: ['user', 'admin','seller'],
        default: 'user'
    },
    profilepic: {
        type: String,
        default: 'default.jpg'
    }, 


  // phone: {
  //     type: String,
  //     required: [true, 'Phone number is required'],
  //     match: [/^\d{10}$/, 'Phone number must be 10 digits long'],
  //     unique: true
  //   }
  },
  {
    timestamps: true 
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;