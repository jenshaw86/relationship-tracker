import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {displayDate, displayInvitees} from '../../utils'

const EventCard = (props) => {
    const [event, setEvent] = useState({})
    
    useEffect( () => {
        fetch(`http://localhost:3000/events/${props.id}`)
        .then(res => res.json())
        .then(obj => setEvent(obj))
    }, [props.id])

    const handleOnClick = () => {
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
            <Button>Edit Event</Button>
            <Button onClick={handleOnClick}>Cancel Event</Button>
        </>
    )
}

export default EventCard