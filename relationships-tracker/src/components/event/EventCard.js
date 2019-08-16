import React from 'react';
import { Link } from 'react-router-dom';
import {displayDate, displayInvitees} from '../../utils'
import EditEventButton from './EditEventButton'
import DeleteEventButton from './DeleteEventButton'

// PROPS: event object
//  functions: setEvents

const EventCard = (props) => {
    return(
        <>
            <Link to={`/events/${props.event.event.id}`}>
                <div>
                    <h4>{displayDate(props.event.event.start_date)}</h4>
                    <h4>{props.event.event.name}</h4>
                    <p>with {displayInvitees(props.event)}</p>
                </div>
            </Link>

            <EditEventButton event={props.event} setEvents={props.setEvents} relationships={props.relationships}
            /> 
            {/* <DeleteEventButton eventId={event.id} setEvents={props.setEvents} /> */}
        </>
    )
}

export default EventCard
