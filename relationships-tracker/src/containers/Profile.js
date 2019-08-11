import React from 'react';
import { Button } from 'react-bootstrap'

const Profile = (props) => { 
  const {first_name, last_name, image, email, phone_number} = props.user
  
  return (
    <>
      <div>
        <img src={`${image}`} width="150" />
        <Button>Edit Profile</Button>
      </div>
      <div>
        <h1>{first_name} {last_name}</h1>
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