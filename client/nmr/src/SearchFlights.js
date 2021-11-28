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

export default function SearchFlights() {
    const classes = useStyles()
    const [Id, setId] = useState(-1);
    const [FlightNumber, setFlightNumber] = useState(-1);
    const [From, setFrom] = useState("");
    const [To, setTo] = useState("");
    const [FlightDate, setFlightDate] = useState('0000-00-00');
    const [ArrivalTime, setArrivalTime] = useState('0000-00-00');
    const [DepartureTime, setDepartureTime] = useState('0000-00-00');
    const [BusinessNumofSeats, setBusinessNumofSeats] = useState(-1);
    const [EconomyNumofSeats, setEconomyNumofSeats] = useState(-1);
    const [SearchResults, setSearchResults] = useState([]);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);




    function handleSearch(event) {
        axios.post('http://localhost:5000/searchFlights', SearchFlights).then((response) => {
            setSearchResults(response.data)

            console.log("HERERER$RERET")
            console.log(SearchResults);
            
            console.log("yaaayy")
            setSendRequest(true);

        }).catch(err => {
            console.log(err)
            console.log("i am here")
        })
        
      


    }

    
  
    const [sendRequest, setSendRequest] = useState(false);
   
    const SearchFlights = {

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
            <h1>Search Flights</h1>
            <div className={classes.root}>

                <TextField
                    required
                    id="FlightNumber"
                    label="Flight Number"
                    defaultValue=""
                    variant="filled"
                    name="flightnumber"
                    onChange={(e) => setFlightNumber(e.target.value)}
                />

                <TextField
                    required
                    id="from"
                    label="From"
                    defaultValue=""
                    variant="filled"
                    name="flightnumber"
                    onChange={(e) => setFrom(e.target.value)}
                />
                <TextField
                    required
                    id="to"
                    label="To"
                    defaultValue=""
                    variant="filled"
                    onChange={(e) => setTo(e.target.value)}
                />
                <TextField
                    required
                    id="flightDate"
                    label="Flight Date"
                    type="date"
                    defaultValue=""
                    variant="filled"
                    onChange={(e) => setFlightDate(e.target.value)}
                />
                <TextField
                    required
                    id="arrivalTime"
                    label="Arrival Time"
                    type="time"
                    defaultValue=""
                    variant="filled"
                    onChange={(e) => setArrivalTime(e.target.value)}
                />
                <TextField
                    required
                    id="departureTime"
                    label="Departure Time"
                    type="time"
                    defaultValue=""
                    variant="filled"
                    onChange={(e) => setDepartureTime(e.target.value)}
                />


                <TextField
                    required
                    id="numOfBusinessSeatsAvailable"
                    label="Number of Business Seats Available"
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
                    label="Number of Economy Seats Available"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    onChange={(e) => setEconomyNumofSeats(e.target.value)}
                />
                <br />
                <br />
                <br />

                <Button onClick={handleSearch} variant="contained">Search Flight
                </Button>

            {SearchResults.length !== 0 ? SearchResults.values.map(flight => {
                return <div className="flights">
                  
                    <ul >
                        <li>Flight Number : {flight.FlightNumber} </li>
                        <li>From : {flight.From} </li>
                        <li>To : {flight.To} </li>
                        <li> Flight Date : {flight.FlightDate} </li>
                        <li> Arrival Time : {flight.ArrivalTime} </li>
                        <li> Departure Time : {flight.DepartureTime} </li>
                        <li>Number of Business Seats Available : {flight.BusinessNumofSeats} </li>
                        <li>Number of Economy Seats Available : {flight.EconomyNumofSeats} </li>


                    </ul>


                </div>

            }) : <h1>Search Results</h1>
            }








            </div>



        </div>


    )
}
