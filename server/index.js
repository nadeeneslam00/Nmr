
require('dotenv').config()

const express = require('express');

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Stripe=require('stripe');
const stripe= Stripe('sk_test_51KJgsUGPL5oMjwemnSwucaUplrbTB5DtufCo63HRXcFIpohpcKFvC63F8QAplgUl62gOkITLEJ1mlqSuAFOA7CWj00zQWUa8Dv')

const app = express();
const cors = require('cors');
app.use(cors());

const users = [];

var bodyParser = require('body-parser');

const posts = [
  {
    name: "Rana r",
    title: "Post 1"
  },
  {
    name: "Rana ",
    title: "Post 2"
  }
]


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const Reservation = require('./Models/Reservations.js');
const Flight = require('./Models/Flights.js');

const User = require('./Models/Users.js');
const tempChosenFlight = require('./Models/TempChosenFlights.js')
var nodemailer = require('nodemailer');


const CONNECTION_URL = 'mongodb+srv://nadeeneslam:Nadeen1412@cluster0.crnbl.mongodb.net/nmr?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

let refreshTokens = []


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("MongoDB is now connected"))
  .catch(err => console.log(CONNECTION_URL));


app.post("/reservationAfterConfirm", authenticateToken, (req, res) => {
  console.log("HEREEEEEE")
  console.log(req.user)

  Reservation.find({ Name: req.user.name }).then(result => {

    console.log(req.user.name)
    console.log("HEREEEEEE1")
    console.log("1")
    console.log(result)
    res.json(result)

  })
});



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
app.post('/UserSearch', (req, res) => {
  //console.log(req.headers)
  console.log(req.body)
  const searchDetails = {}

  if (req.body.From != "")
    searchDetails.From = req.body.From;
  if (req.body.To != "")
    searchDetails.To = req.body.To;
  if (req.body.FlightDate != null)
    searchDetails.FlightDate = req.body.FlightDate;




  console.dir(searchDetails)

  Flight.find(searchDetails, (err, result) => {
    // console.log(result)
    if (err) {

      console.log(err)
    } else {
      //res.json(result)

      //let arrTime = new Date (req.body.From.ArrivalDate + "T" + req.body.From.ArrivalTime+":00.123Z");
      //let DepTime = new Date (req.body.From.DepartureDate + "T" + req.body.From.DepartureTime+":00.123Z");

      var resultFinal = [];
      console.log("result here")
      console.log(result)
      for (let i = 0; i < result.length; i++) {
        if (req.body.cabinClass === 1) {
          if (result[i].BusinessNumofSeats >= parseInt(req.body.numberofPassengers, 10)) {
            var TripDuration = (parseInt(Math.abs(result[i].ArrivalTime - result[i].DepartureTime) / (1000 * 60 * 60) % 24, 10) + "Hours" + parseInt(Math.abs(result[i].ArrivalTime.getTime() - result[i].DepartureTime.getTime()) / (1000 * 60) % 60, 10) + "Minutes");
            result[i].TripDuration = TripDuration;
            console.log(TripDuration);
            resultFinal.push(result[i])

          }

        }
        if (req.body.cabinClass === 2) {
          if (result[i].EconomyNumofSeats >= parseInt(req.body.numberofPassengers, 10)) {
            var TripDuration = (parseInt(Math.abs(result[i].ArrivalTime - result[i].DepartureTime) / (1000 * 60 * 60) % 24, 10) + " Hours " + parseInt(Math.abs(result[i].ArrivalTime.getTime() - result[i].DepartureTime.getTime()) / (1000 * 60) % 60, 10) + " Minutes");
            let oneRes = result[i]
            oneRes.TripDuration = TripDuration;
            console.log(oneRes);
            resultFinal.push(oneRes)

          }
        }
      }
      
      res.json(resultFinal)
    }
  });


});

app.get("/getUsers", authenticateToken, (req, res) => {
  console.log(req.headers)
  // User.find(Name:user, (err, values) => {
  //console.log(values)
  // res.json((User.filter())
  res.json(posts.filter(post => post.name === req.user.name))


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


app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, "" + process.env.REFRESH_TOKEN_SECERT, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
});

app.post('/signup', async (req, res) => {

const email=req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  // console.log('METHOD ACTIVE')
  try {
    let user = await User.findOne({
      Name: name
    });
    if (user) {
      console.log("User already found");
      return res.json({
        statusCode: 0,
        message: 'Username already exists, please sign in',
      })
    } else {
      console.log('METHOD ACTIVE')

      var newUser = new User({
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Address: req.body.address,
        CountryCode: req.body.countryCode,
        TelephoneNumber: req.body.telephone,
        PassportNo: req.body.passportNumber,
        Email: email,
        Name: name,
        Password: bcrypt.hashSync(password, 10),
        Admin: false,
      })
      console.log(newUser);
      newUser.save(function (err, user) {
        if (err) {
          console.log(err);
          return (res.status(200).send({
            message: err,
          }))
        } else {
          const user = { name: name};
          console.log(user)
          const accessToken = generateAccessToken(user)
          const refreshToken = jwt.sign(user, "" + process.env.REFRESH_TOKEN_SECERT)
          refreshTokens.push(refreshToken)
          console.log("yaayyy")
         
          console.log("yaayyy")
          console.log(accessToken)
          console.log("SUCCESS");
          return res.json({ accessToken: accessToken, refreshToken: refreshToken })
         
        }
      })
   
    }
  } catch (err) {
    console.log(err);
    if (err) {
      return res.json({
        statusCode: 1,
        error: 'error caught ',
      })
    }
  }
});

app.post('/login', (req, res) => {
  //Authenticatio
  console.log("EL CHENK DAKHAL");
  console.log(req.body)

  User.findOne({ Name: req.body.username }).then(result => {
    console.log(result.Password)
    console.log(req.body.password)
    console.log(result)
    if (result != null) {
      console.log("EL CHENK DAKHAL 2");
      var result2 = bcrypt.compareSync(req.body.password, result.Password)
      console.log(result2)
      if (result2) {
        console.log("equal")
        const user = { name: req.body.username };
        console.log(user)
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, "" + process.env.REFRESH_TOKEN_SECERT)
        refreshTokens.push(refreshToken)
        console.log("yaayyy")
        res.json({ accessToken: accessToken, refreshToken: refreshToken, Admin:result.Admin })
        console.log("yaayyy")
        console.log(accessToken)




      } else {
        console.log("incorrect password")

        res.send("Incorrect Password")

      }
    }
    else {

    }

  }).catch(err => {
    res.send("User not found")


  })



});

app.post("/changePassword", authenticateToken, (req, res) => {
  console.log("HEREEEEEE")
  console.log(req.user)

  User.findOne({ Name: req.user.name }).then(result => {
    console.log(result.Password)
    console.group(req.body.oldPassword)
    var result2 = bcrypt.compareSync(req.body.oldPassword, result.Password)
    console.log(result2)
    if (result2) {
      result.Password = bcrypt.hashSync(req.body.newPassword, 10)
      result.save().then((result) => {
        console.log(result);
        res.send("Success")
      }).catch((e) => {
        console.log(e);
      })
    }
    else {

      res.send("Incorrect Password")
    }

  })
});




app.post('/logout', (req, res) => {

  res.sendStatus(204)
})

app.post("/getBussinessSeats", (req, res) => {
  console.log("ROUNAAAX")
  console.log(req.body)
  console.log(req.body.Id)
  Flight.findOne({
    Id: req.body.Id
  }).then(result => {
    var TripDuration = (parseInt(Math.abs(result.ArrivalTime - result.DepartureTime) / (1000 * 60 * 60) % 24, 10) + "Hours" + parseInt(Math.abs(result.ArrivalTime.getTime() - result.DepartureTime.getTime()) / (1000 * 60) % 60, 10) + "Minutes");
    console.log("FINALLLLL")
    console.log(req.body.CabinClass)
    if (req.body.CabinClass == "1") {

      const Obj = {
        Id: result.Id,
        FlightNumber: result.FlightNumber,
        From: result.From,
        To: result.To,
        FlightDate: result.FlightDate,
        Price:result.Price,
        ArrivalTime: result.ArrivalTime,
        DepartureTime: result.DepartureTime,
        Seats: result.BusinessSeats,
        TripDuration: TripDuration
      }
      console.log(Obj)
      res.send(Obj)
      console.log("PLSSS")
    }
    else {

      const Obj = {
        Id: result.Id,
        FlightNumber: result.FlightNumber,
        From: result.From,
        To: result.To,
        FlightDate: result.FlightDate,
        Price:result.Price,
        ArrivalTime: result.ArrivalTime,
        DepartureTime: result.DepartureTime,
        Seats: result.EconomySeats,
        TripDuration: TripDuration
      }
      console.log(Obj)
      res.send(Obj)
      console.log("PLSSS")
    }
  }).catch(err => {

  })

});

// app.post("/getTempChosenFlights", authenticateToken, (req, res) => {
//   console.log(req.user)
//   const Obj = {
//     Name: req.user.name,
//     Departure: req.body.Departure,

//   }

//   tempChosenFlight.findOne(Obj).then(result => {
//     console.log("HERE")
//     console.log(result)
//     res.send(result)


//   })
// })
// app.post("/postTempChosenFlights", authenticateToken, (req, res) => {

//   if (req.user == null) {
//     return res.send("null")
//   } else {
//     console.log(req.user)
//     const Obj = [{
//       Name: req.user.name,
//       Id: req.body.Id,
//       CabinClass: req.body.CabinClass,
//       Departure: req.body.Departure
//     }]
//     tempChosenFlight.insertMany(Obj).then(result => {
//       console.log(result)
//       res.send("success")
//     }).then(err => {

//     })
//   }


// })

app.post("/reserve", authenticateToken, (req, res) => {
  console.log(req.body)
  const ChosenSeatDepartureArray = req.body.ChosenSeatDeparture.split(",");
  const ChosenSeatReturnArray = req.body.ChosenSeatReturn.split(",");
  console.log(ChosenSeatDepartureArray)
  console.log(ChosenSeatReturnArray)


  var str1 = ""
  for (let index = 0; index < ChosenSeatDepartureArray.length; index++) {
    console.log("got in loop")
    if (ChosenSeatDepartureArray[index] == 'true')
      str1 = str1 + " " + index + " " + " " + ","
  }
  var str2 = ""
  for (let index = 0; index <ChosenSeatReturnArray.length; index++) {
    if (ChosenSeatReturnArray[index] == 'true')
      str2 = str2 + " " + index + " " + " " + ","
  }
  console.log("str1")
  console.log(str1)
  const resrvation = [{

    Name: req.user.name,
    From: req.body.From,
    DepId: req.body.DepId,
    RetId: req.body.RetId,
    To: req.body.To,
    DepartureDate: req.body.DepartureDate,
    ReturnDate: req.body.ReturnDate,
    DepDepTime: req.body.DepDepTime,
    DepArrTime: req.body.DepArrTime,
    RetDepTime: req.body.RetDepTime,
    RetArrTime: req.body.RetArrTime,
    TotalPrice: req.body.TotalPrice,
    ChosenCabinDeparture: req.body.ChosenCabinDeparture,
    ChosenSeatDeparture: req.body.ChosenSeatDeparture,
    ChosenCabinReturn: req.body.ChosenCabinReturn,
    ChosenSeatReturn: req.body.ChosenSeatReturn,
    DepSeatsStr: str1,
    RetSeatsStr: str2



  }]
  console.log("final testing")
  Reservation.insertMany(resrvation).then(result => {
    console.log(result)
    res.send(result[0])
  }).then(err => {

  })

})
app.post("/viewReservations", authenticateToken, (req, res) => {
  console.log("HEREEEEEE")
  console.log(req.user)

  Reservation.find({ Name: req.user.name }).then(result => {
    console.log(req.user.name)
    console.log("HEREEEEEE1")
    console.log("1")
    console.log(result)
    res.json(result);
  })
});
app.post("/profile", authenticateToken, (req, res) => {
  console.log("HEREEEEEE")
  console.log(req.user)

  User.find({ Name: req.user.name }).then(result => {
    console.log(req.user.name)
    console.log("HEREEEEEE1")
    console.log("1")
    console.log(result)
    res.json(result);
  })

});
app.post("/updateProfile", authenticateToken, (req, res) => {


  const newObj = {}
  if (req.body.FirstName != "")
    newObj.FirstName = req.body.FirstName;
  console.log(req.body.FirstName);

  if (req.body.LastName != "")
    newObj.LastName = req.body.LastName;
  if (req.body.Email != "")
    newObj.Email = req.body.Email;
  if (req.body.PassportNo != "")
    newObj.PassportNo = req.body.PassportNo;

  console.log(req.body);
  console.dir(newObj)
  console.log("VALUEEE")
  console.log(req.user.name)
  User.findOneAndUpdate({
    Name: (req.user.name)
  }, newObj).then(result => {
    //console.log(req.body)

    console.log(newObj)
    console.log("yaayyy")


  }).catch(err => {

    console.log(req.body)
    console.log(err)
    console.log("nay")


  })
});
app.post("/deleteReservation", authenticateToken, (req, res) => {
  const Obj = {}

  User.findOne({ Name: req.user.name }).then(result => {
    console.log("HHHHHHNNNNNM")
    Obj.mail = result.Email

    Reservation.deleteOne({ ReservationNo: req.body._id }).then(result => {
      console.log("LLLLLLLLLLNM")
      console.log(result)
      Obj.price = result.TotalPrice

      const transporter = nodemailer.createTransport({


        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
        auth: {
          user: 'menna.shoulkamy@gmail.com',
          pass: 'Menna1234',
        },
        secure: true,
      });
      const mailData = {
        from: 'menna.shoulkamy@gmail.com',  // sender address
        to: '' + Obj.mail,   // list of receivers
        subject: 'Cancelled Booking',
        text: 'Booking is Cancelled, Total amount to be refunded is' + Obj.price + ''
      };
      transporter.sendMail(mailData, function (err, info) {
        if (err)
          console.log(err)
        else
          console.log(info);
      });
    }).then(err => {

    })
  }).then(err => {

  })





});
app.get("/getFlight", (req, res) => {

  Flight.find({ UserId: req.body.UserId }, (err, values) => {
    console.log(values)
    res.json({ values });

  })
})
app.post("/selectBussinessSeats", authenticateToken, (req, res) => {

  console.log("LOOOOOOK")
  console.log(req.body.selectedBussinessSeats)


  Flight.findOne({
    Id: req.body.Id
  }).then((result) => {

    if (req.body.CabinClass == "1") {
      for (let i = 0; i < req.body.selectedBussinessSeats.length; i++) {
        if (req.body.selectedBussinessSeats[i] == "true") {
          result.BusinessSeats[i] = "true"
          result.BusinessNumofSeats--
        }
        result.save().then((result) => {
          console.log(result);
        }).catch((e) => {
          console.log(e);
        })

      }
    }
    else {
      for (let i = 0; i < req.body.selectedBussinessSeats.length; i++) {
        if (req.body.selectedBussinessSeats[i] == "true") {
          result.EconomySeats[i] = "true"
          result.EconomyNumofSeats--
        }
        result.save().then((result) => {
          console.log(result);
        }).catch((e) => {
          console.log(e);
        })

      }
    }



  }).catch(err => {

    // console.log("ERRRRR")
  })



});
app.post("/EditFlight", authenticateToken, (req, res) => {
  console.log(req.body)
  console.log("EDITEDDD")
  const oldSeatsArray = req.body.oldSeats.split(",");
  Flight.findOne({
    Id: req.body.oldFlightId
  }).then((res) => {
    console.log(res)
    if (req.body.oldFlightCabin == "1") {
    for (let i = 0; i < oldSeatsArray.length; i++) {
  
      if (oldSeatsArray[i] == "true") {
        res.BusinessSeats[i] = "false"
        res.BusinessNumofSeats++
      }
    }
  }
  else{
    for (let i = 0; i < oldSeatsArray.length; i++) {
  
      if (oldSeatsArray[i] == "true") {
        res.EconomySeats[i] = "false"
        res.EconomyNumofSeats++
      }
    }
  }
var priceDifference= req.body.newFlightPrice - res.Price
    Reservation.findById(req.body.reservationNo).then((result) => {
      const newChosenSeatsArray = req.body.newChosenSeats.split(",");
      var str1 = ""
      for (let index = 0; index < newChosenSeatsArray.length; index++) {
        if (newChosenSeatsArray[index] === "true")
          str1 = str1 + " " + index + " " + " " + ","
      }
      if (req.body.departure == "1") {
        result.DepSeatsStr = str1
        result.ChosenSeatDeparture = req.body.newChosenSeats
        result.DepId= req.body.newFlightId
        result.DepartureDate= req.body.newFlightDate
        result.DepDepTime= req.body.newDepTime
        result.DepArrTime= req.body.newArrTime
        result.ChosenCabinDeparture=req.body.newCabin
  
      }
      else {
        result.RetSeatsStr = str1
        result.ChosenSeatReturn = req.body.newChosenSeats
        result.RetId= req.body.newFlightId
        result.ReturnDate= req.body.newFlightDate
        result.RetDepTime= req.body.newDepTime
        result.RetArrTime= req.body.newArrTime
        result.ChosenCabinReturn=req.body.newCabin
      }
      result.TotalPrice= result.TotalPrice+ priceDifference
  
      result.save().then((result) => {
        console.log(result);
      }).catch((e) => {
        console.log(e);
      })
  
    })

    
    res.save().then((res1) => {
      console.log(res1);
    }).catch((e) => {
      console.log(e);
    })

  }).catch(err => {

  
  })

  Flight.findOne({Id:req.body.newFlightId}).then((result1)=>{
    if (req.body.newCabin == "1") {
    for (let i = 0; i < req.body.newChosenSeats.length; i++) {
      console.log("got here")
 
      if (req.body.newChosenSeats[i] == 'true') {
        console.log("I")
        console.log(i)
        result1.BusinessSeats[i] = "true"
        result1.BusinessNumofSeats--
      }

    }
  }
    else{
      for (let i = 0; i < req.body.newChosenSeats.length; i++) {
        console.log("got here")
   
        if (req.body.newChosenSeats[i] == 'true') {
          console.log("I")
          console.log(i)
          result1.EconomySeats[i] = "true"
          result1.EconomyNumofSeats--
        }
  
      }
    }
    

    result1.save().then((result2) => {
      console.log(result2);
    }).catch((e) => {
      console.log(e);
    })


  })
})

app.post("/EditSeats", authenticateToken, (req, res) => {
  console.log("Final check")
  console.log(req.body)
  const oldSeatsArray = req.body.oldSeats.split(",");

  Reservation.findById(req.body.reservatinNo).then((result) => {
    var str1 = ""
    for (let index = 0; index < req.body.selectedSeats.length; index++) {
      if (req.body.selectedSeats[index] === "true")
        str1 = str1 + " " + index + " " + " " + ","
    }
    if (req.body.Departure == "1") {
      result.DepSeatsStr = str1
      result.ChosenSeatDeparture = req.body.selectedSeats
    }
    else {
      result.RetSeatsStr = str1
      result.ChosenSeatReturn = req.body.selectedSeats
    }

    result.save().then((result) => {
      console.log(result);
    }).catch((e) => {
      console.log(e);
    })

  })
  Flight.findOne({
    Id: req.body.editFlight
  }).then((res) => {
    console.log(res)
console.log("1111")
    if (req.body.editFlightCabin == "1") {
      console.log("YAYYYYYYYY R")
      console.log(oldSeatsArray)
      console.log("selected seats")
      console.log(req.body.selectedSeats)
      for (let i = 0; i < req.body.selectedSeats.length; i++) {
        console.log("got here")
        if (req.body.selectedSeats[i] == 'true') {
          console.log("I")
          console.log(i)
          res.BusinessSeats[i] = "true"
          res.BusinessNumofSeats--
        }
        if (oldSeatsArray[i] == "true") {
          res.BusinessSeats[i] = "false"
          res.BusinessNumofSeats++
        }
      }

    }
    else {
      for (let i = 0; i < req.body.selectedSeats.length; i++) {
        
        if (req.body.selectedSeats[i] == "true") {
          res.EconomySeats[i] = "true"
          res.EconomyNumofSeats--
        }
        if (oldSeatsArray[i] == "true") {
          res.EconomySeats[i] = "false"
          res.EconomySeats++
        }
    
      }
    }
    res.save().then((res1) => {
      console.log(res1);
    }).catch((e) => {
      console.log(e);
    })




  }).catch(err => {

    // console.log("ERRRRR")
  })
})
function authenticateToken(req, res, next) {

  // console.log(req);
  const token = req.headers['token']
  console.log(token)
  if (token == "null") {
    req.user = null;
    next();
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, user) => {
      console.log("NOT AUTHENTICATED");
      if (err) return res.sendStatus(403)
      req.user = user
      console.log();
      next()
    })
  }


}

function generateAccessToken(user) {
  return jwt.sign(user, "" + process.env.ACCESS_TOKEN_SECERT)


}









app.post("/payForBooking", (req, res) => {
  console.log("UNIQUE BODY")
  console.log(req.body)
  let amountInt = parseInt(req.body.amount, 10)
  stripe.charges.create(
    {
      amount: amountInt * 100,
      currency: 'usd',
      source: req.body.token,
      description:
        'Payment for a booking with the amount of ' + req.body.amount,
    },
    function (err, charge) {
      if (err) {
        console.log(err)
      
        return res.send(err)
      }
      console.log(charge)
      return res.send(charge)
    }
  )
})

app.post("/payForEdit", (req, res) => {
  console.log("UNIQUE EDIt")
  console.log(req.body)
  
  Flight.findOne({Id:req.body.oldFlightId}).then((result)=>{

    let amountInt =  parseInt(req.body.newPrice, 10) - result.Price
    console.log(amountInt)
    if(amountInt>0){
    stripe.charges.create(
      {
        amount: amountInt * 100,
        currency: 'usd',
        source: req.body.token,
        description:
          'Payment for a booking with the amount of ' + req.body.amount,
      },
      function (err, charge) {
        if (err) {
          console.log(err)
        
          return res.send(err)
        }
        console.log(charge)
        return res.send(charge)
      }
    )
    }
  else{
   return res.json("User Page");
  }
   
  })

})





app.post("/summaryReservationMail",authenticateToken, (req, res) => {
  const Obj = {}
  console.log(req.body)
    
  User.findOne({ Name: req.user.name }).then(result1 => {
    console.log("HHHHHHNNNNNM")
    Obj.mail = result1.Email

    Reservation.findOne({ Id: req.body._id }).then(result => {
    
      if(result == null){
        res.send(err)
        console.log("12345")
      }
      else{
        console.log("DKHAL")
      Obj.id=result._id
    
      Obj.from = result.From
      Obj.to = result.To
      Obj.returnseat = result.RetSeatsStr
      Obj.depseat = result.DepSeatsStr
      Obj.depdate = result.DepartureDate
      Obj.returndate = result.ReturnDate
      Obj.depdeptime = result.DepDepTime
      Obj.deparrtime = result.DepArrTime
      Obj.retdeptime = result.RetDepTime
      Obj.retarrtime = result.RetArrTime
      Obj.totalprice = result.TotalPrice
      Obj.cabindep = result.ChosenCabinDeparture
      Obj.cabinret = result.ChosenCabinReturn
      }
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'menna.shoulkamy@gmail.com',
          pass: 'Menna1234',
        },
        secure: true,
      });
      var mailOptions = {
        from: 'menna.shoulkamy@gmail.com',  // sender address
        to: Obj.mail,   // list of receivers
        subject: '\nReservation Summary',
        text: '\nReservation No:' + Obj.id + '' + '\nFrom:' +Obj.from + '' + '\nTo:' +Obj.to + ''
        + '\nReturn Seat(s):' + Obj.returnseat + ''   + '\nDeparture Seat(s):' +  Obj.depseat + ''
        + '\nDeparture Date:' +  Obj.depdate+ ''+ '\nReturn Date' +  Obj.returndate+ ''
        + '\nDeparture Flight Departure Time:' + Obj.depdeptime + ''+ '\nDeparture Flight Arrival Time:' +  Obj.deparrtime + ''
        + '\nReturn Flight Departure Time:' + Obj.retdeptime  + ''+ '\nReturn Flight Arrival Time:' +  Obj.retarrtime + ''
        + '\nTotal Price:' + Obj.totalprice + ''+ '\nCabin Departure:' +   Obj.cabindep+ ''
        + '\nCabin Return:' + Obj.cabinret+ ''
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err)
          console.log(err)
        else
          console.log(info);
      });
    }).then(err => {

    })
 
 

});

})


