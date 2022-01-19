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
        <h1>Admin, Welcome Back!</h1>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={handleView}>View All Available Flights</Button>
        <Button onClick={handleCreate}>Create New Flights</Button>
        <Button onClick={handleUpdate}>Update Existing Flights</Button>
        <Button onClick={handleDelete}>Delete Existing Flights</Button>
        <Button onClick={handleSearch}>Search For Specific Flights</Button>
        <Button onClick={() => {
                  
                  
                  localStorage.setItem('token', null);
                  window.location='/Home1'
             
          }} variant="contained">log Out
          </Button>
          
       
      </ButtonGroup>
    </Box>
    
    </div>
    )
}