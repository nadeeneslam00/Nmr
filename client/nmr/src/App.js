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
import Home1 from "./Home1";
import ViewSeats from "./ViewSeats";
import Login from "./Login";
import Login1 from "./Login1";
import ReservationAfterConfirm from './ReservationAfterConfirm';
import ViewReservations from './ViewReservations';
import DeleteReservation from './DeleteReservation';
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";


class App extends Component {
  render() {
    return (
    
        <div>



          <Router>
            <Routes>
            <Route path="/" element={<Home1 />} />
            <Route path="/Home1" element={<Home1 />} />
              <Route path="/createFlights" element={<CreateFlights />} />
              <Route path="/viewflights" element={<ViewFlights />} />
              <Route path="/updateFlights" element={<UpdateFlights />} />
              <Route path="/deleteFlights" element={<DeleteFlights />} />
              <Route path="/searchFlights" element={<SearchFlights />} />
              <Route path="/viewSeats" element={<ViewSeats />} />
              <Route path="/UserSearch" element = {<UserSearch />} />
              <Route path="/ReservationAfterConfirm" element={<ReservationAfterConfirm />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Login1" element={<Login1 />} />
              <Route path="/ViewReservations" element={<ViewReservations />} />
              <Route path="/DeleteReservation" element={<DeleteReservation />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/updateProfile" element={<UpdateProfile />} />

            </Routes>
          </Router>
        </div>
 
    )
  }
}

export default App
