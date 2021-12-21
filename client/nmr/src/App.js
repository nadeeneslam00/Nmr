import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import ViewFlights from "./ViewFlights";
import CreateFlights from "./CreateFlights";
import UpdateFlights from "./UpdateFlights";
import DeleteFlights from "./DeleteFlights";
import SearchFlights from "./SearchFlights";
import UserSearch from "./UserSearch";
import Home from "./Home";
import ViewSeats from "./ViewSeats";
import Login from "./Login";
import ReservationAfterConfirm from './ReservationAfterConfirm';



class App extends Component {
  render() {
    return (
    
        <div>



          <Router>
            <Routes>
            <Route path="/" element={<Home />} />
         
              <Route path="/createFlights" element={<CreateFlights />} />
              <Route path="/viewflights" element={<ViewFlights />} />
              <Route path="/updateFlights" element={<UpdateFlights />} />
              <Route path="/deleteFlights" element={<DeleteFlights />} />
              <Route path="/searchFlights" element={<SearchFlights />} />
              <Route path="/viewSeats" element={<ViewSeats />} />
              <Route path="/UserSearch" element = {<UserSearch />} />
              <Route path="/ReservationAfterConfirm" element={<ReservationAfterConfirm />} />
              <Route path="/Login" element={<Login />} />

            </Routes>
          </Router>
        </div>
 
    )
  }
}

export default App
