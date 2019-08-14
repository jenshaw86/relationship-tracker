import React from 'react';
import { Link } from 'react-router-dom';
import {displayDate, displayInvitees} from '../../utils'
import EditEventButton from './EditEventButton'
import DeleteEventButton from './DeleteEventButton'

// PROPS: event object
//  functions: setEvents

const EventCard = (props) => {
    const card = props.event

    return(
        <>
            <Link to={`/events/${card.id}`}>
                <div className='event_card'>
                    <h4>{displayDate(card.start_date)}</h4>
                    <h4>{card.name}</h4>
                    <p>with {displayInvitees(card)}</p>
                </div>
            </Link>

            <EditEventButton setEvents={props.setEvents} handleEditEvent={props.handleEditEvent}/>
            <DeleteEventButton eventId={card.id} setEvents={props.setEvents} />
        </>
    )
}

export default EventCard
