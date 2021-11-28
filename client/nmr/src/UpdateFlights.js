import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
    height: 40
  },
}))
const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function UpdateFlights() {
  const classes = useStyles()
  const [Id, setId] = useState(-1);
  const [FlightNumber, setFlightNumber] = useState(-1);
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");
  const [FlightDate, setFlightDate] = useState('0000-00-00');
  const [ArrivalTime, setArrivalTime] = useState('00:00:00.0000');
  const [DepartureTime,setDepartureTime] = useState('00:00:00.000');
  const [BusinessNumofSeats, setBusinessNumofSeats] = useState(-1);
  const [EconomyNumofSeats, setEconomyNumofSeats] = useState(-1);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);




  function handleUpdate(event) {
    axios.post('http://localhost:5000/updateFlights', updatedFlight).then(() => {
        console.log("yaaayy")
        setSendRequest(true);

    }).catch(err => {
        console.log(err)
        console.log("i am here")
    })
  }
  const [sendRequest, setSendRequest] = useState(false);

  
 
  const updatedFlight = {
    Id:Id,
    FlightNumber: FlightNumber,
    From: From,
    To: To,
    FlightDate: new Date(FlightDate),
    ArrivalTime:new Date(FlightDate +"T"+ ArrivalTime+":00.1232"),
    DepartureTime: new Date(FlightDate +"T"+ DepartureTime+":00.1232"),
   
    BusinessNumofSeats: BusinessNumofSeats,
    EconomyNumofSeats: EconomyNumofSeats
  }
  return (
    <div>
      <h1>Update Flight</h1>
      <div className={classes.root}>
      <TextField
          required
          id="Id"
          label="Flight Id"
          defaultValue=""
          variant="filled"
          name="id"
          onChange={(e) => setId(e.target.value)}
        />
      <TextField
          required
          id="FlightNumber"
          label="New Flight Number"
          defaultValue=""
          variant="filled"
          name="flightnumber"
          onChange={(e) => setFlightNumber(e.target.value)}
        />
        
        <TextField
          required
          id="from"
          label="New From"
          defaultValue=""
          variant="filled"
          name="flightnumber"
          onChange={(e) => setFrom(e.target.value)}
        />
        <TextField
          required
          id="to"
          label="New To"
          defaultValue=""
          variant="filled"
          onChange={(e) => setTo(e.target.value)}
        />
        <TextField
          required
          id="flightDate"
          label="New Flight Date"
          type="date"
          defaultValue=""
          variant="filled"
          onChange={(e) => setFlightDate(e.target.value)}
        />
        <TextField
          required
          id="arrivalTime"
          label="New Arrival Time"
          type="time"
          defaultValue=""
          variant="filled"
          onChange={(e) => setArrivalTime(e.target.value)}
        />
    <TextField
          required
          id="departureTime"
          label="New Departure Time"
          type="time"
          defaultValue=""
          variant="filled"
          onChange={(e) => setDepartureTime(e.target.value)}
        />


        <TextField
          required
          id="numOfBusinessSeatsAvailable"
          label="New Number of Business Seats Available"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={(e) => setBusinessNumofSeats(e.target.value)}
        />
          <TextField
          required
          id="numOfEconomySeatsAvailable"
          label="New Number of Economy Seats Available"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={(e) => setEconomyNumofSeats(e.target.value)}
        />
        <br />
        <br/>
        <br/>
       
          <Button  onClick={handleUpdate} variant="contained">Update Flight
          </Button>
         
          
         
      </div>
    </div>

  )
}