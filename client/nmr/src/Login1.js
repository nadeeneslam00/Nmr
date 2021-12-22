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



export default function Login() {
 
    const [open, setOpen] = React.useState(false);
    const[username,setUsername]= useState("");
    const[password,setPassword]= useState("");
    const anchorRef = React.useRef(null);
    const headers = window.localStorage.getItem('token')

    const login = {
        username: username,
        password : password
    
    }
    console.log(login)

    const handleClick = () => {
        setOpen(true);
      };

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    function handleLogin(event) {
        
        axios.post('http://localhost:5000/login',login, ).then((res) => {
            console.log(res.status)
            console.log(res.data)
            if(res.status === 200){
            localStorage.setItem('token', res.data.accessToken);
            console.log(res.data.username)
            window.location = '/Profile'
            }
            else{
               setOpen(true) 
               
            }
           

        }).catch(err => {
            
            //console.log(err)
            console.log("i am here")
            
        })
    }
  
  
    return (
        <div>
            <h1>Login</h1>
            <div className={classes.root}>
                <TextField
                    required
                    id = "Username"
                    label="Username"
                    defaultValue=""
                    variant="filled"
                    name="id"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    required
                    id="Password"
                    label="Password"
                    defaultValue=""
                    variant="filled"
                    name="flightnumber"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <br />
                <br />
            
                <Button onClick={() => {
                  
                  
                        handleLogin()
                   
                }} variant="contained">Login
                </Button>

            </div>
            <Stack spacing={2} sx={{ width: '100%' }}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar open={open} autoHideDuration={1200} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          wrong username or password
        </Alert>
      </Snackbar>
    </Stack>
</div>


    )

}