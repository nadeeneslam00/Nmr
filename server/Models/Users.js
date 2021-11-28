const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: false
  },
 
  LivesIn: {
    type: String,
    required: false
  },
  PhoneNumber: {
    type: String,
    required: false
  },
  Job: {
    type: String,
    required: false
  },
  Admin: {
    type: Boolean,
    required: true
  }
  

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
