const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: {
    type: String,
    required: false
  },
  LastName: {
    type: String,
    required: false
  },
  PassportNo: {
    type: String,
    required: false
  },
  Name: {
    type: String, 
    unique:true,
    required: true
  },
  Password: {
    type: String,
    required: false
  },
  Email: {
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