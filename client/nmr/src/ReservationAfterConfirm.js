import React from 'react';
import axios, { Axios } from "axios";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";



export default function ReservationAfterConfirm() {
    const [reservationsArr, setreservationsArr] = useState([]);
    const [reservation, setreservation] = useState("");
    const headers = window.localStorage.getItem('token')
    console.log(headers)
    useEffect(() => {

        axios.post('http://localhost:5000/reservationAfterConfirm', {},{
            headers: {
              token: headers,
            },}
            ).then((response) => {
            setreservation((response.data[response.data.length-1]))
      
            console.log((response.data[response.data.length-1]));
            console.log("i got triggered now")
        }).catch(err => {
            console.log(err)
            console.log("i am here")
        })

    }, [])
    console.log(reservation)
    console.log("HENNNNN")
 

   
  
    return (
        <div>
          
           
                    <ul >
                    <h1>Your Booking is Confirmed!</h1>
                       
                       <li>Reservation Number : {reservation._id}</li>    
                           <li> Departure Flight : {reservation.From} ==== {reservation.To}  </li>
                            Date :  {reservation.DepartureDate} 
                            <br/>
                            Departure Time : {reservation.DepDepTime} 
                            <br/>
                            Arrival Time : {reservation.DepArrTime}
                            <br/>  
                            Chosen Cabin : {reservation.ChosenCabinDeparture}
                            <br/>
                            Chosen Seat : {reservation.ChosenSeatDeparture}
                           <li> Return Flight : {reservation.To} ==== {reservation.From}  </li>
                             Date : {reservation.ReturnDate} 
                             <br/>
                             Departure Time :  {reservation.RetDepTime} {reservation.RetArrTime}  
                             <br/>
                             Arrival Time : {reservation.RetArrTime} 
                             <br/>
                             Chosen Cabin : {reservation.ChosenCabinReturn}
                             <br/>
                             Chosen Seat : {reservation.ChosenSeatReturn}
                             <li> Total Price : {reservation.TotalPrice} </li>  
                   
                  
                   </ul>

                     
                   <Button onClick={() => {
                  
                  
                  window.location = '/Profile'
             
          }} variant="contained">DONE
          </Button>
       
       
            {/* <h1>{flights[0]}</h1> */}
        </div>
    )


}