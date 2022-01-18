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



export default function ChangePassword() {
 
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const[oldPassword,setOldPassword]= useState("");
    const[newPassword,setNewPassword]= useState("");
    const anchorRef = React.useRef(null);
    const headers = window.localStorage.getItem('token')

    const passwords = {
        oldPassword: oldPassword,
        newPassword : newPassword
    
    }
    // console.log(login)

    const handleClick = () => {
        setOpen(true);
      };

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
      
    const handleClick1 = () => {
        setOpen1(true);
      };

      const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen1(false);
      };

    function handleLogin(event) {
       // console.log(headers)
        axios.post('http://localhost:5000/changePassword', passwords,{
            headers: {
              token: headers,
            },}
            ).then((res) => {
              console.log(res.data)
           if(res.data==="Incorrect Password"){
            setOpen(true) 
           }
           else{
             console.log("password changed")
               setOpen1(true)
           }

        }).catch(err => {
    
        })
    }
  
  
    return (
        <div>
            <h1>Change Password</h1>
            <div className={classes.root}>
                <TextField
                    required
                   
                    id = "oldPassword"
                    label="Old password"
                    defaultValue=""
                    variant="filled"
                    name="oldPassword"
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <TextField
                    required
                   
                    id="newPassword"
                    label="New Password"
                    defaultValue=""
                    variant="filled"
                    name="newPassword"
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <br />
                <br />
                <br />
            
                <Button onClick={() => {
                  
                  
                        handleLogin()
                   
                }} variant="contained">Change Password
                </Button>

            </div>
            <Stack spacing={2} sx={{ width: '100%' }}>

      
      <Snackbar open={open} autoHideDuration={1200} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          The old password you entered is incorrect.
        </Alert>

      </Snackbar>
     
    </Stack>
    <Snackbar open={open1} autoHideDuration={1700} onClose={handleClose1}>
        <Alert onClose={handleClose1}  sx={{ width: '100%' }}>
       Password changed successfully!   
        </Alert>

      </Snackbar>
</div>


    )

}