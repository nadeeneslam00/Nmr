import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from "react";
import axios, { Axios } from "axios";

export default function Profile(){
  
    const [profileArr, setProfileArr] = useState([]);
    const headers = window.localStorage.getItem('token')
    console.log(headers)
    
    useEffect(() => {
 
    axios.post('http://localhost:5000/profile', {},{
            headers: {
              token: headers,
            },}
            ).then((response) => {
                console.log(response);
            setProfileArr(response.data)
            console.log(profileArr);
            console.log("i got triggered now")
        }).catch(err => {
            console.log(err)
            console.log("i am here")
        })

    }, [])
    


    return (
        <div>

            {profileArr.length !== 0 ? profileArr.map(Profile => {
                return <div className="Profile">
                    <ul >
                    <li>First Name : {Profile.FirstName}</li>
                    <li>Last Name : {Profile.LastName}</li>
                    <li>Email : {Profile.Email}</li>
                    <li>Passport Number : {Profile.PassportNo}</li>
                    

                    </ul>

                </div>

            }) : <h1>No Results Found</h1>
            }



         <Button onClick={() => {
                  
                  
                  window.location = '/UpdateProfile'
             
          }} variant="contained">Edit Profile
          </Button>
          <Button onClick={() => {
                  
                  
                  window.location = '/ViewReservations'
             
          }} variant="contained">View All Reservations
          </Button>
          <Button onClick={() => {
                  
                  
                  window.location = '/DeleteReservation'
             
          }} variant="contained">Delete A Reservation
          </Button>
          <Button onClick={() => {
                  
                  
                  window.location = '/UserSearch'
             
          }} variant="contained">Search For Flight
          </Button>
          <Button onClick={() => {
                  
                  
                  localStorage.setItem('token', null);
                  window.location='/Home'
             
          }} variant="contained">log Out
          </Button>
          <Button onClick={() => {
                  
                  
                  //localStorage.setItem('token', null);
                  window.location='/ChangePassword'
             
          }} variant="contained">Change Password
          </Button>
       
       
            {/* <h1>{flights[0]}</h1> */}
        </div>
    )

}