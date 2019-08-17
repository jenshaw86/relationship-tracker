import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom'
import { Button, ButtonToolbar } from 'react-bootstrap';
import { fullName, filterPastEvents, filterFutureEvents } from '../utils'
// import ProfileNav from '../components/profile/ProfileNav'
import ProfileModal from '../components/profile/ProfileModal'
// import ProfileRoutes from '../components/ProfileRoutes'
import ProfileDetails from '../components/profile/ProfileDetails'

const Profile = props => { 
  // Edit Profile Modal State and Handlers
  const [showProfileModal, setShowProfileModal] = useState(false);
  const handleShowProfileModal = () => setShowProfileModal(true);
  const handleCloseProfileModal = () => setShowProfileModal(false);

  return (
    <>
      <div>
        <img src={`${props.user.image}`} width="150" alt={`${props.user.first_name} ${props.user.last_name}`}/>
        
        <div><h1>{fullName(props.user.first_name, props.user.last_name)}</h1></div>
        
        <ButtonToolbar>
          <Button onClick={() => handleShowProfileModal()} >Edit Profile</Button>
          < Link to="/user_info" ><Button>Info</Button></Link>
        </ButtonToolbar>
        <Route path="/user_info" 
          render={ () => <ProfileDetails email={props.user.email} phone_number={props.user.phone_number /> } 
        />

        <ProfileModal show={showProfileModal} handleClose={handleCloseProfileModal} user={props.user} setCurrentUser={props.setCurrentUser} />
      </div>
    </>
  )
}

export default Profile