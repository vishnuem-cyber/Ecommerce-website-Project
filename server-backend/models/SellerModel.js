
const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    unique: true
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500
  },
  expertise: {
    type: [String], 
    default: []
  // },

  // email: {
  //   type: String,
  //   required: [true, 'Seller email is required'],
  //   unique: true,
  //   lowercase: true,
  //   trim: true,
  // },
  // password: {
  //   type: String,
  //   required: [true, 'Password is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    
  },
  role: {
  type: String,
  default: 'seller',
  enum: ['seller', ]
  },
  profilePic: {
  type: String,
  default: 'default.jpg'
},

  storeName: {
    type: String,
    required: [true, 'Store name is required'],
  },
  
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
  },
  gstNumber: {
    type: String,
    required: [true, 'GST number is required'],
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

const Seller = mongoose.model('Seller', sellerSchema);
module.exports = Seller;
