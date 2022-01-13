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


  app.post("/reservationAfterConfirm",authenticateToken, (req, res) => {
    console.log("HEREEEEEE")
   console.log(req.user)
    
    Reservation.find({ Name : req.user.name }).then(result => {

      console.log(req.user.name)
      console.log("HEREEEEEE1")
      console.log("1")
      console.log(result)
      res.json( result)
      
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
app.post('/UserSearch' , (req,res) => {
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
      console.log(result)
     for(let i =0 ; i<result.length ; i++){
       if(req.body.cabinClass === 1){
        if (result[i].BusinessNumofSeats>=parseInt(req.body.numberofPassengers, 10)){
          var TripDuration = (parseInt(Math.abs(result[i].ArrivalTime - result[i].DepartureTime )/ (1000*60*60)%24,10)+ "Hours" + parseInt(Math.abs(result[i].ArrivalTime.getTime() - result[i].DepartureTime.getTime())/(1000*60)%60,10)+"Minutes");
          result[i].TripDuration = TripDuration;
          console.log(TripDuration);
          resultFinal.push(result[i])

        }
          
       }
       if(req.body.cabinClass === 2) {
        if (result[i].EconomyNumofSeats>=parseInt(req.body.numberofPassengers, 10)){
          var TripDuration = (parseInt(Math.abs(result[i].ArrivalTime - result[i].DepartureTime )/ (1000*60*60)%24,10)+ " Hours " + parseInt(Math.abs(result[i].ArrivalTime.getTime() - result[i].DepartureTime.getTime())/(1000*60)%60,10)+" Minutes");
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


app.post('/token', (req,res) => {
  const refreshToken = req.body.token
  if(refreshToken == null) return res.sendStatus(401)
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken,""+ process.env.REFRESH_TOKEN_SECERT,(err, user) =>{
  if(err) return res.sendStatus(403)
  const accessToken = generateAccessToken({name :user.name})
  res.json({accessToken : accessToken})
  })
});

app.post('/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  console.log('METHOD ACTIVE')
  try {
    let user = await User.findOne({
      email,
    });
    if (user) {
      return res.json({
        statusCode: 0,
        message: 'email already exists, please sign in',
      })
    } else {
      var newUser = new User({
        username: email,
        Name: name,
        password: bcrypt.hashSync(password, 10),
        isAdmin: false,
      })
      newUser.save(function (err, user) {
        if (err) {
          return (res.status = (400).send({
            message: err,
          }))
        } else {
          return res.json(user)
        }
      })
    }
  } catch (err) {
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
  // console.log(req.body);
  User.findOne({ Name: req.body.username }).then(result => {
    var result2 = bcrypt.compareSync(req.body.password, result.password)
    if (result != null) {

      if (result2) {
        console.log("equal")
        const user = { name: req.body.username };
        console.log(user)
        const accessToken = generateAccessToken(user)
        const refreshToken= jwt.sign(user,""+ process.env.REFRESH_TOKEN_SECERT)
        refreshTokens.push(refreshToken)
        console.log("yaayyy")
        res.json({ accessToken: accessToken, refreshToken: refreshToken })
        console.log("yaayyy")
        console.log(accessToken)
        res.json("true");
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
    var TripDuration = (parseInt(Math.abs(result.ArrivalTime - result.DepartureTime )/ (1000*60*60)%24,10)+ "Hours" + parseInt(Math.abs(result.ArrivalTime.getTime() - result.DepartureTime.getTime())/(1000*60)%60,10)+"Minutes");
console.log("FINALLLLL")
    console.log(req.body.CabinClass)
    if (req.body.CabinClass == "1") {
      
      const Obj={
        Id: result.Id,
        FlightNumber: result.FlightNumber,
        From:result.From,
        To:result.To,
        FlightDate:result.FlightDate,
        ArrivalTime:result.ArrivalTime,
        DepartureTime:result.DepartureTime,
        Seats:result.BusinessSeats,
        TripDuration: TripDuration
      }
      console.log(Obj)
      res.send(Obj)
      console.log("PLSSS")
    }
    else {
    
        const Obj={
          Id: result.Id,
          FlightNumber: result.FlightNumber,
          From:result.From,
          To:result.To,
          FlightDate:result.FlightDate,
          ArrivalTime:result.ArrivalTime,
          DepartureTime:result.DepartureTime,
          Seats:result.EconomySeats,
          TripDuration: TripDuration
        }
        console.log(Obj)
        res.send(Obj)
        console.log("PLSSS")
    }
  }).catch(err => {

  })

});

app.post("/getTempChosenFlights",authenticateToken, (req, res) => {
  console.log(req.user)
  const Obj = {
  Name: req.user.name,
    Departure: req.body.Departure,

  }

  tempChosenFlight.findOne(Obj).then(result => {
    console.log("HERE")
    console.log(result)
    res.send(result)
   

})
})
app.post("/postTempChosenFlights",authenticateToken, (req, res) => {

  if(req.user==null){
    return res.send("null")
  } else {
    console.log(req.user)
    const Obj =[ {
     Name:req.user.name,
      Id: req.body.Id,
      CabinClass: req.body.CabinClass,
      Departure: req.body.Departure
    }]
    tempChosenFlight.insertMany(Obj).then(result => {
      console.log(result)
      res.send("success")
    }).then(err=>{
  
    })
  }
  
 
})

app.post("/reserve", (req, res) => {
  console.log(req.body)
  var str1=""
  for (let index = 0; index < req.body.ChosenSeatDeparture.length; index++) {
    if(req.body.ChosenSeatDeparture[index]==="true")
        str1=str1+" "+index+" "+ " "+","
   }  
   var str2=""
   for (let index = 0; index < req.body.ChosenSeatReturn.length; index++) {
     if(req.body.ChosenSeatReturn[index]==="true")
         str2=str2+" "+index+" "+ " "+","
    }  
  const resrvation=[{
    Name:req.body.Name,
    From: req.body.From,
    To:req.body.To,
    DepartureDate: req.body.DepartureDate,
    ReturnDate: req.body.ReturnDate,
    DepDepTime: req.body.DepDepTime,
    DepArrTime: req.body.DepArrTime,
    RetDepTime: req.body.RetDepTime,
    RetArrTime:req.body. RetArrTime,
    TotalPrice: req.body.TotalPrice,
    ChosenCabinDeparture: req.body.ChosenCabinDeparture,
    ChosenSeatDeparture:req.body. ChosenSeatDeparture,
    ChosenCabinReturn:req.body.ChosenCabinReturn,
    ChosenSeatReturn:req.body.ChosenSeatReturn,
    DepSeatsStr:str1,
    RetSeatsStr:str2


}]
  
  Reservation.insertMany(resrvation).then(result => {
    console.log(result)
    res.send("success")
  }).then(err=>{

  })
 
})
app.post("/viewReservations",authenticateToken, (req, res) => {
  console.log("HEREEEEEE")
 console.log(req.user)
  
  Reservation.find({ Name : req.user.name }).then(result => {
    console.log(req.user.name)
    console.log("HEREEEEEE1")
    console.log("1")
    console.log(result)
    res.json( result);
  }) 
});
app.post("/profile",authenticateToken, (req, res) => {
  console.log("HEREEEEEE")
 console.log(req.user)
  
  User.find({ Name : req.user.name }).then(result => {
    console.log(req.user.name)
    console.log("HEREEEEEE1")
    console.log("1")
    console.log(result)
    res.json( result);
  }) 
 
});
app.post("/updateProfile",authenticateToken,  (req, res) => {


  const newObj = {}
  if (req.body.FirstName!= "")
    newObj.FirstName = req.body.FirstName;
    console.log(req.body.FirstName);
   
  if (req.body.LastName!= "")
    newObj.LastName = req.body.LastName;
  if (req.body.Email!= "")
    newObj.Email = req.body.Email;
  if (req.body.PassportNo!= "")
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
app.post("/deleteReservation",authenticateToken, (req, res) => {
  const Obj={}
 
  User.findOne({Name:req.user.name}).then(result=>{
    console.log("HHHHHHNNNNNM")
   Obj.mail=result.Email
   
    Reservation.findOne({ ReservationNo : req.body._id}).then(result=>{
      console.log("LLLLLLLLLLNM")
      console.log(result)
      Obj.price=result.TotalPrice
    
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
            to: ''+Obj.mail,   // list of receivers
            subject: 'Cancelled Booking',
            text: 'Booking is Cancelled, Total amount to be refunded is'+Obj.price +''
          };
          transporter.sendMail(mailData, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
    }).then(err=>{
  
    })
  }).then(err=>{

  })  

    
  Reservation.findOneAndDelete({ ReservationNo : (req.body._id) }).then(result => {
    //console.log(req.body)
    console.log("yaayyy")
  
    
  }).catch(err => {

    console.log(parseInt(req.body.ReservationNo, 10))
    console.log(req.body)
    console.log(err)
    console.log("nay")


  })
  
});
app.get("/getFlight", (req, res) => {

  Flight.find({ UserId: req.body.UserId }, (err, values) => {
    console.log(values)
    res.json({ values });

  })
})
app.post("/selectBussinessSeats",authenticateToken, (req, res) => {

  console.log("LOOOOOOK")
  console.log(req.body.selectedBussinessSeats)


  Flight.findOne({
    Id: req.body.Id
  }).then((result) => {
    // console.log("LOOKK HERE")
    // console.log(req.body.Id)
    //console.log(result)
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

    tempChosenFlight.findOneAndDelete({Name: req.user.name,
    Id:req.body.Id}).then(result=>{
    }).catch(err=>{

    })

  }).catch(err => {

    // console.log("ERRRRR")
  })



});
function authenticateToken(req,res,next){

  // console.log(req);
  const token= req.headers['token']
  console.log(token)
  if(token == "null"){
    req.user = null;
    next();
  } else {
    jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,(err,user)=>{
      console.log("NOT AUTHENTICATED");
      if(err)return res.sendStatus(403)
      req.user=user
      console.log();
      next()
    })
  }
  
  
}

function generateAccessToken(user){
  return jwt.sign(user,""+ process.env.ACCESS_TOKEN_SECERT)

  
}


















