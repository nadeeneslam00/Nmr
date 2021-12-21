const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  Id:{
    type: Number,
    required:true,
    unique:true

  },
  FlightNumber:{
    type:Number,
    required:true,
    unique:true
  },
  From: {
    type: String,
    required: true
  },
  To: {
    type: String,
    required: true
  },
  FlightDate: {
    type: Date,
    required: true
  },
  ArrivalTime: {
    type: Date,
    required: true
  },
  DepartureTime: {
    type: Date,
    required: true
  },
  BusinessNumofSeats: {
    type: Number,
    required: true
  },
  EconomyNumofSeats: {
    type: Number,
    required: true
  },
  BusinessSeats:{
    type: Array,
    required: true

  },
  EconomySeats:{
    type: Array,
    required: true

  },
  TripDuration:{
    type:String

  },
  Price:{
    type:Number
  }

}, { timestamps: true });

const Flight = mongoose.model('Flights', flightSchema);
module.exports = Flight;
//export default Flights;