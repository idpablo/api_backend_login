const {mongoose, createConnection} = require('mongoose');
const db = require('../config/db.js');

db.connectDB()

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;