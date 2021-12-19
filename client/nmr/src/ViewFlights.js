import React from 'react';
import axios, { Axios } from "axios";

import { useState, useEffect } from "react";

export default function ViewFlights() {
    const [flightsArr, setFlightsArr] = useState([]);
    function view(event) {

    }
    useEffect(() => {

        axios.get('http://localhost:5000/getFlights').then((response) => {
            setFlightsArr(response.data)
            console.log(flightsArr);
            console.log("i got triggered now")
        }).catch(err => {
            console.log(err)
            console.log("i am here")
        })

    }, [])
    return (
        <div>

            {flightsArr.length !== 0 ? flightsArr.values.map(flight => {
                return <div className="flights">
                    <ul >
                        <li>Flight Number : {flight.FlightNumber}</li>
                        <li>From : {flight.From} </li>
                        <li>To : {flight.To} </li>
                        <li> Flight Date : {flight.FlightDate} </li>
                        <li> Arrival Time : {flight.ArrivalTime} </li>
                        <li> Departure Time : {flight.DepartureTime} </li>
                        <li>Number of Business Seats Available : {flight.BusinessNumofSeats} </li>
                        <li>Number of Economy Seats Available : {flight.EconomyNumofSeats} </li>


                    </ul>


                </div>

            }) : <h1>No Results Found</h1>
            }


            {/* <h1>{flights[0]}</h1> */}
        </div>
    )


}