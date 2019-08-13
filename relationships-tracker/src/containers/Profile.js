import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap'

const Profile = (props) => { 
  const {first_name, last_name, image, email, phone_number} = props.user
  
  return (
    <>
      <div>
        <img src={`${image}`} width="150" alt={`${first_name} ${last_name}`}/>
        
        <div><h1>{first_name} {last_name}</h1></div>
        
        <ButtonToolbar>
          <Button>Upcoming Events</Button>
          <Button>Past Events</Button>
          <Button>Edit Profile</Button>
          <Button>Add Event</Button>
          <Button>Info</Button>
        </ButtonToolbar>
      </div>
      
      <div>
        <p>Email:</p>
        <p>{email}</p>
        <p>Phone:</p>
        <p>{phone_number}</p>
      </div>
    </>
  )
}

export default Profile