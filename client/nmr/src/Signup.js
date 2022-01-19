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
import MuiAlert from '@mui/material/Alert';
import Address from 'ipaddr.js';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



const classes = makeStyles((theme) => ({
    root: {
        width: '40%',
        height: 40
    }
}))

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];



export default function Signup() {
 
    const [open, setOpen] = React.useState(false);
    const[fisrtName,setFirstName]= useState("");
    const[lastName,setLastName]= useState("");
    const[address,setAddress]= useState("");
    const[countryCode,setCountryCode]= useState(-1);
    const[telephone,setTelephone]= useState("");
    const[email,setEmail]= useState("");
    const[passportNumber,setPassportNumber]= useState("");
    const[password,setPassword]= useState("");
    const[name,setName]= useState("");
    const anchorRef = React.useRef(null);
    const headers = window.localStorage.getItem('token')

    const signup = {
        firstName: fisrtName,
        lastName: lastName,
        address:address,
        countryCode:countryCode,
        telephone:telephone,
        email: email,
        passportNumber:passportNumber,
        password : password,
        name: name
    
    }
    //console.log(login)

    const handleClick = () => {
        setOpen(true);
      };

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    function handleSignup(event) {
        
        axios.post('http://localhost:5000/signup',signup, ).then((res) => {
            console.log(res.status)
            console.log(res.data)
            if(res.data.message=='Username already exists, please sign in'){
                setOpen(true) 
               
            }else{
            if(res.status === 200){
                console.log(res.data.accessToken)
            localStorage.setItem('token', res.data.accessToken);
           console.log( localStorage.getItem('token'))
            console.log(res.data.username)
           window.location = '/UserSearch'
            }
         
        }
        }).catch(err => {
            
            //console.log(err)
            console.log("i am here")
            
        })
    }
  
  
    return (
        <div>
            <h1>Sign Up</h1>
            <div className={classes.root}>
                <TextField
                    required
                    id = "firstName"
                    label="firstName"
                    defaultValue=""
                    variant="filled"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                   <TextField
                    required
                    id = "lastName"
                    label="lastName"
                    defaultValue=""
                    variant="filled"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                />
                <br/>
                <TextField
                    required
                    id="Address"
                    label="Address"
                    defaultValue=""
                    variant="filled"
                    name="Address"
                    onChange={(e) => setAddress(e.target.value)}
                />
                   <TextField
                    required
                    id = "CountryCode"
                    label="CountryCode"
                    defaultValue=""
                    variant="filled"
                    name="CountryCode"
                    onChange={(e) => setCountryCode(e.target.value)}
                />
                      <br/>
                 <TextField
                    required
                    id="Telephone"
                    label="Telephone"
                    defaultValue=""
                    variant="filled"
                    name="Telephone"
                    onChange={(e) => setTelephone(e.target.value)}
                />
                  <TextField
                    required
                    id="Email"
                    label="Email"
                    defaultValue=""
                    variant="filled"
                    name="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <TextField
                    required
                    id = "PassportNumber"
                    label="PassportNumber"
                    defaultValue=""
                    variant="filled"
                    name="PassportNumber"
                    onChange={(e) => setPassportNumber(e.target.value)}
                />
                    <TextField
                    required
                    id = "Username"
                    label="Username"
                    defaultValue=""
                    variant="filled"
                    name="Username"
                    onChange={(e) => setName(e.target.value)}
                />
                <br/>
                <TextField
                    required
                    type="password"
                    id = "Password"
                    label="Password"
                    defaultValue=""
                    variant="filled"
                    name="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <br />
                <br />
                <br />
            
                <Button onClick={() => {
                  
                  
                        handleSignup()
                   
                }} variant="contained">Sign up
                </Button>

            </div>
            <Stack spacing={2} sx={{ width: '100%' }}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar open={open} autoHideDuration={1200} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
         Username already exists!
        </Alert>
      </Snackbar>
    </Stack>
</div>


    )

}