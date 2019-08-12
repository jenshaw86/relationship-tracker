import React, {useState} from 'react';
import EventCard from '../components/event/EventCard';
import { Button } from 'react-bootstrap';

import EventModal from '../components/event/EventModal'

const Events = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const displayAllEvents = () => {
    if (props.events && props.events.length !== 0 ) {
      return props.events.map(event => {
        return <EventCard 
          key={event.id} 
          event={event}
          handleCancelEvent={props.handleCancelEvent} />
      })
    }
  }

  return (
    <div>
      <h1>All Events</h1>
      <Button variant="info" onClick={handleShow}>Add New Event</Button>
      { displayAllEvents() }

      {/* Add New Event Form */}
      <EventModal show={show} handleClose={handleClose} handleNewEvent={props.handleNewEvent} />
    </div> 
  )
}

export default Events