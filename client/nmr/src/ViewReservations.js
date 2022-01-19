
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormGroup from '@mui/material/FormGroup';

import Checkbox from '@mui/material/Checkbox';

export default function ViewReservations() {
    const [reservationsArr, setreservationsArr] = useState([]);
    const [DepflightsArr, setDepflightsArr] = useState([]);

    const [ArrflightsArr, setArrflightsArr] = useState([]);
    const headers = window.localStorage.getItem('token')
    console.log(headers)
    useEffect(() => {

        axios.post('http://localhost:5000/viewReservations', {}, {
            headers: {
                token: headers,
            },
        }
        ).then((response) => {
            setreservationsArr(response.data)
            console.log(reservationsArr);
            console.log("i got triggered now")
        }).catch(err => {
            console.log(err)
            console.log("i am here")
        })

    }, [])
    function handleReturn(event) {
        // axios.post('http://localhost:5000/UserSearch', DepSearchDetails).then((response) => {
        //     console.log("arrived")
        //     console.log(response.data)
        //     setDepSearchResults(response.data)
        //     console.log(DepSearchResults)
        // }).catch(err => {
        //     console.log(err)
        //     console.log("i am here1")
        // })
    }
    return (
        <div>

            {reservationsArr.length !== 0 ? reservationsArr.map(reservation => {
                return <div className="reservations">
                    <Card sx={{ minWidth: 20 }}>
                        <CardContent>

                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

                                <ul >
                                    <li>Reservation Number : {reservation._id}</li>

                                    <li> Total Price : {reservation.TotalPrice} </li>
                                    <li> Departure Flight : {reservation.From} ==== {reservation.To}  </li>
                                    <li> Departure Flight Number : {reservation.DepId} </li>
                                    <li>Date :  {reservation.DepartureDate} </li>

                                    <li> Departure Time : {reservation.DepDepTime} </li>
                                    <li>Arrival Time : {reservation.DepArrTime}</li>

                                    <li> Chosen Cabin : {reservation.ChosenCabinDeparture}</li>

                                    <li> Chosen Seat : {reservation.DepSeatsStr}</li>

                                    <li> Return Flight : {reservation.To} ==== {reservation.From}  </li>
                                    <li> Return Flight Number : {reservation.RetId} </li>
                                    <li> Date : {reservation.ReturnDate}</li>

                                    <li>  Departure Time :  {reservation.RetDepTime} {reservation.RetArrTime}</li>

                                    <li>Arrival Time : {reservation.RetArrTime}</li>

                                    <li>  Chosen Cabin : {reservation.ChosenCabinReturn}</li>

                                    <li>  Chosen Seat : {reservation.RetSeatsStr}</li>

                                </ul>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={(e) => {
                                window.localStorage.setItem('ReservationNo', reservation._id)
                                window.localStorage.setItem('EditFlightId', reservation.DepId)
                                window.localStorage.setItem('EditCabinClass', reservation.ChosenCabinDeparture)
                                window.localStorage.setItem('EditChosenSeats', [reservation.ChosenSeatDeparture])
                                window.localStorage.setItem('Departure',1)
                                window.location = '/EditSeats'
                          


                            }} variant="contained">Edit Departure Flight Seats
                            </Button>
                            <Button onClick={(e) => {
                                window.localStorage.setItem('ReservationNo', reservation._id)
                                window.localStorage.setItem('EditFlightId', reservation.DepId)
                                window.localStorage.setItem('EditFlightFrom',reservation.From)
                                window.localStorage.setItem('EditFlightTo',reservation.To)
                                window.localStorage.setItem('EditCabinClass', reservation.ChosenCabinDeparture)
                                window.localStorage.setItem('EditChosenSeats', reservation.ChosenSeatDeparture)
                                window.localStorage.setItem('Departure',1)
                                window.location = '/EditFlight'
                          


                            }} variant="contained">Edit Departure Flight Date
                            </Button>
                            <Button onClick={(e) => {
                                window.localStorage.setItem('ReservationNo', reservation._id)
                                window.localStorage.setItem('EditFlightId', reservation.RetId)
                                window.localStorage.setItem('EditCabinClass', reservation.ChosenCabinReturn)
                                window.localStorage.setItem('EditChosenSeats', reservation.ChosenSeatReturn)
                                window.localStorage.setItem('Departure',0)
                                window.location = '/EditSeats'
                                console.log(window.localStorage.getItem('EditFlightId'))


                            }} variant="contained">Edit Return Flight Seats
                            </Button>
                            <Button onClick={(e) => {
                                window.localStorage.setItem('ReservationNo', reservation._id)
                                window.localStorage.setItem('EditFlightId', reservation.RetId)
                                window.localStorage.setItem('EditFlightFrom',reservation.To)
                                window.localStorage.setItem('EditFlightTo',reservation.From)
                                window.localStorage.setItem('EditCabinClass', reservation.ChosenCabinReturn)
                                window.localStorage.setItem('EditChosenSeats', reservation.ChosenSeatReturn)
                                window.localStorage.setItem('Departure',0)
                                window.location = '/EditFlight'


                            }} variant="contained">Edit Return Flight Date
                            </Button>
                            <Button onClick={() => {
                    const confirmBox = window.confirm(
                        "Do you really want to delete this Reservation?"
                    )
                    if (confirmBox === true) {
                        console.log("DELETE")
                        console.log(reservation._id)
                        axios.post('http://localhost:5000/summaryReservationMail', {ReservationNo:reservation._id},{
                            headers: {
                              token: headers,
                            },}
                            ).then(() => {
                            console.log("yaaayy")
                        
                
                        }).catch(err => {
                            console.log(err)
                            console.log("i am here")
                        })
                    }
                }} variant="contained">Delete Reservation
                </Button>





                        </CardActions>

                    </Card>

                </div>

            }) : <h1>No Results Found</h1>
            }

        </div>
    )

}