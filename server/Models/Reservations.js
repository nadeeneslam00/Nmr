const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reservationSchema = new Schema({
  Name: {
    type: String, 
    required: true
  },
  From:{
    type: String,
    required:true,

  },
  To:{
    type: String,
    required:true,

  },
  RetSeatsStr:{
    type: String,
    required:true,

  },
  DepSeatsStr:{
    type: String,
    required:true,

  },
  DepartureDate:{
    type: Date,
    required:true,

  },
  ReturnDate:{
    type: Date,
    required:true,

  },
  DepDepTime: {
    type: Date,
    required: true
  },
  DepArrTime: {
    type: Date,
    required: true
  },
  RetDepTime: {
    type: Date,
    required: true
  },
  RetArrTime: {
    type: Date,
    required: true
  },
 
 
  TotalPrice: {
      type: Number,
      required: true
    },
    ChosenCabinDeparture: {
      type: String,
      required: true
    },
   ChosenSeatDeparture: {
      type: Array,
      required: true
    },
    ChosenCabinReturn: {
      type: String,
      required: true
    },
   ChosenSeatReturn: {
      type: Array,
      required: true
    }
  }, { timestamps: true });
  
  const Reservation = mongoose.model('Reservations', reservationSchema);
  module.exports = Reservation;