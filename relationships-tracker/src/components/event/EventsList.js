import React from 'react';
import EventCard from './EventCard';

const EventsList = props => {

  const displayAllEvents = () => {
    if (props.events && props.events.length !== 0 ) {
      return props.events.map(event => {
        return <EventCard 
          key={event.id} 
          event={event}
          viewEvent={props.viewEvent}
          {...props}
          />
      })
    }
  }

  return (
    <div className="events-list">
      { displayAllEvents() }
    </div> 
  )
}

export default EventsList