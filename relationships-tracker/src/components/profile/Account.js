import React, { useState } from 'react';
import { Button, ButtonToolbar, Container } from 'react-bootstrap';
import { fullName } from '../../utils'
import ProfileModal from './ProfileModal'

const Account = props => { 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Container className="profile">

          <img src={`${props.user.image}`} className="profile_img" alt={`${props.user.first_name} ${props.user.last_name}`}/>
        <div className="profile-info">
          <h1>{fullName(props.user.first_name, props.user.last_name)}</h1>
          <p>✉️ Email: {props.user.email}</p>
          <p>☏ Phone: {props.user.phone_number}</p>
        </div>
        <div className="profile-edit-btn">
          <Button size="sm" className="alt-primary-btn" onClick={() => handleShow()} >Edit Profile</Button>
        </div>
        
        <ProfileModal show={show} handleClose={handleClose} user={props.user} updateUserProfile={props.updateUserProfile} />
      </Container>
    </>
  )
}

export default Account