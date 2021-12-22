import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

export default function Home(){
    const handleView= () => {
        window.location = '/viewflights'
    }
    const handleCreate= () => {
        window.location = '/createFlights'
    }
    const handleUpdate= () => {
        window.location = '/updateFlights'
    }
    const handleDelete= () => {
        window.location = '/deleteFlights'
    }


    const handleSearch= () => {
        window.location = '/searchFlights'
    }

    return(
        
     
        <div>
        <h1>WELCOME
        </h1>
       
        <Button onClick={() => {
                  
                  
                  window.location = '/Login1'
             
          }} variant="contained">LOGIN
          </Button>
          <Button onClick={() => {
                  
                  
                  window.location = '/UserSearch'
             
          }} variant="contained">SEARCH FLIGHTS
          </Button>
    
    </div>
    )
}