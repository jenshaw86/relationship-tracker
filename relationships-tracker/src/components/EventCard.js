import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = (props) => {
    const {
        name, 
        id
    } = props.event

    return(
        <>
            <Link to={`/events/${id}`}>
                <div className='event_card'>
                    <h3>{`${name}`}</h3>
                </div>
            </Link>
        </>
    )
}

export default EventCard