import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {displayDate, displayInvitees} from '../../utils'
import EventModal from './EventModal'

// PROPS: event object
//  functions: setEvents()

const EventCard = (props) => {
    // State: current event viewed, modal view
    const [event, setEvent] = useState(props.event)
    const [show, setShow] = useState(false);
    
    // New Event Modal Handlers
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Delete event instance
    const handleDelete = () => {
        fetch(`http://localhost:3000/events/${props.event.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => props.setEvents(data))
    }

    return(
        <>
            <Link to={`/events/${props.event.id}`}>
                <div className='event_card'>
                    <h4>{displayDate(event.start_date)}</h4>
                    <h4>{event.name}</h4>
                    <p>with {displayInvitees(event)}</p>
                </div>
            </Link>
            <Button variant="info" onClick={handleShow}>Edit Event</Button>
            <Button onClick={handleDelete}>Cancel Event</Button>

            {/* Edit Event Modal */}
            <EventModal show={show} handleClose={handleClose} setEvents={props.setEvents} handleEditEvent={props.handleEditEvent} event={event} />
        </>
    )
}

export default EventCard