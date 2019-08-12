import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {displayDate, displayInvitees} from '../../utils'
import EventModal from './EventModal'

const EventCard = (props) => {
    // State: current event viewed, modal view
    const [event, setEvent] = useState({})
    const [show, setShow] = useState(false);
    
    // New Event Modal Handlers
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // Fetch event instance
    useEffect( () => {
        fetch(`http://localhost:3000/events/${props.id}`)
        .then(res => res.json())
        .then(obj => setEvent(obj))
    }, [props.id])

    // Delete event instance
    const handleDelete = () => {
        fetch(`http://localhost:3000/events/${props.id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => props.handleCancelEvent(data))
    }

    return(
        <>
            <Link to={`/events/${props.id}`}>
                <div className='event_card'>
                    <h4>{displayDate(event.start_date)}</h4>
                    <h4>{event.name}</h4>
                    <p>with {displayInvitees(event)}</p>
                </div>
            </Link>
            <Button variant="info" onClick={handleShow}>Edit Event</Button>
            <Button onClick={handleDelete}>Cancel Event</Button>

            {/* Edit Event Modal */}
            <EventModal show={show} handleClose={handleClose} handleEditEvent={props.handleEditEvent} />
        </>
    )
}

export default EventCard