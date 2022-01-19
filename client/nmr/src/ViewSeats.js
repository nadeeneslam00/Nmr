import React from 'react';
import axios, { Axios } from "axios";
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react";
import { blue } from '@mui/material/colors';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './CheckoutForm'
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

export default function ViewSeats() {
    const classes = useStyles()
    const selectedSeatsDep = {}
    const selectedSeatsRet = {}
    const depFlight = window.localStorage.getItem('depFlightId')
    const depFlightCabin = window.localStorage.getItem('depCabinClass')

    const retFlight = window.localStorage.getItem('retFlightId')
    const retFlightCabin = window.localStorage.getItem('retCabinClass')
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
    const [vis, setVis] = useState("hidden");
    const headers = window.localStorage.getItem('token')
    

    //const retFlight = {}
    // const [depFlight, setDepFlight] = useState({});
    // const [retFlight, setRetFlight] = useState({});


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
    function handleSeatRet(e) {
        if (e.target.style.backgroundColor != "red") {
            e.target.style.backgroundColor = "red"
            selectedBussinessSeatsRet[parseInt(e.target.innerHTML.charAt(0), 10)] = "true";
        } else {
            e.target.style.backgroundColor = "white"
            selectedBussinessSeatsRet[parseInt(e.target.innerHTML.charAt(0), 10)] = "false";
        }
        console.log(selectedBussinessSeatsRet[parseInt(e.target.innerHTML.charAt(0), 10)])
        console.log(parseInt(e.target.innerHTML.charAt(0), 10))
        console.log(e.target.innerHTML.charAt(0))
    }
    function handleSelect(e) {
        console.log(headers)
        if (headers === "null") {
            console.log("yay")
            window.location = '/Login1'
        }
        else {
            var TotalPrice=depPrice + retPrice
            window.localStorage.setItem('DepId',depFlight)
            window.localStorage.setItem('RetId',retFlight)
            window.localStorage.setItem('From',depFrom)
            window.localStorage.setItem('To',depTo)
            window.localStorage.setItem('DepartureDate',depFlightDate)
            window.localStorage.setItem('ReturnDate',retFlightDate)
            window.localStorage.setItem('DepDepTime',depDepartureTime)
            window.localStorage.setItem('DepArrTime',depArrivalTime)
            window.localStorage.setItem('RetDepTime',retDepartureTime)
            window.localStorage.setItem('RetArrTime',retArrivalTime)
            window.localStorage.setItem('TotalPrice',TotalPrice)
            window.localStorage.setItem('ChosenCabinDeparture',depCabinClass)
            window.localStorage.setItem('ChosenSeatDeparture',selectedBussinessSeatsDep)
            window.localStorage.setItem('ChosenCabinReturn',retCabinClass)
            window.localStorage.setItem('ChosenSeatReturn',selectedBussinessSeatsRet)
setVis("visible")
            // const resrvation = {
            //     DepId: depFlight,
            //     RetId: retFlight,
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
           // console.log(resrvation)
         
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
            // ).then(() => {
            //     console.log("yaaayy")


            // }).catch(err => {
            //     console.log(err)
            //     console.log("i am here")
            // })
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
    }
    function get(event) {

    }
    useEffect(() => {

        // axios.post('http://localhost:5000/getTempChosenFlights', getDep,{
        //     headers: {
        //       token: headers,
        //     },}).then((response) => {
        //     console.log(response.data);
        //     depFlight.Id = response.data.Id
        //     depFlight.CabinClass = response.data.CabinClass
        //     setDepFlightId(response.data.Id)
        //     setDepFlightCabinClass(response.data.CabinClass)
        //     console.log(depFlight)



        setDepFlightCabinClass(window.localStorage.getItem('depCabinClass'))
        console.log(depFlight)
        axios.post('http://localhost:5000/getBussinessSeats', {
            Id: depFlight,
            CabinClass: depFlightCabin
        }).then((response) => {
            console.log(response.data);
            setSeatsArrDep(response.data.Seats)
            setDepFlightNumber(response.data.FlightNumber)
            setDepFrom(response.data.From)
            setDepTo(response.data.To)
            setDepFlightDate(response.data.FlightDate)
            setDepPrice(response.data.Price)
            setDepArrivalTime(response.data.ArrivalTime)
            setDepDepartureTime(response.data.DepartureTime)
            setDepTripDuration(response.data.TripDuration)

            console.log(seatsArrDep);
            console.log("i got triggered now")
        }).catch(err => {
            console.log(err)
            console.log("i am here")
        })


        console.log("i got triggered now")
        // }).catch(err => {
        //     console.log(err)
        //     console.log("i am here")
        // })
        // axios.post('http://localhost:5000/getTempChosenFlights', getRet,{
        //     headers: {
        //       token: headers,
        //     },}).then((response) => {
        //     console.log(response.data);
        //     retFlight.Id = response.data.Id
        //     retFlight.CabinClass = response.data.CabinClass
        //     setRetFlightId(response.data.Id)
        //     setRetFlightCabinClass(response.data.CabinClass)
        //     console.log(retFlight)

        setRetFlightCabinClass(window.localStorage.getItem('retCabinClass'))
        axios.post('http://localhost:5000/getBussinessSeats', {
            Id: retFlight,
            CabinClass: retFlightCabin
        }).then((response) => {
            //Sconsole.log(response.data);
            setSeatsArrRet(response.data.Seats)
            setRetFlightNumber(response.data.FlightNumber)
            setRetFrom(response.data.From)
            setRetTo(response.data.To)
            setRetPrice(response.data.Price)
            setRetFlightDate(response.data.FlightDate)
            setRetArrivalTime(response.data.ArrivalTime)
            setRetDepartureTime(response.data.DepartureTime)
            setRetTripDuration(response.data.TripDuration)

            console.log(seatsArrRet);
            console.log("i got triggered now")
        }).catch(err => {
            console.log(err)
            console.log("i am here")
        })





        console.log("i got triggered now")
        // }).catch(err => {
        //     console.log(err)
        //     console.log("i am here")
        // })
        console.log(depFlight)


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
            <div style={{ display: "flex" }}>
                <h2>Return Flight Seats</h2>
                {seatsArrRet.length !== 0 ? seatsArrRet.map((seat, index) => {
                    if (seat == "false") {
                        return <div className="seats">

                            <Button onClick={handleSeatRet} variant="outlined" style={{ marginLeft: "2vw", marginTop: "2vw" }}>{index}</Button>

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
                    <div style={{ visibility: vis }}>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
                </div>
            </div>

        </div>
    )
}