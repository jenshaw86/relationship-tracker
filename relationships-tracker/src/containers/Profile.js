import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom'
import { Button, ButtonToolbar } from 'react-bootstrap';
import { fullName, filterPastEvents, filterFutureEvents } from '../utils'

// import ProfileNav from '../components/profile/ProfileNav'
import ProfileModal from '../components/profile/ProfileModal'
import Events from '../containers/Events'
import EventModal from '../components/event/EventModal'
// import ProfileRoutes from '../components/ProfileRoutes'
import ProfileDetails from '../components/profile/ProfileDetails'

const Profile = props => { 
  // Edit Profile Modal State and Handlers
  const [showProfileModal, setShowProfileModal] = useState(false);
  const handleShowProfileModal = () => setShowProfileModal(true);
  const handleCloseProfileModal = () => setShowProfileModal(false);

  // New Event Modal State and Handlers
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const handleShowNewEventModal = () => setShowNewEventModal(true);
  const handleCloseNewEventModal = () => setShowNewEventModal(false);

  const { first_name, last_name, email, phone_number, image } = props.user

  const pastEvents = filterPastEvents(props.events);
  const futureEvents = filterFutureEvents(props.events);

  return (
    <>
      <div>
        <img src={`${image}`} width="150" alt={`${first_name} ${last_name}`}/>
        
        <div><h1>{fullName(first_name, last_name)}</h1></div>
        
        {/* <ProfileNav match={props.match} /> */}
        <ButtonToolbar>
          <Link to={`${props.match.path}/upcoming_events`}><Button>Upcoming Events</Button></Link>
          <Link to={`${props.match.path}/past_events`}><Button>Past Events</Button></Link>
          <Button onClick={() => handleShowProfileModal()} >Edit Profile</Button>
          <Button onClick={ () => handleShowNewEventModal() }>Add Event</Button>
          <Link to={`${props.match.path}/info`}><Button>Info</Button></Link>
        </ButtonToolbar>

        <Route path={`${props.match.path}/upcoming_events`} 
          render={() => <Events events={futureEvents} />} 
        />
        <Route path={`${props.match.path}/past_events`} 
          render={() => <Events events={pastEvents} />} 
        />
        <Route path={`${props.match.path}/info`} 
          render={() => <ProfileDetails email={email} phone_number={phone_number} />} 
        />

        {/* Edit Profile Modal */}
        <ProfileModal show={showProfileModal} handleClose={handleCloseProfileModal} user={props.user} setCurrentUser={props.setCurrentUser} />
        <EventModal show={showNewEventModal} handleClose={handleCloseNewEventModal} handleNewEvent={props.handleNewEvent} setEvents={props.setEvents} />
      </div>
    </>
  )
}

export default Profile