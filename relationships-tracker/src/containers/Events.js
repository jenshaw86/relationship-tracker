import React, {useState} from 'react';
import { Button } from 'react-bootstrap';

import EventCard from '../components/event/EventCard';
import EventModal from '../components/event/EventModal'

// PROPS: setEvents(), events

const Events = props => {
  // New Event Modal State
  const [show, setShow] = useState(false);
  // New Event Modal Handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Show all Event Cards
  const displayAllEvents = () => {
    if (props.events && props.events.length !== 0 ) {
      return props.events.map(event => {
        return <EventCard 
          key={event.id} 
          event={event}
          setEvents={props.setEvents}
          handleEditEvent={props.handleEditEvent} />
      })
    }
  }

  return (
    <div>
      <Button variant="info" onClick={handleShow}>Add New Event</Button>
      
      { displayAllEvents() }

      {/* Add New Event Form */}
      <EventModal show={show} handleClose={handleClose} handleNewEvent={props.handleNewEvent} setEvents={props.setEvents} />
    </div> 
  )
}

export default Events