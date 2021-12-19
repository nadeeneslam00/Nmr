require('dotenv').config()

const express = require('express');


const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();

const app = express();
const cors = require('cors');
app.use(cors());

const users = [];

var bodyParser = require('body-parser');

const posts=[
  {
    name:"Rana r",
    title:"Post 1"
  },
  {   name:"Rana ",
  title:"Post 2"
}
]


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const Flight = require('./Models/Flights.js');

const User = require('./Models/Users.js');



const CONNECTION_URL = 'mongodb+srv://nadeeneslam:Nadeen1412@cluster0.crnbl.mongodb.net/nmr?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

let refreshTokens =[]


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

app.get("/getUsers", authenticateToken, (req, res) => {
console.log(req.headers)
 // User.find(Name:user, (err, values) => {
    //console.log(values)
   // res.json((User.filter())
   res.json(posts.filter(post=> post.name === req.user.name))

  
});

app.post("/users", (req, res) => {

  const user =
  {
    name: req.body.name,
    password: req.body.password
  }
  users.push(user)
  res.status(201).send()
  console.log(users)
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



app.post('/token', (req,res) => {
  const refreshToken = req.body.token
  if(refreshToken == null) return res.sendStatus(401)
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken,""+ process.env.REFRESH_TOKEN_SECERT,(err, user) =>{
  if(err) return res.sendStatus(403)
  const accessToken = generateAccessToken({name :user.name})
  res.json({accessToken : accessToken})
  }) 

})
app.post('/login', (req, res) => {
  //Authenticatio

  User.findOne({ Name: req.body.name }).then(result => {
    console.log(result)
    if (result != null) {

      if (result.Password == req.body.password) {
        console.log("equal")
        const user = { name: req.body.name };
        console.log(user)
        const accessToken = generateAccessToken(user)
        const refreshToken= jwt.sign(user,""+ process.env.REFRESH_TOKEN_SECERT)
        refreshTokens.push(refreshToken)
        console.log("yaayyy")
        res.json({ accessToken: accessToken, refreshToken: refreshToken })
        console.log("yaayyy")
        res.send("succes")
     
      } else {

        res.send("not allowed")
      }
    }
    else {
      res.send("NOT FOUND")
    }
 
  }).catch(err => {


  })



});
app.delete('/logout',(req,res)=>{
  refreshTokens=refreshTokens.filter(token=>token !== req.body.token)
  res.sendStatus(204)
})
function authenticateToken(req,res,next){


  const authHeader= req.headers['authorization']
  const token=authHeader && authHeader.split(' ')[1]
  console.dir(token)
  if(token== null)
  return res.sendStatus(401)
  jwt.verify(token,""+ process.env.ACCESS_TOKEN_SECERT,(err,user)=>{
    if(err)return res.sendStatus(403)
    req.user=user
    next()
  })
}

function generateAccessToken(user){
  return jwt.sign(user,""+ process.env.ACCESS_TOKEN_SECERT,{expiresIn: '15s'})

  
}


















