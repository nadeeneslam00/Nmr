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

export default function CheckoutForm(props) {
  var headers = window.localStorage.getItem('token')
  const [open, setOpen] = React.useState(false)
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
    const totalPrice = window.localStorage.getItem('TotalPrice')
    const paymentData = { token: token.id, amount: totalPrice }

    // Use fetch to send the token ID and any other payment data to your server.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch('http://localhost:5000/payForBooking', {
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
      const DepId = window.localStorage.getItem('DepId')
      const RetId = window.localStorage.getItem('RetId')
      const From = window.localStorage.getItem('From')
      const To = window.localStorage.getItem('To')
      const DepartureDate = window.localStorage.getItem('DepartureDate')
      const ReturnDate = window.localStorage.getItem('ReturnDate')
      const DepDepTime = window.localStorage.getItem('DepDepTime')
      const DepArrTime = window.localStorage.getItem('DepArrTime')
      const RetDepTime = window.localStorage.getItem('RetDepTime')
      const RetArrTime = window.localStorage.getItem('RetArrTime')
      const TotalPrice = window.localStorage.getItem('TotalPrice')
      const ChosenCabinDeparture = window.localStorage.getItem('ChosenCabinDeparture')
      const ChosenSeatDeparture = window.localStorage.getItem('ChosenSeatDeparture')
      const ChosenCabinReturn = window.localStorage.getItem('ChosenCabinReturn')
      const ChosenSeatReturn = window.localStorage.getItem('ChosenSeatReturn')


      let resJson = await stripeTokenHandler(result.token)
      console.log(resJson.error)
      if (resJson.status === 'succeeded') {
        console.log('SUCCESS PAYMENT')
        setError('SUCCESS PAYMENT')
        severityVar = 'success'
        axios.post('http://localhost:5000/reserve', {
          DepId: DepId,
          RetId: RetId,
          From: From,
          To: To,
          DepartureDate: DepartureDate,
          ReturnDate: ReturnDate,
          DepDepTime: DepDepTime,
          DepArrTime: DepArrTime,
          RetDepTime: RetDepTime,
          RetArrTime: RetArrTime,
          TotalPrice: TotalPrice,
          ChosenCabinDeparture: ChosenCabinDeparture,
          ChosenSeatDeparture: ChosenSeatDeparture,
          ChosenCabinReturn: ChosenCabinReturn,
          ChosenSeatReturn: ChosenSeatReturn
        }, {
          headers: {
            token: headers,
          },
        }
        ).then((result) => {
          console.log("yaaayy")
        
          axios.post('http://localhost:5000/summaryReservationMail', {_id:result.data._id}, {
            headers: {
              token: headers,
            },
          }).then(() => {
            console.log("yaaayy")
  
  
          }).catch(err => {
            console.log(err)
            console.log("i am here")
          })


        }).catch(err => {
          console.log(err)
          console.log("i am here")
        })
  

        axios.post('http://localhost:5000/selectBussinessSeats',{Id:DepId,
        selectedBussinessSeats:ChosenSeatDeparture,
        CabinClass:ChosenCabinDeparture
      } , {
          headers: {
            token: headers,
          },
        }).then(() => {
          console.log("yaaayy")


        }).catch(err => {
          console.log(err)
          console.log("i am here")
        })

        axios.post('http://localhost:5000/selectBussinessSeats', {Id:RetId,
        selectedBussinessSeats:ChosenSeatReturn,
        CabinClass:ChosenCabinReturn}, {
          headers: {
            token: headers,
          },
        }).then(() => {
          console.log("yaaayy")


        }).catch(err => {
          console.log(err)
          console.log("i am here")
        })
        

        window.location = '/ReservationAfterConfirm'
        // setTimeout(() => {
        //   handleClose()
        //   console.log('Timer done!')
        //    window.location = '/my-profile'
        // }, 2000)
      } else {
        console.log('error', resJson.raw.message)
        severityVar = 'warning'
        setError(resJson.raw.message)
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
    </form>
  )
}
