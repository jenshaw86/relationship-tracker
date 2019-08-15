import React from 'react';
import { Link } from 'react-router-dom';
import {displayDate, displayInvitees} from '../../utils'
import EditEventButton from './EditEventButton'
import DeleteEventButton from './DeleteEventButton'

// PROPS: event object
//  functions: setEvents

const EventCard = (props) => {
    const obj = props.event

    return(
        <>
            <Link to={`/events/${obj.event.id}`}>
                <div>
                    <h4>{displayDate(obj.event.start_date)}</h4>
                    <h4>{obj.event.name}</h4>
                    <p>with {displayInvitees(obj)}</p>
                </div>
            </Link>

            {/* <EditEventButton event={obj} setEvents={props.setEvents} relationships={props.relationships} */}
            {/* // handleEditEvent={props.handleEditEvent} */}
            {/* /> */}
            {/* <DeleteEventButton eventId={event.id} setEvents={props.setEvents} /> */}
        </>
    )
}

export default EventCard
