import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormGroup from '@mui/material/FormGroup';

import Checkbox from '@mui/material/Checkbox';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


const useStyles = makeStyles((theme) => ({
    root: {
        width: '40%',
        height: 40
    },
}))
const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function EditFlight() {
    const classes = useStyles()
    const From = window.localStorage.getItem('EditFlightFrom');
    console.log(From)
    const To = window.localStorage.getItem('EditFlightTo');
    console.log(To)
    const FlightId=  window.localStorage.getItem('EditFlightId');
    const [numberofAdults, setNumberofAdults] = useState("");
    const [numberofChildren, setNumberofChildren] = useState("");
    const [SearchResults, setSearchResults] = useState([]);
    const [DepartureDate, setDepartureDate] = useState('0000-00-00');
    const [ArrivalDate, setArrivalDate] = useState('0000-00-00');
    const [cabinClass, setCabinClass] = useState("");
    const [ReturnSearchResults, setReturnSearchResults] = useState([]);
    const [Price, setPrice] = useState(-1);
    const [DepFlight, setDepFlight] = useState(-1);
    const [RetFlight, setRetFlight] = useState(-1);
    const handleChange = (event) => {
        setCabinClass(event.target.value);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const headers = window.localStorage.getItem('token')

    function handleSearch(e) {

        axios.post('http://localhost:5000/UserSearch', SearchDetails).then((response) => {
            console.log("arrived")
            console.log(response.data)
            setSearchResults(response.data)
            
        }).catch(err => {
            console.log(err)
            console.log("i am here1")
        })







    }




    function handleSeats(event) {

        window.localStorage.setItem('depFlightId', DepFlight)
        window.localStorage.setItem('depCabinClass', cabinClass)

        window.localStorage.setItem('retFlightId', RetFlight)
        window.localStorage.setItem('retCabinClass', cabinClass)

        console.log(window.localStorage)

        window.location = '/ViewSeats'







    }


    const [sendRequest, setSendRequest] = useState(false);


console.log(DepartureDate)

    const SearchDetails = {
        From: From,
        To:To,
        FlightDate: new Date(DepartureDate),
        cabinClass: cabinClass,
        numberofPassengers: 0

    }
    
    const ReturnSearchDetails = {

    }

    const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
        ({ theme, checked }) => ({
            '.MuiFormControlLabel-label': checked && {
                color: theme.palette.primary.main,
            },
        }),
    );
    function MyFormControlLabel(props) {
        const radioGroup = useRadioGroup();

        let checked = false;

        if (radioGroup) {
            console.log(radioGroup.value)
            checked = radioGroup.value === props.value;

        }

        return <StyledFormControlLabel checked={checked} {...props} />;
    }
    return (
        <div >
            <h1>Search for Available Flights</h1>


            <TextField
                required
                id="DepartureDate"
                label="Departure Date"
                type="date"
                defaultValue=""
                variant="filled"
                onChange={(e) => setDepartureDate(e.target.value)}
            />
            <br />



            <FormControl sx={{ m: 1, minWidth: 130 }}>
                <InputLabel id="cabinClass">Cabin class</InputLabel>
                <Select
                    labelId="cabinClass"
                    id="cabinClass"
                    value={cabinClass}
                    label="Cabin class"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>Business</MenuItem>
                    <MenuItem value={2}>Economy</MenuItem>
                </Select>
            </FormControl>
            <br />

            <Button onClick={handleSearch} variant="contained">Search
            </Button>

            {SearchResults.length !== 0 ? SearchResults.map(flight => {
               
                return <div className="flights">

                    <h3>Possible departure flights</h3>

                    <Card sx={{ minWidth: 20 }}>
                        <CardContent>

                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

                                <ul >
                                    <li>From : {flight.From} </li>
                                    <li>To : {flight.To} </li>
                                    <li>Flight Number : {flight.FlightNumber} </li>


                                </ul>
                            </Typography>
                        </CardContent>
                        <CardActions>
                           

                            <div>
                                <Button
                                    id="demo-positioned-button"
                                    aria-controls="demo-positioned-menu"
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    View Details
                                </Button>
                                <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >   <MenuItem onClick={handleClose}>Price : {flight.Price}</MenuItem>
                                    <MenuItem onClick={handleClose}>Arrival Time : {flight.ArrivalTime}</MenuItem>
                                    <MenuItem onClick={handleClose}>Departure Time : {flight.DepartureTime}</MenuItem>
                                    <MenuItem onClick={handleClose}>Trip duration : {flight.TripDuration}</MenuItem>

                                </Menu>

                            </div>


                        </CardActions>

                    </Card>



                </div>
                
            }) : <h5></h5>
            }

            {ReturnSearchResults.length !== 0 ? ReturnSearchResults.map(flight => {
                return <div className="flights">
                    <h3>Possible Return flights</h3>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                <ul >
                                    <li>From : {flight.From} </li>
                                    <li>To : {flight.To} </li>
                                    <li>Flight Number : {flight.FlightNumber} </li>





                                </ul>



                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleSeats} variant="contained">Choose Seats
                            </Button>

                            <div>
                                <Button
                                    id="demo-positioned-button"
                                    aria-controls="demo-positioned-menu"
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    View Details
                                </Button>
                                <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >   <MenuItem onClick={handleClose}>Price : {flight.Price}</MenuItem>
                                    <MenuItem onClick={handleClose}>Arrival Time : {flight.ArrivalTime}</MenuItem>
                                    <MenuItem onClick={handleClose}>Departure Time : {flight.DepartureTime}</MenuItem>
                                    <MenuItem onClick={handleClose}>Trip duration : {flight.TripDuration}</MenuItem>

                                </Menu>
                            </div>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultUnChecked onChange={(e) => setRetFlight(flight.Id)} />} label="Select Flight" />
                            </FormGroup>
                        </CardActions>
                    </Card>


                </div>
            }) : <h5></h5>

            }

        </div>
    )


}