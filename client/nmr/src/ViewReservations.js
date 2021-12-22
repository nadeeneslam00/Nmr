import React from 'react';
import axios, { Axios } from "axios";

import { useState, useEffect } from "react";

export default function ViewReservations() {
    const [reservationsArr, setreservationsArr] = useState([]);
    const [DepflightsArr, setDepflightsArr] = useState([]);

    const [ArrflightsArr, setArrflightsArr] = useState([]);
    const headers = window.localStorage.getItem('token')
    console.log(headers)
    useEffect(() => {

        axios.post('http://localhost:5000/viewReservations', {},{
            headers: {
              token: headers,
            },}
            ).then((response) => {
            setreservationsArr(response.data)
            console.log(reservationsArr);
            console.log("i got triggered now")
        }).catch(err => {
            console.log(err)
            console.log("i am here")
        })

    }, [])
    return (
        <div>

            {reservationsArr.length !== 0 ? reservationsArr.map(reservation => {
                return <div className="reservations">
                    <ul >
                        <li>Reservation Number : {reservation._id}</li>
                        <li> Total Price : {reservation.TotalPrice} </li>      
                        <li> Departure Flight : {reservation.From} ==== {reservation.To}  </li>
                         Date :  {reservation.DepartureDate} 
                         <br/>
                         Departure Time : {reservation.DepDepTime} 
                         <br/>
                         Arrival Time : {reservation.DepArrTime}
                         <br/>  
                         Chosen Cabin : {reservation.ChosenCabinDeparture}
                         <br/>
                         Chosen Seat : {reservation.DepSeatsStr}
                        <li> Return Flight : {reservation.To} ==== {reservation.From}  </li>
                          Date : {reservation.ReturnDate} 
                          <br/>
                          Departure Time :  {reservation.RetDepTime} {reservation.RetArrTime}  
                          <br/>
                          Arrival Time : {reservation.RetArrTime} 
                          <br/>
                          Chosen Cabin : {reservation.ChosenCabinReturn}
                          <br/>
                          Chosen Seat : {reservation.RetSeatsStr}
                       </ul>

                       </div>
                
            }) : <h1>No Results Found</h1>
            }


          
        </div>
    )


}