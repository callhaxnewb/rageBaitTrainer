const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  college: { 
    type: String,
    trim: true 
  },
  state: { 
    type: String,
    trim: true 
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;