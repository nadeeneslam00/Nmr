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


const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
    height: 40
  },
}))
const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function UpdateProfile() {
  const classes = useStyles()
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PassportNo, setPassportNo] = useState("");
 

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const headers = window.localStorage.getItem('token')




  function handleUpdate(event) {
    axios.post('http://localhost:5000/updateProfile', updatedProfile,{
      headers: {
        token: headers,
      },}
      ).then(() =>{
     
        
        console.log("yaaayy")
        setSendRequest(true);
       //window.location = '/Profile'

    }).catch(err => {
        console.log(err)
        console.log("i am here")
    })
  }
  const [sendRequest, setSendRequest] = useState(false);

  
 
  const updatedProfile= {
    FirstName:FirstName,
    LastName: LastName,
    Email : Email,
    PassportNo: PassportNo,
  
  }
  return (
    <div>
      <h1>Update Information</h1>
      <div className={classes.root}>
      <TextField
          required
          id="FirstName"
          label="New First Name"
          defaultValue=""
          variant="filled"
          name="id"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          required
          id="LastName"
          label="New Last Name"
          defaultValue=""
          variant="filled"
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          required
          id="Email"
          label="New Email"
          defaultValue=""
          variant="filled"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="PassportNo"
          label="New Passport Number"
          defaultValue=""
          variant="filled"
          onChange={(e) => setPassportNo(e.target.value)}
        />
     <br />
        <br/>
        <br/>
        <Button onClick={() => {
                  
                  
                  //localStorage.setItem('token', null);
                  window.location='/ChangePassword'
             
          }} >Change Password
          </Button>
          <Button  onClick={handleUpdate} variant="contained">Update Profile
          </Button>
         
          
         
      </div>
    </div>

  )
}