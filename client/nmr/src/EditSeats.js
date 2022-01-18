import React from 'react';
import axios, { Axios } from "axios";
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react";
import { blue } from '@mui/material/colors';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const useStyles = makeStyles((theme) => ({
    colorBlue: {}
    ,

}))


const selectedBussinessSeatsDep = ["false", "false", "false", "false", "false", "false", "false", "false", "false"];

export default function EditSeats() {
    const classes = useStyles()
    const selectedSeatsDep = {}
    const selectedSeatsRet = {}
    const editFlight = window.localStorage.getItem('EditFlightId')
    const editFlightCabin = window.localStorage.getItem('EditCabinClass')
    const oldSeats= window.localStorage.getItem('EditChosenSeats')
    console.log(oldSeats)
    const reservatinNo= window.localStorage.getItem('ReservationNo')
   const Departure= window.localStorage.getItem('Departure')

    const [depFlightId, setDepFlightId] = useState(0);
    const [retFlightId, setRetFlightId] = useState(0);
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

     
    const [open, setOpen] = React.useState(false);

    const headers = window.localStorage.getItem('token')
    const handleClick = () => {
        setOpen(true);
      };

      const handleClose = (event, reason) => {
        window.location = '/ViewReservations'
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

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
   
         axios.post('http://localhost:5000/EditSeats', { editFlight:editFlight,
         editFlightCabin:editFlightCabin,
         oldSeats:oldSeats,
         reservatinNo:reservatinNo,
         Departure:Departure,
         selectedSeats: selectedBussinessSeatsDep
             
         }, {
            headers: {
                token: headers,
            },
       }
        ).then(() => {
            console.log("yaaayy")
           // setOpen(true)


        }).catch(err => {
            console.log(err)
            console.log("i am here")
            //setOpen(true)
        })
        setOpen(true)
        // const resrvation = {
        //     DepId:depFlight,
        //     RetId:retFlight,
        //     From: depFrom,
        //     To: depTo,
        //     DepartureDate: depFlightDate,
        //     ReturnDate: retFlightDate,
        //     DepDepTime: depDepartureTime,
        //     DepArrTime: depArrivalTime,
        //     RetDepTime: retDepartureTime,
        //     RetArrTime: retArrivalTime,
        //     TotalPrice: depPrice + retPrice,
        //     ChosenCabinDeparture: depCabinClass,
        //     ChosenSeatDeparture: selectedBussinessSeatsDep,
        //     ChosenCabinReturn: retCabinClass,
        //     ChosenSeatReturn: selectedBussinessSeatsRet


        // }
        // selectedSeatsDep.Id = depFlight
        // selectedSeatsDep.selectedBussinessSeats = selectedBussinessSeatsDep
        // selectedSeatsDep.CabinClass = depCabinClass


        // selectedSeatsRet.Id = retFlight
        // selectedSeatsRet.selectedBussinessSeats = selectedBussinessSeatsRet

        // selectedSeatsRet.CabinClass = retCabinClass

        // console.log(resrvation)
        // axios.post('http://localhost:5000/reserve', resrvation, {
        //     headers: {
        //         token: headers,
        //     },
       // }
//         ).then(() => {
//             console.log("yaaayy")


//         }).catch(err => {
//             console.log(err)
//             console.log("i am here")
//         })
// console.log(selectedSeatsDep)
        // axios.post('http://localhost:5000/selectBussinessSeats', selectedSeatsDep, {
        //     headers: {
        //         token: headers,
        //     },
        // }).then(() => {
        //     console.log("yaaayy")


        // }).catch(err => {
        //     console.log(err)
        //     console.log("i am here")
        // })
        // console.log(selectedSeatsRet)
        // axios.post('http://localhost:5000/selectBussinessSeats', selectedSeatsRet, {
        //     headers: {
        //         token: headers,
        //     },
        // }).then(() => {
        //     console.log("yaaayy")


        // }).catch(err => {
        //     console.log(err)
        //     console.log("i am here")
        // })
        // window.location = '/ReservationAfterConfirm'
    }
    function get(event) {

    }
    useEffect(() => {

      
      
        axios.post('http://localhost:5000/getBussinessSeats', {
            Id: editFlight,
            CabinClass: editFlightCabin
        }).then((response) => {
           
            setSeatsArrDep(response.data.Seats)
            setDepFlightNumber(response.data.FlightNumber)
            setDepFrom(response.data.From)
            setDepTo(response.data.To)
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
                <h2>Available Flight Seats</h2>
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
            <Snackbar open={open} autoHideDuration={1700} onClose={handleClose}>
        <Alert onClose={handleClose}  sx={{ width: '100%' }}>
       Seat changed successfully!   
        </Alert>

      </Snackbar>

        </div>
    )
}