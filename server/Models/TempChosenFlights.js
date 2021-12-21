const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tempChosenFlightsSchema = new Schema({
    Name: {
        type: String,
        required: true,


    },
    Id: {
        type: Number,
        required: true,
        

    },
    CabinClass: {
        type: String,
        required: true

    },
    Departure: {
        type: Boolean,
        required: true
    }
    

}, { timestamps: true });

const tempChosenFlight = mongoose.model('tempChosenFlights', tempChosenFlightsSchema);
module.exports = tempChosenFlight;
//export default Flights;