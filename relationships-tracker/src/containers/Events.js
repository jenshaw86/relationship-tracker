import React, {useState, useEffect} from 'react';
import EventCard from '../components/EventCard';

const Events = (props) => {
    const displayAllEvents = () => {
        if (props.events && props.events.length !== 0 ) {
            return props.events.map(event => {
                return <EventCard key={event.id} event={event} />
            })
        }
    }

     return (
         <div>
            <h1>All Events</h1>
            { displayAllEvents() }
         </div> 
     )
}

export default Events