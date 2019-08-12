import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {displayDate} from '../../utils'

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

    const displayInvitees = () => {
        if (event.relationships && event.length !==0) {
            return event.relationships.map(rel => {
                return `${rel.first_name} ${rel.last_name}`
            })
        }
    }

    return(
        <>
            <Link to={`/events/${props.id}`}>
                <div className='event_card'>
                    <h4>{displayDate(event.start_date)}</h4>
                    <h4>{event.name}</h4>
                    <p>with {displayInvitees()}</p>
                </div>
            </Link>
            <Button onClick={handleOnClick}>Cancel Event</Button>
        </>
    )
}

export default EventCard