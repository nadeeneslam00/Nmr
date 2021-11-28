import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import ViewFlights from "./ViewFlights";
import CreateFlights from "./CreateFlights";
import UpdateFlights from "./UpdateFlights";
import DeleteFlights from "./DeleteFlights";
import SearchFlights from "./SearchFlights";
import Home from "./Home";



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


            </Routes>
          </Router>
        </div>
 
    )
  }
}

export default App
