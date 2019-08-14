import React from 'react';
import { Link } from 'react-router-dom';
import {displayDate, displayInvitees} from '../../utils'
import EditEventButton from './EditEventButton'
import DeleteEventButton from './DeleteEventButton'

// PROPS: event object
//  functions: setEvents

const EventCard = (props) => {
    const event = props.event

    return(
        <>
            <Link to={`/events/${event.id}`}>
                <div className='event_event'>
                    <h4>{displayDate(event.start_date)}</h4>
                    <h4>{event.name}</h4>
                    <p>with {displayInvitees(event)}</p>
                </div>
            </Link>

            <EditEventButton event={event} setEvents={props.setEvents} 
            // handleEditEvent={props.handleEditEvent}
            />
            <DeleteEventButton eventId={event.id} setEvents={props.setEvents} />
        </>
    )
}

export default EventCard
