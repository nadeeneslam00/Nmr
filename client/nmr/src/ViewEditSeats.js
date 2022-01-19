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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './EditCheckoutForm'
const stripePromise = loadStripe('pk_test_51KJgsUGPL5oMjwemODPzJ0YtMTpHYf3sBLGH8o6xM369z5SbgqnzqIPw6uwJRmceHl2IRPzswcSpmL3icfwVbct100Aces5NdK');

const useStyles = makeStyles((theme) => ({
    colorBlue: {}
    ,

}))
const getDep = {
    Departure: true
}
const getRet = {
    Departure: false
}

const selectedBussinessSeatsDep = ["false", "false", "false", "false", "false", "false", "false", "false", "false"];
const selectedBussinessSeatsRet = ["false", "false", "false", "false", "false", "false", "false", "false", "false"];

export default function ViewEditSeats() {
    const classes = useStyles()
    const selectedSeatsDep = {}
    const selectedSeatsRet = {}
    const [open, setOpen] = React.useState(false);
    const Departure = window.localStorage.getItem('Departure')
    const ReservationNo = window.localStorage.getItem('ReservationNo')
    const NewFlightId = window.localStorage.getItem('NewFlightId')
    const NewFlightCabin = window.localStorage.getItem('NewFlightCabin')
    const oldSeats = window.localStorage.getItem('oldSeats')

    const OldFlightId = window.localStorage.getItem('OldFlightId')
    const OldFlightCabin = window.localStorage.getItem('OldFlightCabin')

    const [depCabinClass, setDepFlightCabinClass] = useState("");
    const [retCabinClass, setRetFlightCabinClass] = useState("");
    const [seatsArrDep, setSeatsArrDep] = useState([]);
    const [seatsArrRet, setSeatsArrRet] = useState([]);
    const [depFlightNumber, setDepFlightNumber] = useState(-1);
    const [retFlightNumber, setRetFlightNumber] = useState(-1);
    const [depFrom, setDepFrom] = useState("");
    const [retFrom, setRetFrom] = useState("");
    const [depTo, setDepTo] = useState("");
    const [retTo, setRetTo] = useState("");
    const [depFlightDate, setDepFlightDate] = useState('0000-00-00');
    const [retFlightDate, setRetFlightDate] = useState('0000-00-00');
    const [depArrivalTime, setDepArrivalTime] = useState('0000-00-00');
    const [depDepartureTime, setDepDepartureTime] = useState('0000-00-00');
    const [retArrivalTime, setRetArrivalTime] = useState('0000-00-00');
    const [retDepartureTime, setRetDepartureTime] = useState('0000-00-00');
    const [depPrice, setDepPrice] = useState(-1);
    const [retPrice, setRetPrice] = useState(-1);
    const [depTripDuration, setDepTripDuration] = useState("");
    const [retTripDuration, setRetTripDuration] = useState("");
    const [vis, setVis] = useState("hidden");
    const handleClose = (event, reason) => {

        if (reason === 'clickaway') {
            window.location = './Profile'
            return;
        }
        window.location = './ViewReservations'
        setOpen(false);
    };
    const headers = window.localStorage.getItem('token')



    function handleSeat(e) {
        if (e.target.style.backgroundColor != "red") {
            e.target.style.backgroundColor = "red"
            selectedBussinessSeatsDep[parseInt(e.target.innerHTML.charAt(0), 10)] = "true";
        } else {
            e.target.style.backgroundColor = "white"
            selectedBussinessSeatsDep[parseInt(e.target.innerHTML.charAt(0), 10)] = "false";
        }
        console.log(selectedBussinessSeatsDep[parseInt(e.target.innerHTML.charAt(0), 10)])
        console.log(parseInt(e.target.innerHTML.charAt(0), 10))
        console.log(e.target.innerHTML.charAt(0))
    }

    function handleSelect(e) {
        window.localStorage.setItem('reservationNo',ReservationNo)
        window.localStorage.setItem('oldFlightId',OldFlightId)
        window.localStorage.setItem('oldFlightCabin',OldFlightCabin)
        window.localStorage.setItem('oldSeats',oldSeats)
        window.localStorage.setItem('newFlightId',NewFlightId)
        window.localStorage.setItem('newFrom',depFrom)
        window.localStorage.setItem('newTo',depTo)
        window.localStorage.setItem('newFlightDate',depFlightDate)
        window.localStorage.setItem('departure',Departure)
        window.localStorage.setItem('newDepTime',depDepartureTime)
        window.localStorage.setItem('newArrTime',depArrivalTime)
        window.localStorage.setItem('newFlightPrice',depPrice)
        window.localStorage.setItem('newCabin',NewFlightCabin)
        window.localStorage.setItem('newChosenSeats',selectedBussinessSeatsDep)
        
        // const Obj = {
        //     reservationNo: ReservationNo,
        //     oldFlightId: OldFlightId,
        //     oldFlightCabin: OldFlightCabin,
        //     oldSeats: oldSeats,
        //     newFlightId: NewFlightId,
        //     newFrom: depFrom,
        //     newTo: depTo,
        //     newFlightDate: depFlightDate,
        //     departure: Departure,
        //     newDepTime: depDepartureTime,
        //     newArrTime: depArrivalTime,
        //     newFlightPrice: depPrice,
        //     newCabin: NewFlightCabin,
        //     newChosenSeats: selectedBussinessSeatsDep,


        // }
        // axios.post('http://localhost:5000/EditFlight', Obj, {
        //     headers: {
        //         token: headers,
        //     },
        // }
        // ).then(() => {

        //     console.log("yaaayy")
        //     setOpen(true)

        // }).catch(err => {
        //     setOpen(true)
        //     console.log(err)
        //     console.log("i am here")
        // })
        console.log("OPENNNNNNNN")
        setVis(true)
        //setOpen(true)

    }
    function get(event) {

    }
    useEffect(() => {






        axios.post('http://localhost:5000/getBussinessSeats', {
            Id: NewFlightId,
            CabinClass: NewFlightCabin
        }).then((response) => {

            setSeatsArrDep(response.data.Seats)
            setDepFlightNumber(response.data.FlightNumber)
            setDepFrom(response.data.From)
            setDepTo(response.data.To)
            setDepPrice(response.data.Price)
            setDepFlightDate(response.data.FlightDate)
            setDepArrivalTime(response.data.ArrivalTime)
            setDepDepartureTime(response.data.DepartureTime)
            setDepTripDuration(response.data.TripDuration)

            console.log(seatsArrDep);
            console.log("i got triggered now")

        }).catch(err => {
            console.log(err)
            console.log("i am here")
        })















    }, [])





    return (
        <div>
            <div style={{ display: "flex" }}>
                <h2>Departure Flight Seats</h2>
                {seatsArrDep.length !== 0 ? seatsArrDep.map((seat, index) => {
                    if (seat == "false") {
                        return <div className="seats">

                            <Button onClick={handleSeat} variant="outlined" style={{ marginLeft: "2vw", marginTop: "2vw" }}>{index}</Button>

                        </div>

                    }
                    else {
                        return <div className="seats">

                            <Button style={{ marginLeft: "2vw", marginTop: "2vw", backgroundColor: "black" }}>X</Button>

                        </div>

                    }
                }) : <h1>No Results Found</h1>
                }

            </div>

            <div>
                <br />

                <Button onClick={() => {
                    const confirmBox = window.confirm(
                        ' Departure Flight Details:' +
                        '                                              ' +
                        ' Flight Number:' + depFlightNumber +
                        '                                            ' +
                        'From:' + depFrom +
                        '                                           ' +
                        'To:' + depTo +
                        '                                                   ' +
                        'FlightDate:' + depFlightDate +
                        '                                                    ' +
                        'Arrival Time:' + depArrivalTime +
                        '                                                     ' +
                        'Departure Time:' + depDepartureTime +
                        '                                                  ' +
                        'Trip Duration:' + depTripDuration +
                        '                                                   ' +

                        ' Return Flight Details:' +
                        '                                                     ' +

                        'Flight Number:' + retFlightNumber +
                        '                                             ' +
                        ' From:' + retFrom +
                        '                               ' +
                        'To:' + retTo +
                        '                               ' +
                        'FlightDate:' + retFlightDate +
                        '                               ' +
                        'Arrival Time:' + retArrivalTime +
                        '                               ' +
                        'Departure Time:' + retDepartureTime +
                        '                               ' +
                        'Trip Duration:' + retTripDuration






                    )
                    if (confirmBox === true) {
                        handleSelect()
                    }
                }}
                    variant="outlined">Select Seats</Button>
            </div>

         
            <div style={{ visibility: vis }}>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>

        </div>
    )
}