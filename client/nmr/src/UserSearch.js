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
// var vis = ''

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

export default function UserSearch() {
    const classes = useStyles()

    const [From, setFrom] = useState("");
    const [To, setTo] = useState("");
    const [numberofAdults, setNumberofAdults] = useState("");
    const [numberofChildren, setNumberofChildren] = useState("");
    const [DepSearchResults, setDepSearchResults] = useState([]);
    const [DepartureDate, setDepartureDate] = useState('0000-00-00');
    const [ArrivalDate, setArrivalDate] = useState('0000-00-00');
    const [DepCabinClass, setDepCabinClass] = useState("");
    const [RetCabinClass, setRetCabinClass] = useState("");
    const [ReturnSearchResults, setReturnSearchResults] = useState([]);
    const [Price, setPrice] = useState(-1);
    const [DepFlight, setDepFlight] = useState(-1);
    const [RetFlight, setRetFlight] = useState(-1);
    const [vis, setVis] = useState('visible');
    const handleDepChange = (event) => {
        setDepCabinClass(event.target.value);
    };
    const handleRetChange = (event) => {
        setRetCabinClass(event.target.value);
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


    function handleUserSearch(event) {
        axios.post('http://localhost:5000/UserSearch', DepSearchDetails).then((response) => {
            console.log("arrived")
            console.log(response.data)
            setDepSearchResults(response.data)
            console.log(DepSearchResults)
        }).catch(err => {
            console.log(err)
            console.log("i am here1")
        })

        //    axios.post('http://localhost:5000/UserSearch', ReturnSearchDetails).then((response) => {
        //       console.log("returns arrived")
        //         console.log(response.data)
        //         setReturnSearchResults(response.data)
        //     }).catch(err => {
        //         console.log(err)
        //         console.log("i am here")
        //     })

    }

    function handleReturn(event) {
        axios.post('http://localhost:5000/UserSearch', ReturnSearchDetails).then((response) => {
            console.log("returns arrived")
            console.log(response.data)
            setReturnSearchResults(response.data)
        }).catch(err => {
            console.log(err)
            console.log("i am here")
        })
    }
    useEffect(() => {
        console.log("nadyom", headers)
        if (headers === 'null') {
            setVis('hidden')
        }

        console.log(vis)

    }, [])
    function handleSeats(event) {

        // const DepFlightObj={
        //     Id: DepFlight,
        //     CabinClass: cabinClass,
        //     Departure: true
        // }
        // console.log(DepFlightObj)
        window.localStorage.setItem('depFlightId', DepFlight)
        window.localStorage.setItem('depCabinClass', DepCabinClass)
        // console.log(window.localStorage)

        // const RetFlightObj={

        //     Id: RetFlight,
        //     CabinClass:cabinClass,
        //     Departure: false
        // }
        window.localStorage.setItem('retFlightId', RetFlight)
        window.localStorage.setItem('retCabinClass', RetCabinClass)

        console.log(window.localStorage)

        window.location = '/ViewSeats'
        //     axios.post('http://localhost:5000/postTempChosenFlights', DepFlightObj,{
        //         headers: {
        //           token: headers,
        //         },}).then((res) => {
        //             console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        //             console.log(res.data)
        //             if(res.data === null){
        //                 window.location='/Login'
        //             } else {
        //                 axios.post('http://localhost:5000/postTempChosenFlights', RetFlightObj,{
        //     headers: {
        //       token: headers,
        //     },}).then((res) => {
        //         console.log("yaaayy")
        //         if(res.status === 401){
        //             window.location='/Login'
        //         }

        //     }).catch(err => {
        //         console.log(err)
        //         console.log("i am here")

        // })

        // window.location='/ViewSeats'
        //             }
        //         console.log("yaaayy")


        //     }).catch(err => {
        //         console.log(err)
        //         console.log("i am here")

        // })



    }


    const [sendRequest, setSendRequest] = useState(false);
    //const [numberofPassengers, setNumberofPassengers] = useState(0)

    var numberofPassengers = (parseInt(numberofAdults, 10) + parseInt(numberofChildren, 10))
    // let arrTime = new Date (req.body.From.ArrivalDate + "T" + req.body.From.ArrivalTime+":00.123Z");
    // let DepTime = new Date (req.body.From.DepartureDate + "T" + req.body.From.DepartureTime+":00.123Z");
    // let TripDuration = (parseInt(Math.abs(arrTime - DepTime )/ (1000*60*60)%24,10)+ "Hours" + parseInt(Math.abs(arrTime.getTime() - DepTime.getTime())/(1000*60)%60,10)+"Minutes");

    const DepSearchDetails = {
        From: From,
        To: To,
        FlightDate: new Date(DepartureDate),
        numberofPassengers: numberofPassengers,
        cabinClass: DepCabinClass,

    }
    const ReturnSearchDetails = {
        From: To,
        To: From,
        FlightDate: new Date(ArrivalDate),
        numberofPassengers: numberofPassengers,
        cabinClass: RetCabinClass,
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

            <div>
                <Button style={{ visibility: vis }} onClick={() => {


                    window.location = '/Profile'

                }} variant="contained"> Profile
                </Button>
                <Button style={{ visibility: vis }} onClick={() => {


                    window.location = '/ViewReservations'

                }} variant="contained">View All Reservations
                </Button>
                <Button style={{ visibility: vis }} onClick={() => {


                    window.location = '/DeleteReservation'

                }} variant="contained">Delete A Reservation
                </Button>
                <Button style={{ visibility: vis }} onClick={() => {


                    window.location = '/UserSearch'

                }} variant="contained">Search For Flight
                </Button>

                <Button style={{ visibility: vis }} onClick={() => {


                    window.localStorage.setItem('token', null);
                    window.location = '/Home'

                }} variant="contained">log Out
                </Button>

            </div>
            <h1>Search for a departure flight</h1>
            <TextField
                required
                id="from"
                label="From"
                defaultValue=""
                variant="filled"
                name="flightnumber"
                onChange={(e) => setFrom(e.target.value)}
            />
            <br />
            <TextField
                required
                id="to"
                label="To"
                defaultValue=""
                variant="filled"
                onChange={(e) => setTo(e.target.value)}
            />
            <br />
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

            <TextField
                required
                id="NumberofAdults"
                label="Number of adults"
                defaultValue=""
                variant="filled"
                onChange={(e) => setNumberofAdults(e.target.value)}
            />
            <br />
            <TextField
                required
                id="NumberofChildren"
                label="Number of Children"

                defaultValue=""
                variant="filled"
                onChange={(e) => setNumberofChildren(e.target.value)}
            />
            <br />

            <FormControl sx={{ m: 1, minWidth: 130 }}>
                <InputLabel id="cabinClass">Cabin class</InputLabel>
                <Select
                    labelId="cabinClass"
                    id="cabinClass"
                    value={DepCabinClass}
                    label="Cabin class"
                    onChange={handleDepChange}
                >
                    <MenuItem value={1}>Business</MenuItem>
                    <MenuItem value={2}>Economy</MenuItem>
                </Select>
            </FormControl>
            <br />

            <h1>Search for a return flight</h1>

            <TextField
                required
                id="ArrivalDate"
                label="Return Date"
                type="date"
                defaultValue=""
                variant="filled"
                onChange={(e) => setArrivalDate(e.target.value)}
            />
            <br />
            <TextField
                required
                id="NumberofAdults"
                label="Number of adults"
                defaultValue=""
                variant="filled"
                onChange={(e) => setNumberofAdults(e.target.value)}
            />
            <br />
            <TextField
                required
                id="NumberofChildren"
                label="Number of Children"
                defaultValue=""
                variant="filled"
                onChange={(e) => setNumberofChildren(e.target.value)}
            />
            <br />

            <FormControl sx={{ m: 1, minWidth: 130 }}>
                <InputLabel id="cabinClass">Cabin class</InputLabel>
                <Select
                    labelId="cabinClass"
                    id="cabinClass"
                    value={RetCabinClass}
                    label="Cabin class"
                    onChange={handleRetChange}
                >
                    <MenuItem value={1}>Business</MenuItem>
                    <MenuItem value={2}>Economy</MenuItem>
                </Select>
            </FormControl>
            <br />



            <Button onClick={handleUserSearch} variant="contained">Search
            </Button>

            {DepSearchResults.length !== 0 ? DepSearchResults.map(flight => {
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
                            <Button onClick={handleReturn} variant="contained">Select return flight
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
                                <FormControlLabel control={<Checkbox defaultUnChecked onChange={(e) => setDepFlight(flight.Id)} />} label="Select Flight" />
                            </FormGroup>
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