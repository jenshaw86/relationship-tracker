import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, ButtonToolbar, Container } from 'react-bootstrap';
import { fullName } from '../utils'
import ProfileModal from '../components/profile/ProfileModal'
// import ProfileNav from '../components/profile/ProfileNav'
// import ProfileModal from '../components/profile/ProfileModal'
// import ProfileRoutes from '../components/ProfileRoutes'
// import ProfileDetails from '../components/profile/ProfileDetails'

const Profile = props => { 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Container>
        <img src={`${props.user.image}`} width="150" alt={`${props.user.first_name} ${props.user.last_name}`}/>
        
        <div><h1>{fullName(props.user.first_name, props.user.last_name)}</h1></div>
        
        <ButtonToolbar>
          <Link to="/account"><Button>My Profile</Button></Link>
          <Link to="/account/user_info" ><Button>More Info</Button></Link>
          <Button onClick={() => handleShow()} >Edit Profile</Button>
        </ButtonToolbar>
        <ProfileModal show={show} handleClose={handleClose} user={props.user} updateUserProfile={props.updateUserProfile} />
      </Container>
    </>
  )
}

export default Profile