import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const EventCard = (props) => {
    const {
        name, 
        id
    } = props.event

    const handleOnClick = () => {
        fetch(`http://localhost:3000/events/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => props.handleCancelEvent(data))
    }

    return(
        <>
            <Link to={`/events/${id}`}>
                <div className='event_card'>
                    <h4>{`${name}`}</h4>
                </div>
            </Link>
            <Button onClick={handleOnClick}>Cancel Event</Button>
        </>
    )
}

export default EventCard