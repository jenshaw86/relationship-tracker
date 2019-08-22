import React, { useState } from 'react';
import { Button, ButtonToolbar, Container } from 'react-bootstrap';
import { fullName, displayPhoneNumber } from '../../utils'
import ProfileModal from './ProfileModal'

const Account = props => { 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Container className="profile-container">

          <img src={`${props.user.image}`} className="profile-img" alt={`${props.user.first_name} ${props.user.last_name}`}/>
        <div className="profile-info">
          <h1>{fullName(props.user.first_name, props.user.last_name)}</h1>
          <p><i class="fas fa-envelope"></i> Email: {props.user.email}</p>
          <p><i class="fas fa-mobile-alt"></i> Phone: {displayPhoneNumber(props.user.phone_number)}</p>
        </div>
          <Button size="sm" className="profile-edit-btn alt-primary-btn" onClick={() => handleShow()} >Edit</Button>
        
        <ProfileModal show={show} handleClose={handleClose} user={props.user} updateUserProfile={props.updateUserProfile} />
      </Container>
    </>
  )
}

export default Account