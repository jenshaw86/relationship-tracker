import React from 'react';
import { Link } from 'react-router-dom'
import { Button, ButtonToolbar} from 'react-bootstrap';

const ProfileNav = props => {
  return (
    <>
      <ButtonToolbar>
        <Link to={`/${props.match.path}/upcoming_events`}><Button>Upcoming Events</Button></Link>
        <Link><Button>Past Events</Button></Link>
        <Link><Button>Edit Profile</Button></Link>
        <Link><Button>Add Event</Button></Link>
        <Link><Button>Info</Button></Link>
      </ButtonToolbar>
    </>
  )
}

export default ProfileNav