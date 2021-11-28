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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '40%',
        height: 40
    }
}))

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];



export default function DeleteFlights() {


    const classes = useStyles()
    const [Id, setId] = useState(0);
    const [FlightNumber, setFlightNumber] = useState(0);
    const [From, setFrom] = useState("");
    const [To, setTo] = useState("");
    const [FlightDate, setFlightDate] = useState('1987-10-26');
    const [ArrivalTime, setArrivalTime] = useState('1987-10-26');
    const [DepartureTime, setDepartureTime] = useState('1987-10-26');
    const [BusinessNumofSeats, setBusinessNumofSeats] = useState(0);
    const [EconomyNumofSeats, setEconomyNumofSeats] = useState(0);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);



    //function confirmDeletion(event){

    // var userAdjective = prompt("Please provide an Adjective");
    // alert(userAdjective);
    //}


    function handleDelete(event) {
        axios.post('http://localhost:5000/deleteFlights', deletedFlight).then(() => {
            console.log("yaaayy")
            setSendRequest(true);

        }).catch(err => {
            console.log(err)
            console.log("i am here")
        })
    }
    const [sendRequest, setSendRequest] = useState(false);
    const [searchResults, setSearcResults] = useState({})
    const deletedFlight = {
        Id: Id,
        FlightNumber: FlightNumber

    }
    return (
        <div>
            <h1>Delete Flight</h1>
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
                    label="Flight Number"
                    defaultValue=""
                    variant="filled"
                    name="flightnumber"
                    onChange={(e) => setFlightNumber(e.target.value)}
                />
                <br />
                <br />
                <br />
                <Button onClick={() => {
                    const confirmBox = window.confirm(
                        "Do you really want to delete this Flight?"
                    )
                    if (confirmBox === true) {
                        handleDelete()
                    }
                }} variant="contained">Delete Flight
                </Button>

            </div>




        </div>


    )

}
