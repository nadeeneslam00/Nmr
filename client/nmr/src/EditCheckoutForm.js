import React, { useEffect, useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import CardSection from './CardSection'
import axios from 'axios'


var severityVar = ''

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function EditCheckoutForm(props) {
    var headers = window.localStorage.getItem('token')
    const [open, setOpen] = React.useState(false)
    const [open1, setOpen1] = React.useState(false)
    const [paymentFlag, setPaymentFlag] = React.useState(false)
    const [errorMessage, setError] = useState('')
    const [flag, setFlag] = React.useState(props.flag || false)

    const stripe = useStripe()
    const elements = useElements()
    const handleClick = () => {
        setOpen(true)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }
    async function handleBooking2() {
        console.log(window.localStorage.getItem('reservedSeatsRet'))

    }
    async function handleBooking1() {

    }
    async function stripeTokenHandler(token) {
        const newPrice = window.localStorage.getItem('newFlightPrice')
        const oldFlight = window.localStorage.getItem('oldFlightId')
        const paymentData = { token: token.id, oldFlightId: oldFlight, newPrice: newPrice }
console.log("uesss")
        // Use fetch to send the token ID and any other payment data to your server.
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        const response = await fetch('http://localhost:5000/payForEdit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': headers,
            },
            body: JSON.stringify(paymentData),
        })
        // Return and display the result of the charge.
        //set payment flag--------------------------------------------------------
        setPaymentFlag(true)
        window.localStorage.setItem('flag', true)
        setFlag(true)
        return response.json()
    }

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make  sure to disable form submission until Stripe.js has loaded.
            return
        }

        const card = elements.getElement(CardElement)
        const result = await stripe.createToken(card)

        if (result.error) {
            // Show error to your customer.
            console.log(result.error.message)
            severityVar = 'warning'
            setError(result.error.message)
            handleClick()
        } else {
            // Send the token to your server.
            // This function does not exist yet; we will define it in the next step.
            const reservationNo = window.localStorage.getItem('reservationNo')
            const oldFlightId = window.localStorage.getItem('oldFlightId')
            const oldFlightCabin = window.localStorage.getItem('oldFlightCabin')
            const oldSeats = window.localStorage.getItem('oldSeats')
            const newFlightId = window.localStorage.getItem('newFlightId')
            const newFrom = window.localStorage.getItem('newFrom')
            const newTo = window.localStorage.getItem('newTo')
            const newFlightDate = window.localStorage.getItem('newFlightDate')
            const departure = window.localStorage.getItem('departure')
            const newDepTime = window.localStorage.getItem('newDepTime')
            const newArrTime = window.localStorage.getItem('newArrTime')
            const newFlightPrice = window.localStorage.getItem('newFlightPrice')
            const newCabin = window.localStorage.getItem('newCabin')
            const newChosenSeats = window.localStorage.getItem('newChosenSeats')

console.log("waiting")
            let resJson = await stripeTokenHandler(result.token)
            console.log(resJson.status)
            if(resJson.status!= null){
            if (resJson.status === 'succeeded') {
                console.log('SUCCESS PAYMENT')
                setError('SUCCESS PAYMENT')
                severityVar = 'success'
               
    
    console.log("EDITTTT")
                axios.post('http://localhost:5000/EditFlight', {
                    reservationNo: reservationNo,
                    oldFlightId: oldFlightId,
                    oldFlightCabin: oldFlightCabin,
                    oldSeats: oldSeats,
                    newFlightId: newFlightId,
                    newFrom: newFrom,
                    newTo: newTo,
                    newFlightDate: newFlightDate,
                    departure: departure,
                    newDepTime: newDepTime,
                    newArrTime: newArrTime,
                    newFlightPrice: newFlightPrice,
                    newCabin: newCabin,
                    newChosenSeats: newChosenSeats
                }, {
                    headers: {
                        token: headers,
                    },
                }
                ).then(() => {
    
                    console.log("yaaayy")
                    setOpen(true)
    
                }).catch(err => {
                    setOpen(true)
                    console.log(err)
                    console.log("i am here")
                })
                setTimeout(() => {
                    handleClose()
                    console.log('Timer done!')
                    window.location = './ViewReservations'
                }, 2000)

                setOpen(true)


            }
        }
        else{
            console.log("no payment")
           // console.log('error', resJson.raw.message)
            severityVar = 'warning'
            axios.post('http://localhost:5000/EditFlight', {
                reservationNo: reservationNo,
                oldFlightId: oldFlightId,
                oldFlightCabin: oldFlightCabin,
                oldSeats: oldSeats,
                newFlightId: newFlightId,
                newFrom: newFrom,
                newTo: newTo,
                newFlightDate: newFlightDate,
                departure: departure,
                newDepTime: newDepTime,
                newArrTime: newArrTime,
                newFlightPrice: newFlightPrice,
                newCabin: newCabin,
                newChosenSeats: newChosenSeats
            }, {
                headers: {
                    token: headers,
                },
            }
            ).then(() => {

                console.log("yaaayy")
                setOpen(true)

            }).catch(err => {
                setOpen(true)
                console.log(err)
                console.log("i am here")
            })
            setTimeout(() => {
                handleClose()
                console.log('Timer done!')
                window.location = './ViewReservations'
            }, 2000)

            setOpen1(true)
        }

            console.log(resJson.paid)
        }
    }
    // useEffect(() => {
    //   console.log(paymentFlag)
    // }, [])
    return (
        <form style={{}} onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity={severityVar}
                        sx={{ width: '100%' }}
                        style={{ marginLeft: '5vw' }}
                    >
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Stack>
            <CardSection />

            <Button
                style={{ cursor: 'pointer', marginTop: '2vw', marginLeft: '7vw' }}
                variant='outlined'
                disabled={!stripe}
                onClick={(e) => {
                    handleSubmit(e)
                }}
            >
                Confirm order
            </Button>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} sx={{ width: '100%' }}>
                    Price difference payed successfully!
                    Flight changed successfully!
                </Alert>

            </Snackbar>

            <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} sx={{ width: '100%' }}>
                    No payment required!
                    Flight changed successfully!
                </Alert>

            </Snackbar>
        </form>
    )
}
