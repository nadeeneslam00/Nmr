const express = require('express');

const mongoose = require('mongoose');
const router = express.Router();

const app = express();
const cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const Flight = require('./Models/Flights.js');

const User = require('./Models/Users.js');



const CONNECTION_URL = 'mongodb+srv://nadeeneslam:Nadeen1412@cluster0.crnbl.mongodb.net/nmr?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;




app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("MongoDB is now connected"))
  .catch(err => console.log(err));






app.get('/posts', (req, res) => {
  res.send('Hello World!')
});




app.post('/createFlight', function (req, res) {
  try {
    console.log(req.body);
    const flight = new Flight({
      Id: req.body.Id,
      FlightNumber: req.body.FlightNumber,
      From: req.body.From,
      To: req.body.To,
      FlightDate: req.body.FlightDate,
      ArrivalTime: req.body.ArrivalTime,
      DepartureTime: req.body.DepartureTime,
      BusinessNumofSeats: req.body.BusinessNumofSeats,
      EconomyNumofSeats: req.body.EconomyNumofSeats,
    });
    console.log(flight);
    flight.save();
    return res.json({
      statusCode: 0,
      message: 'Success',
    });
  } catch (exception) {

    return res.json({
      statusCode: 1,
      error: 'Exception',
    });
  }
}
)


app.post('/postUser', (req, res) => {
  const user = new User({
    'Name': "rana",
    'Email': "Rana@rana.com"
  });
  user.save(function (err) {
    if (err) {
      console.log(err + "hello");
      throw err;

    } else {
      console.log("Saved")
    }
  }
  );

});

app.get("/getFlights", (req, res) => {

  Flight.find({}, (err, values) => {
    console.log(values)
    res.json({ values });

  })
});

app.post("/updateFlights", (req, res) => {

  const newObj = {}
  if (req.body.FlightNumber != -1)
    newObj.FlightNumber = req.body.FlightNumber;
  if (req.body.From != "")
    newObj.From = req.body.From;
  if (req.body.To != "")
    newObj.To = req.body.To;
  if (req.body.FlightDate != null)
    newObj.FlightDate = req.body.FlightDate;
  if (req.body.ArrivalTime != null)
    newObj.ArrivalTime = req.body.ArrivalTime;
  if (req.body.DepartureTime != null)
    newObj.DepartureTime = req.body.DepartureTime;
  if (req.body.BusinessNumofSeats != -1)
    newObj.BusinessNumofSeats = req.body.BusinessNumofSeats;
  if (req.body.EconomyNumofSeats != -1)
    newObj.EconomyNumofSeats = req.body.EconomyNumofSeats;
  console.log(req.body);
  console.dir(newObj)
  console.log("VALUEEE")
  console.log(req.body.Id)

  Flight.findOneAndUpdate({
    Id: (parseInt(req.body.Id, 10))
  }, newObj).then(result => {
    //console.log(req.body)
    console.log("yaayyy")
    console.log(result)


  }).catch(err => {

    console.log(parseInt(req.body.Id, 10))
    console.log(req.body)
    console.log(err)
    console.log("nay")


  })
});

app.post("/deleteFlights", (req, res) => {
  Flight.findOneAndDelete({ Id: (parseInt(req.body.Id, 10)) }).then(result => {
    //console.log(req.body)
    console.log("yaayyy")


  }).catch(err => {

    console.log(parseInt(req.body.Id, 10))
    console.log(req.body)
    console.log(err)
    console.log("nay")


  })
});

app.post("/searchFlights", (req, res) => {
  console.log(req.body)
  const searchDetails = {}
  if (req.body.FlightNumber != -1)
    searchDetails.FlightNumber = parseInt(req.body.FlightNumber, 10);
  if (req.body.From != "")
    searchDetails.From = req.body.From;
  if (req.body.To != "")
    searchDetails.To = req.body.To;
  if (req.body.FlightDate != null)
    searchDetails.FlightDate = req.body.FlightDate;
  if (req.body.ArrivalTime != null)
    searchDetails.ArrivalTime = req.body.ArrivalTime;
  if (req.body.DepartureTime != null)
    searchDetails.DepartureTime = req.body.DepartureTime;
  if (req.body.BusinessNumofSeats != -1)
    searchDetails.BusinessNumofSeats = req.body.BusinessNumofSeats;
  if (req.body.EconomyNumofSeats != -1) {
    searchDetails.EconomyNumofSeats = req.body.EconomyNumofSeats;
  }

  console.dir(searchDetails)

  Flight.find(searchDetails, (err, values) => {
    console.log(values)
    if (err) {
      console.log(err)
    } else {
      res.json({ values });
    }
  });

});






















