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



const useStyles = makeStyles((theme) => ({
    root: {
        width: '40%',
        height: 40
    }
}))

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];



export default function DeleteReservation() {


    const classes = useStyles()
    const [ReservationNo, setReservationNo] = useState(0);


    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const headers = window.localStorage.getItem('token')



    //function confirmDeletion(event){

    // var userAdjective = prompt("Please provide an Adjective");
    // alert(userAdjective);
    //}


    function handleDelete(event) {
        axios.post('http://localhost:5000/summaryReservationMail', deletedReservation,{
            headers: {
              token: headers,
            },}
            ).then(() => {
            console.log("yaaayy")
            setSendRequest(true);

        }).catch(err => {
            console.log(err)
            console.log("i am here")
        })
    }
    const [sendRequest, setSendRequest] = useState(false);
    const [searchResults, setSearcResults] = useState({})
    const deletedReservation = {
        ReservationNo : ReservationNo

    }
    return (
        <div>
            <h1>Delete Reservation</h1>
            <div className={classes.root}>
                <TextField
                    required
                    id="Id"
                    label="Reservation Number"
                    defaultValue=""
                    variant="filled"
                    name="id"
                    onChange={(e) => setReservationNo(e.target.value)}
                />
               
                <br />
                <br />
                <br />
                <Button onClick={() => {
                    const confirmBox = window.confirm(
                        "Do you really want to delete this Reservation?"
                    )
                    if (confirmBox === true) {
                        console.log("HENNA");
                        console.log(deletedReservation.ReservationNo);
                        handleDelete()
                    }
                }} variant="contained">Delete Reservation
                </Button>

            </div>




        </div>


    )

}